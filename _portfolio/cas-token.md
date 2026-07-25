---
layout: cas-token
title: "CAS Token"
description: "Token utilitário ERC-20 do ecossistema Agentic Space, criado para coordenar serviços, agentes autônomos e infraestrutura descentralizada na rede Polygon."
tags: [CAS Token, Criptocoin Agentic Space, ERC-20, Polygon, Agentic Space, tokenomics, GeckoTerminal, API, OHLCV]
image: "cards/cas-token-geckoterminal.webp"
hide_site_header: true
custom_css: "/css/cas-token.css"
custom_js: "/js/cas-token-terminal.js"
network_id: "polygon_pos"
chain_id: 137
token_address: "0x5151A34EaC7bA08cd6B540b32cD30316218A2287"
---
<section class="cas-section cas-section--light" aria-labelledby="cas-about-title">
  <div class="cas-shell cas-prose-grid">
    <div>
      <span class="cas-section-label">Visão geral</span>
      <h2 id="cas-about-title">Uma unidade operacional para o Agentic Space</h2>
    </div>
    <div class="cas-prose">
      <p>O <strong>CAS (Criptocoin Agentic Space)</strong> é o token utilitário do Agentic Space. Ele foi desenhado para registrar e remunerar operações do ecossistema, apoiar a infraestrutura compartilhada e integrar serviços executados por pessoas, agentes de IA e contratos inteligentes.</p>
      <p>O contrato segue o padrão ERC-20 na Polygon PoS e adota uma arquitetura atualizável UUPS. A documentação do projeto descreve o CAS em fluxos operacionais e de governança do protocolo, sem representar participação societária, dividendos ou direito sobre receitas.</p>
    </div>
  </div>

  <div class="cas-shell">
    <dl class="cas-specs">
      <div>
        <dt>Símbolo</dt>
        <dd>CAS</dd>
      </div>
      <div>
        <dt>Rede</dt>
        <dd>Polygon PoS</dd>
      </div>
      <div>
        <dt>Padrão</dt>
        <dd>ERC-20</dd>
      </div>
      <div>
        <dt>Decimais</dt>
        <dd>18</dd>
      </div>
      <div>
        <dt>Oferta inicial</dt>
        <dd>1.000.000 CAS</dd>
      </div>
      <div>
        <dt>Oferta máxima</dt>
        <dd>10.000.000 CAS</dd>
      </div>
    </dl>
  </div>
</section>

<section id="tokenomics" class="cas-section cas-section--ink" aria-labelledby="cas-tokenomics-title">
  <div class="cas-shell">
    <span class="cas-section-label">Tokenomics</span>
    <div class="cas-section-heading">
      <h2 id="cas-tokenomics-title">Oferta limitada e expansão vinculada ao ecossistema</h2>
      <p>A emissão inicial corresponde a 10% do limite total. Os 90% restantes formam a reserva prevista para o crescimento, a infraestrutura e as necessidades futuras do protocolo, sempre respeitando o teto do contrato.</p>
    </div>

    <div class="cas-allocation" aria-label="Distribuição da oferta máxima">
      <div class="cas-allocation__bar">
        <span class="cas-allocation__initial" style="width: 10%"></span>
        <span class="cas-allocation__reserve" style="width: 90%"></span>
      </div>
      <div class="cas-allocation__legend">
        <div>
          <span class="cas-dot cas-dot--initial"></span>
          <strong>10%</strong>
          <small>Oferta inicial · 1 milhão CAS</small>
        </div>
        <div>
          <span class="cas-dot cas-dot--reserve"></span>
          <strong>90%</strong>
          <small>Reserva de crescimento · até 9 milhões CAS</small>
        </div>
      </div>
    </div>

    <div class="cas-feature-grid">
      <article class="cas-feature">
        <span class="cas-feature__icon"><i class="fa fa-cogs" aria-hidden="true"></i></span>
        <h3>Operações e proteção</h3>
        <p>Taxas de serviço dão suporte às operações do protocolo e funcionam como mecanismo econômico contra spam. Os valores são configuráveis; consulte o contrato e as interfaces oficiais para os parâmetros vigentes.</p>
      </article>
      <article class="cas-feature">
        <span class="cas-feature__icon"><i class="fa fa-university" aria-hidden="true"></i></span>
        <h3>Fundo de infraestrutura</h3>
        <p>Uma tesouraria dedicada pode receber CAS para sustentar desenvolvimento, auditorias, integrações e recursos comuns do ecossistema.</p>
      </article>
      <article class="cas-feature">
        <span class="cas-feature__icon"><i class="fa fa-users" aria-hidden="true"></i></span>
        <h3>Fluxos de governança</h3>
        <p>A documentação descreve o uso do token em propostas e votações operacionais do protocolo. Isso não equivale a participação societária nem a promessa de retorno.</p>
      </article>
      <article class="cas-feature">
        <span class="cas-feature__icon"><i class="fa fa-fire" aria-hidden="true"></i></span>
        <h3>Limite e queima</h3>
        <p>O contrato estabelece oferta máxima de 10 milhões de CAS e oferece mecanismo de queima. Não há inflação por staking descrita no tokenomics.</p>
      </article>
      <article class="cas-feature">
        <span class="cas-feature__icon"><i class="fa fa-cube" aria-hidden="true"></i></span>
        <h3>NFT e contas vinculadas</h3>
        <p>CAS pode integrar certificados NFT e contas ERC-6551 (Token Bound Accounts), conectando credenciais, ativos e automações.</p>
      </article>
      <article class="cas-feature">
        <span class="cas-feature__icon"><i class="fa fa-exchange" aria-hidden="true"></i></span>
        <h3>Conversões internas</h3>
        <p>O CASSwap e tokens auxiliares atendem conversões e rastreamento de fundos no ecossistema. Relações e taxas podem mudar e devem ser confirmadas diretamente no protocolo.</p>
      </article>
    </div>
  </div>
</section>

<section id="terminal" class="cas-section cas-section--terminal" aria-labelledby="cas-terminal-title">
  <div class="cas-shell">
    <div class="cas-terminal-heading">
      <div>
        <span class="cas-section-label">Dados de mercado</span>
        <h2 id="cas-terminal-title">Terminal CAS</h2>
        <p>Indicadores públicos e candles dos pools descentralizados indexados pela GeckoTerminal.</p>
      </div>
      <a
        class="gecko-attribution"
        href="https://apiguide.geckoterminal.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Documentação da API GeckoTerminal (abre em nova aba)">
        <span>Dados por</span>
        <img src="{{ '/img/brands/geckoterminal/geckoterminal-dark.svg' | relative_url }}" alt="GeckoTerminal" width="184" height="34">
      </a>
    </div>

    <div class="cas-terminal" data-terminal-panel aria-busy="true">
      <div class="cas-terminal__toolbar">
        <label class="cas-control cas-control--pool">
          <span>Pool monitorado</span>
          <select data-pool-select disabled>
            <option>Carregando pools…</option>
          </select>
        </label>
        <div class="cas-control" aria-label="Intervalo do gráfico">
          <span>Período</span>
          <div class="cas-range-group" role="group">
            <button type="button" data-range="24h" class="is-active" aria-pressed="true">24h</button>
            <button type="button" data-range="7d" aria-pressed="false">7d</button>
            <button type="button" data-range="30d" aria-pressed="false">30d</button>
          </div>
        </div>
        <button class="cas-refresh" type="button" data-refresh disabled>
          <i class="fa fa-refresh" aria-hidden="true"></i>
          Atualizar
        </button>
      </div>

      <div class="cas-market-stats">
        <div>
          <span>Preço</span>
          <strong data-stat="price">—</strong>
        </div>
        <div>
          <span>Variação 24h</span>
          <strong data-stat="change">—</strong>
        </div>
        <div>
          <span>Liquidez do pool</span>
          <strong data-stat="liquidity">—</strong>
        </div>
        <div>
          <span>Volume 24h</span>
          <strong data-stat="volume">—</strong>
        </div>
        <div>
          <span>FDV</span>
          <strong data-stat="fdv">—</strong>
        </div>
        <div>
          <span>Transações 24h</span>
          <strong data-stat="transactions">—</strong>
        </div>
      </div>

      <div class="cas-chart">
        <div class="cas-chart__meta">
          <div>
            <strong data-chart-pair>CAS / —</strong>
            <span data-chart-dex>DEX —</span>
          </div>
          <span data-last-update>Atualização pendente</span>
        </div>
        <div class="cas-chart__canvas-wrap">
          <canvas
            data-candlestick-chart
            aria-label="Gráfico de candles do CAS em dólares"
            aria-describedby="cas-chart-description"
            role="img"></canvas>
          <div class="cas-chart__tooltip" data-chart-tooltip hidden></div>
          <div class="cas-chart__empty" data-chart-empty>Carregando série histórica…</div>
        </div>
        <p id="cas-chart-description" class="sr-only" data-chart-description aria-live="polite">O gráfico será descrito após o carregamento.</p>
      </div>

      <div class="cas-terminal__footer">
        <p data-terminal-status role="status" aria-live="polite">Conectando à API pública da GeckoTerminal…</p>
        <p>Atualização automática a cada 5 minutos. Dados em beta podem sofrer atraso.</p>
      </div>
      <noscript>
        <p class="cas-noscript">Ative o JavaScript para carregar os dados dinâmicos do terminal.</p>
      </noscript>
    </div>
  </div>
</section>

<section class="cas-section cas-section--light" aria-labelledby="cas-sources-title">
  <div class="cas-shell cas-source-grid">
    <div>
      <span class="cas-section-label">Documentação</span>
      <h2 id="cas-sources-title">Verifique os dados na fonte</h2>
      <p>Este portfólio resume informações públicas. Endereços, parâmetros e regras atuais devem ser conferidos nos documentos e no contrato.</p>
    </div>
    <ul class="cas-source-list">
      <li><a href="https://agenticspace.vercel.app/info/cas-token/" target="_blank" rel="noopener noreferrer">Visão geral do CAS <i class="fa fa-external-link" aria-hidden="true"></i></a></li>
      <li><a href="https://agenticspace.vercel.app/info/cas-token/whitepaper" target="_blank" rel="noopener noreferrer">Whitepaper <i class="fa fa-external-link" aria-hidden="true"></i></a></li>
      <li><a href="https://agenticspace.vercel.app/info/cas-token/tokenomics" target="_blank" rel="noopener noreferrer">Tokenomics <i class="fa fa-external-link" aria-hidden="true"></i></a></li>
      <li><a href="https://polygonscan.com/token/0x5151A34EaC7bA08cd6B540b32cD30316218A2287" target="_blank" rel="noopener noreferrer">Contrato no PolygonScan <i class="fa fa-external-link" aria-hidden="true"></i></a></li>
      <li><a href="https://apiguide.geckoterminal.com/" target="_blank" rel="noopener noreferrer">Documentação da GeckoTerminal API <i class="fa fa-external-link" aria-hidden="true"></i></a></li>
    </ul>
  </div>

  <div class="cas-shell">
    <aside class="cas-disclaimer" aria-label="Aviso importante">
      <i class="fa fa-info-circle" aria-hidden="true"></i>
      <div>
        <strong>Conteúdo informativo, não recomendação de investimento.</strong>
        <p>Criptoativos são voláteis e pools com baixa liquidez podem apresentar grandes variações de preço. O CAS não representa participação societária, receita ou promessa de retorno. Esta página não executa compra, venda, troca, custódia nem conexão de carteira. Faça sua própria verificação antes de qualquer decisão.</p>
      </div>
    </aside>
  </div>
</section>
