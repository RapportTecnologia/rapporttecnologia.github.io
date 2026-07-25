(function () {
  "use strict";

  var root = document.querySelector("[data-cas-terminal]");
  if (!root) {
    return;
  }

  var API_BASE = "https://api.geckoterminal.com/api/v2";
  var CACHE_PREFIX = "rapport-cas-gecko-v1:";
  var CACHE_TTL = 5 * 60 * 1000;
  var AUTO_REFRESH_INTERVAL = 5 * 60 * 1000;
  var MANUAL_REFRESH_INTERVAL = 60 * 1000;
  var REQUEST_TIMEOUT = 12000;

  var network = root.getAttribute("data-network");
  var tokenAddress = root.getAttribute("data-token-address");
  var panel = root.querySelector("[data-terminal-panel]");
  var poolSelect = root.querySelector("[data-pool-select]");
  var refreshButton = root.querySelector("[data-refresh]");
  var rangeButtons = Array.prototype.slice.call(root.querySelectorAll("[data-range]"));
  var statusElement = root.querySelector("[data-terminal-status]");
  var lastUpdateElement = root.querySelector("[data-last-update]");
  var pairElement = root.querySelector("[data-chart-pair]");
  var dexElement = root.querySelector("[data-chart-dex]");
  var canvas = root.querySelector("[data-candlestick-chart]");
  var tooltip = root.querySelector("[data-chart-tooltip]");
  var emptyState = root.querySelector("[data-chart-empty]");
  var chartDescription = root.querySelector("[data-chart-description]");

  var state = {
    pools: [],
    selectedPoolAddress: "",
    range: "24h",
    candles: [],
    hoverIndex: -1,
    loading: false,
    lastManualRefresh: 0,
    resizeObserver: null
  };

  var rangeConfig = {
    "24h": { timeframe: "hour", aggregate: 1, limit: 24, label: "nas últimas 24 horas" },
    "7d": { timeframe: "hour", aggregate: 4, limit: 42, label: "nos últimos 7 dias" },
    "30d": { timeframe: "day", aggregate: 1, limit: 30, label: "nos últimos 30 dias" }
  };

  function setStatus(message) {
    statusElement.textContent = message;
  }

  function setLoading(isLoading) {
    state.loading = isLoading;
    panel.setAttribute("aria-busy", String(isLoading));
    refreshButton.disabled = isLoading || !state.selectedPoolAddress;
    refreshButton.classList.toggle("is-loading", isLoading);
  }

  function cacheKey(url) {
    return CACHE_PREFIX + url;
  }

  function readCache(url) {
    try {
      var value = localStorage.getItem(cacheKey(url));
      if (!value) {
        return null;
      }
      var parsed = JSON.parse(value);
      if (!parsed || !parsed.payload || !parsed.savedAt) {
        return null;
      }
      return parsed;
    } catch (error) {
      return null;
    }
  }

  function writeCache(url, payload) {
    try {
      localStorage.setItem(cacheKey(url), JSON.stringify({
        payload: payload,
        savedAt: Date.now()
      }));
    } catch (error) {
      // A página continua funcional quando o armazenamento local não está disponível.
    }
  }

  function fetchJson(url, forceNetwork) {
    var cached = readCache(url);
    if (!forceNetwork && cached && Date.now() - cached.savedAt < CACHE_TTL) {
      return Promise.resolve({ payload: cached.payload, source: "cache", savedAt: cached.savedAt });
    }

    var controller = new AbortController();
    var timeoutId = window.setTimeout(function () {
      controller.abort();
    }, REQUEST_TIMEOUT);

    return fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controller.signal
    }).then(function (response) {
      if (!response.ok) {
        var error = new Error("A API respondeu com status " + response.status + ".");
        error.status = response.status;
        throw error;
      }
      return response.json();
    }).then(function (payload) {
      writeCache(url, payload);
      return { payload: payload, source: "network", savedAt: Date.now() };
    }).catch(function (error) {
      if (cached) {
        return {
          payload: cached.payload,
          source: "stale-cache",
          savedAt: cached.savedAt,
          recoveredFrom: error
        };
      }
      throw error;
    }).finally(function () {
      window.clearTimeout(timeoutId);
    });
  }

  function poolsUrl() {
    return API_BASE + "/networks/" + encodeURIComponent(network) +
      "/tokens/" + encodeURIComponent(tokenAddress) +
      "/pools?include=base_token,quote_token,dex&page=1";
  }

  function ohlcvUrl(poolAddress) {
    var config = rangeConfig[state.range];
    return API_BASE + "/networks/" + encodeURIComponent(network) +
      "/pools/" + encodeURIComponent(poolAddress) +
      "/ohlcv/" + config.timeframe +
      "?aggregate=" + config.aggregate +
      "&limit=" + config.limit +
      "&currency=usd&token=" + encodeURIComponent(tokenAddress);
  }

  function includedMap(payload) {
    var map = {};
    (payload.included || []).forEach(function (item) {
      map[item.type + ":" + item.id] = item;
    });
    return map;
  }

  function relationshipItem(pool, relation, map) {
    var relationData = pool.relationships &&
      pool.relationships[relation] &&
      pool.relationships[relation].data;
    if (!relationData) {
      return null;
    }
    return map[relationData.type + ":" + relationData.id] || null;
  }

  function poolModel(pool, map) {
    var attributes = pool.attributes || {};
    var baseToken = relationshipItem(pool, "base_token", map);
    var quoteToken = relationshipItem(pool, "quote_token", map);
    var dex = relationshipItem(pool, "dex", map);
    var baseSymbol = baseToken && baseToken.attributes ? baseToken.attributes.symbol : "";
    var quoteSymbol = quoteToken && quoteToken.attributes ? quoteToken.attributes.symbol : "";

    return {
      address: attributes.address || pool.id.replace(network + "_", ""),
      name: attributes.name || [baseSymbol, quoteSymbol].filter(Boolean).join(" / ") || "Pool CAS",
      dexName: dex && dex.attributes ? (dex.attributes.name || dex.attributes.identifier) : "DEX",
      attributes: attributes
    };
  }

  function normalizePools(payload) {
    var map = includedMap(payload);
    return (payload.data || []).map(function (pool) {
      return poolModel(pool, map);
    }).filter(function (pool) {
      return Boolean(pool.address);
    });
  }

  function renderPoolOptions(previousAddress) {
    while (poolSelect.firstChild) {
      poolSelect.removeChild(poolSelect.firstChild);
    }

    state.pools.forEach(function (pool) {
      var option = document.createElement("option");
      option.value = pool.address;
      option.textContent = pool.name + " · " + pool.dexName;
      poolSelect.appendChild(option);
    });

    var stillAvailable = state.pools.some(function (pool) {
      return pool.address === previousAddress;
    });
    state.selectedPoolAddress = stillAvailable ? previousAddress : (state.pools[0] && state.pools[0].address);
    poolSelect.value = state.selectedPoolAddress || "";
    poolSelect.disabled = state.pools.length === 0;
  }

  function numberValue(value) {
    var parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  function formatUsd(value) {
    var number = numberValue(value);
    if (number === null) {
      return "—";
    }
    var absolute = Math.abs(number);
    var maximumFractionDigits = absolute > 0 && absolute < 0.01 ? 8 : (absolute < 1 ? 6 : 2);
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: absolute > 0 && absolute < 1 ? 2 : 2,
      maximumFractionDigits: maximumFractionDigits
    }).format(number);
  }

  function formatCompactUsd(value) {
    var number = numberValue(value);
    if (number === null) {
      return "—";
    }
    if (Math.abs(number) < 1000) {
      return formatUsd(number);
    }
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 2
    }).format(number);
  }

  function formatPercent(value) {
    var number = numberValue(value);
    if (number === null) {
      return "—";
    }
    return (number > 0 ? "+" : "") + new Intl.NumberFormat("pt-BR", {
      maximumFractionDigits: 2
    }).format(number) + "%";
  }

  function statElement(name) {
    return root.querySelector('[data-stat="' + name + '"]');
  }

  function setStat(name, text, tone) {
    var element = statElement(name);
    element.textContent = text;
    element.classList.remove("is-positive", "is-negative");
    if (tone) {
      element.classList.add(tone);
    }
  }

  function currentPool() {
    return state.pools.find(function (pool) {
      return pool.address === state.selectedPoolAddress;
    });
  }

  function renderPoolStats() {
    var pool = currentPool();
    if (!pool) {
      return;
    }

    var attributes = pool.attributes;
    var change = numberValue(attributes.price_change_percentage && attributes.price_change_percentage.h24);
    var transactions = attributes.transactions && attributes.transactions.h24;
    var transactionCount = transactions ?
      (numberValue(transactions.buys) || 0) + (numberValue(transactions.sells) || 0) :
      null;

    setStat("price", formatUsd(attributes.token_price_usd));
    setStat("change", formatPercent(change), change > 0 ? "is-positive" : (change < 0 ? "is-negative" : ""));
    setStat("liquidity", formatCompactUsd(attributes.reserve_in_usd));
    setStat("volume", formatCompactUsd(attributes.volume_usd && attributes.volume_usd.h24));
    setStat("fdv", formatCompactUsd(attributes.fdv_usd));
    setStat("transactions", transactionCount === null ? "—" : new Intl.NumberFormat("pt-BR").format(transactionCount));
    pairElement.textContent = pool.name;
    dexElement.textContent = pool.dexName;
  }

  function normalizeCandles(payload) {
    var list = payload &&
      payload.data &&
      payload.data.attributes &&
      payload.data.attributes.ohlcv_list;

    if (!Array.isArray(list)) {
      return [];
    }

    return list.map(function (candle) {
      return {
        timestamp: numberValue(candle[0]),
        open: numberValue(candle[1]),
        high: numberValue(candle[2]),
        low: numberValue(candle[3]),
        close: numberValue(candle[4]),
        volume: numberValue(candle[5]) || 0
      };
    }).filter(function (candle) {
      return candle.timestamp !== null &&
        candle.open !== null &&
        candle.high !== null &&
        candle.low !== null &&
        candle.close !== null;
    }).sort(function (a, b) {
      return a.timestamp - b.timestamp;
    });
  }

  function compactNumber(value) {
    return new Intl.NumberFormat("pt-BR", {
      notation: "compact",
      maximumFractionDigits: 2
    }).format(value);
  }

  function priceLabel(value) {
    var absolute = Math.abs(value);
    var digits = absolute < 0.01 ? 7 : (absolute < 1 ? 5 : 2);
    return "$" + value.toFixed(digits);
  }

  function chartDate(timestamp, includeTime) {
    var options = includeTime ?
      { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" } :
      { day: "2-digit", month: "short" };
    return new Intl.DateTimeFormat("pt-BR", options).format(new Date(timestamp * 1000));
  }

  function canvasMetrics() {
    var rect = canvas.getBoundingClientRect();
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var width = Math.max(320, Math.floor(rect.width));
    var height = Math.max(280, Math.floor(rect.height));

    if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
    }

    var context = canvas.getContext("2d");
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { context: context, width: width, height: height };
  }

  function drawChart() {
    var metrics = canvasMetrics();
    var context = metrics.context;
    var width = metrics.width;
    var height = metrics.height;
    context.clearRect(0, 0, width, height);

    if (!state.candles.length) {
      emptyState.hidden = false;
      return;
    }

    emptyState.hidden = true;
    var candles = state.candles;
    var padding = { top: 18, right: width < 520 ? 54 : 76, bottom: 28, left: 16 };
    var volumeHeight = Math.max(54, Math.floor(height * 0.2));
    var priceBottom = height - padding.bottom - volumeHeight - 18;
    var plotWidth = width - padding.left - padding.right;
    var plotHeight = priceBottom - padding.top;
    var lows = candles.map(function (candle) { return candle.low; });
    var highs = candles.map(function (candle) { return candle.high; });
    var priceMin = Math.min.apply(null, lows);
    var priceMax = Math.max.apply(null, highs);
    var priceSpan = priceMax - priceMin || Math.max(priceMax * 0.05, 0.000001);
    priceMin -= priceSpan * 0.06;
    priceMax += priceSpan * 0.06;
    var maxVolume = Math.max.apply(null, candles.map(function (candle) { return candle.volume; })) || 1;
    var slot = plotWidth / candles.length;
    var bodyWidth = Math.max(2, Math.min(12, slot * 0.58));

    function priceY(value) {
      return padding.top + ((priceMax - value) / (priceMax - priceMin)) * plotHeight;
    }

    context.lineWidth = 1;
    context.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
    context.textAlign = "left";
    context.textBaseline = "middle";

    for (var gridIndex = 0; gridIndex <= 4; gridIndex += 1) {
      var y = padding.top + (plotHeight / 4) * gridIndex;
      var price = priceMax - ((priceMax - priceMin) / 4) * gridIndex;
      context.strokeStyle = "rgba(255,255,255,0.07)";
      context.beginPath();
      context.moveTo(padding.left, y);
      context.lineTo(width - padding.right + 8, y);
      context.stroke();
      context.fillStyle = "#817e89";
      context.fillText(priceLabel(price), width - padding.right + 14, y);
    }

    candles.forEach(function (candle, index) {
      var x = padding.left + slot * index + slot / 2;
      var rising = candle.close >= candle.open;
      var color = rising ? "#42d392" : "#ff6b81";
      var openY = priceY(candle.open);
      var closeY = priceY(candle.close);
      var highY = priceY(candle.high);
      var lowY = priceY(candle.low);
      var bodyTop = Math.min(openY, closeY);
      var bodyHeight = Math.max(1.5, Math.abs(closeY - openY));

      context.strokeStyle = color;
      context.beginPath();
      context.moveTo(x, highY);
      context.lineTo(x, lowY);
      context.stroke();

      context.fillStyle = color;
      context.fillRect(x - bodyWidth / 2, bodyTop, bodyWidth, bodyHeight);

      var volumeBarHeight = (candle.volume / maxVolume) * volumeHeight;
      context.fillStyle = rising ? "rgba(66,211,146,0.35)" : "rgba(255,107,129,0.35)";
      context.fillRect(
        x - bodyWidth / 2,
        height - padding.bottom - volumeBarHeight,
        bodyWidth,
        volumeBarHeight
      );
    });

    context.fillStyle = "#777480";
    context.textBaseline = "bottom";
    var labelIndexes = [0, Math.floor((candles.length - 1) / 3), Math.floor((candles.length - 1) * 2 / 3), candles.length - 1];
    labelIndexes.forEach(function (index, labelIndex) {
      var x = padding.left + slot * index + slot / 2;
      context.textAlign = labelIndex === 0 ? "left" : (labelIndex === labelIndexes.length - 1 ? "right" : "center");
      context.fillText(chartDate(candles[index].timestamp, false), x, height - 5);
    });

    if (state.hoverIndex >= 0 && candles[state.hoverIndex]) {
      var hoverX = padding.left + slot * state.hoverIndex + slot / 2;
      context.strokeStyle = "rgba(169,156,255,0.55)";
      context.setLineDash([3, 4]);
      context.beginPath();
      context.moveTo(hoverX, padding.top);
      context.lineTo(hoverX, height - padding.bottom);
      context.stroke();
      context.setLineDash([]);
    }
  }

  function updateChartDescription() {
    if (!state.candles.length) {
      chartDescription.textContent = "Não foi possível exibir dados históricos para este pool.";
      return;
    }
    var first = state.candles[0];
    var last = state.candles[state.candles.length - 1];
    var movement = first.open ? ((last.close - first.open) / first.open) * 100 : 0;
    chartDescription.textContent =
      "Série de " + state.candles.length + " candles " + rangeConfig[state.range].label +
      ". Abertura de " + formatUsd(first.open) +
      ", fechamento mais recente de " + formatUsd(last.close) +
      " e variação aproximada de " + formatPercent(movement) + ".";
  }

  function renderTooltip(index, clientX, clientY) {
    var candle = state.candles[index];
    if (!candle) {
      tooltip.hidden = true;
      return;
    }
    tooltip.textContent =
      chartDate(candle.timestamp, true) + "\n" +
      "Abertura  " + formatUsd(candle.open) + "\n" +
      "Máxima    " + formatUsd(candle.high) + "\n" +
      "Mínima    " + formatUsd(candle.low) + "\n" +
      "Fechamento " + formatUsd(candle.close) + "\n" +
      "Volume    $" + compactNumber(candle.volume);
    tooltip.hidden = false;

    var wrapRect = canvas.parentElement.getBoundingClientRect();
    var tooltipWidth = tooltip.offsetWidth;
    var tooltipHeight = tooltip.offsetHeight;
    var left = clientX - wrapRect.left + 12;
    var top = clientY - wrapRect.top + 12;
    if (left + tooltipWidth > wrapRect.width - 8) {
      left = clientX - wrapRect.left - tooltipWidth - 12;
    }
    if (top + tooltipHeight > wrapRect.height - 8) {
      top = wrapRect.height - tooltipHeight - 8;
    }
    tooltip.style.left = Math.max(8, left) + "px";
    tooltip.style.top = Math.max(8, top) + "px";
  }

  function handleChartPointer(event) {
    if (!state.candles.length) {
      return;
    }
    var rect = canvas.getBoundingClientRect();
    var plotLeft = 16;
    var plotRight = rect.width - (rect.width < 520 ? 54 : 76);
    var x = event.clientX - rect.left;
    if (x < plotLeft || x > plotRight) {
      state.hoverIndex = -1;
      tooltip.hidden = true;
      drawChart();
      return;
    }
    var slot = (plotRight - plotLeft) / state.candles.length;
    state.hoverIndex = Math.max(0, Math.min(state.candles.length - 1, Math.floor((x - plotLeft) / slot)));
    drawChart();
    renderTooltip(state.hoverIndex, event.clientX, event.clientY);
  }

  function sourceMessage(result) {
    if (result.source === "stale-cache") {
      return "Exibindo o último dado salvo; a API está temporariamente indisponível.";
    }
    if (result.source === "cache") {
      return "Dados recentes carregados do cache local.";
    }
    return "Dados atualizados pela API pública da GeckoTerminal.";
  }

  function renderTimestamp(savedAt) {
    lastUpdateElement.textContent = "Atualizado em " + new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).format(new Date(savedAt));
  }

  function loadCandles(forceNetwork) {
    if (!state.selectedPoolAddress) {
      return Promise.reject(new Error("Nenhum pool do CAS foi encontrado."));
    }
    emptyState.hidden = false;
    emptyState.textContent = "Carregando série histórica…";

    return fetchJson(ohlcvUrl(state.selectedPoolAddress), forceNetwork).then(function (result) {
      state.candles = normalizeCandles(result.payload);
      state.hoverIndex = -1;
      tooltip.hidden = true;
      if (!state.candles.length) {
        emptyState.hidden = false;
        emptyState.textContent = "Este pool ainda não possui candles para o período selecionado.";
      }
      drawChart();
      updateChartDescription();
      renderTimestamp(result.savedAt);
      setStatus(sourceMessage(result));
      return result;
    });
  }

  function loadTerminal(forceNetwork) {
    if (state.loading) {
      return Promise.resolve();
    }
    setLoading(true);
    setStatus("Consultando pools e indicadores do CAS…");
    var previousAddress = state.selectedPoolAddress;

    return fetchJson(poolsUrl(), forceNetwork).then(function (poolResult) {
      state.pools = normalizePools(poolResult.payload);
      if (!state.pools.length) {
        throw new Error("A GeckoTerminal não retornou pools para este token.");
      }
      renderPoolOptions(previousAddress);
      renderPoolStats();
      return loadCandles(forceNetwork).then(function (candleResult) {
        if (poolResult.source === "stale-cache" || candleResult.source === "stale-cache") {
          setStatus("Exibindo o último dado salvo; a API está temporariamente indisponível.");
        }
      });
    }).catch(function (error) {
      var message = error && error.status === 429 ?
        "Limite temporário da API atingido. Aguarde um minuto e tente novamente." :
        "Não foi possível carregar os dados agora. Tente novamente em alguns instantes.";
      setStatus(message);
      emptyState.hidden = false;
      emptyState.textContent = message;
      chartDescription.textContent = message;
    }).finally(function () {
      setLoading(false);
    });
  }

  function selectRange(button) {
    state.range = button.getAttribute("data-range");
    rangeButtons.forEach(function (item) {
      var active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    setLoading(true);
    loadCandles(false).catch(function () {
      setStatus("Não foi possível carregar este período.");
    }).finally(function () {
      setLoading(false);
    });
  }

  poolSelect.addEventListener("change", function () {
    state.selectedPoolAddress = poolSelect.value;
    renderPoolStats();
    setLoading(true);
    loadCandles(false).catch(function () {
      setStatus("Não foi possível carregar os candles deste pool.");
    }).finally(function () {
      setLoading(false);
    });
  });

  rangeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      if (!state.loading && button.getAttribute("data-range") !== state.range) {
        selectRange(button);
      }
    });
  });

  refreshButton.addEventListener("click", function () {
    var elapsed = Date.now() - state.lastManualRefresh;
    if (elapsed < MANUAL_REFRESH_INTERVAL) {
      var seconds = Math.ceil((MANUAL_REFRESH_INTERVAL - elapsed) / 1000);
      setStatus("Aguarde " + seconds + "s antes de atualizar novamente.");
      return;
    }
    state.lastManualRefresh = Date.now();
    loadTerminal(true);
  });

  canvas.addEventListener("mousemove", handleChartPointer);
  canvas.addEventListener("mouseleave", function () {
    state.hoverIndex = -1;
    tooltip.hidden = true;
    drawChart();
  });

  if ("ResizeObserver" in window) {
    state.resizeObserver = new ResizeObserver(function () {
      drawChart();
    });
    state.resizeObserver.observe(canvas.parentElement);
  } else {
    window.addEventListener("resize", drawChart);
  }

  window.setInterval(function () {
    if (!document.hidden && !state.loading) {
      loadTerminal(false);
    }
  }, AUTO_REFRESH_INTERVAL);

  loadTerminal(false);
}());
