---
layout: project
title: "Rapport Oracle"
description: "Oráculo multi-chain — EVM/Polygon, Solana e Stellar — no modelo Oraclize/Provable, com middleware em Cloudflare Workers e conectores on-chain com provas criptográficas."
tags: [Rapport Oracle, oráculo blockchain, oracle multi-chain, Provable, Oraclize, Cloudflare Workers, EVM, Polygon, Solana, Stellar, Soroban, Anchor, smart contracts, Web3, dados off-chain, open source, Rapport Tecnologia]
image: "cards/rapport-oracle.svg"
featured: true
---

## O que é o Rapport Oracle

O **Rapport Oracle** é um oráculo genérico **multi-chain** desenvolvido pela Rapport Tecnologia que conecta smart contracts a dados do mundo real. No modelo **Oraclize/Provable**, o contrato consumidor emite uma query, o middleware busca o dado em fontes externas e devolve o resultado on-chain por callback assinado — com **prova criptográfica verificável** pelo próprio contrato.

## Como funciona

1. **Query on-chain**: o contrato consumidor chama `query(delay, datasource, arg)` no conector da sua chain e um evento (`LogNewQuery`) é emitido.
2. **Resolução off-chain**: um Worker Cloudflare faz polling dos eventos a cada minuto, executa o fetch da datasource `"URL"` e extrai o campo desejado com a DSL `json(url).path`.
3. **Callback assinado**: o relayer envia `__callback(rqid, result, proof)` de volta ao consumidor, que valida `cbAddress` e a assinatura on-chain.

## Principais capacidades

- **Multi-chain nativo**: conectores para EVM/Polygon (Solidity), Solana (Anchor) e Stellar (Soroban) com a mesma API de query.
- **Provas criptográficas**: ECDSA na EVM e ed25519 na Solana e Stellar.
- **Edge computing**: middleware em Cloudflare Workers com estado em KV, deduplicação e retry.
- **Bibliotecas para desenvolvedores**: libs `usingRapportOracle` (Solidity), `rapport_oracle_sdk` (Anchor) e `rapport-oracle-lib` (Soroban).
- **Segurança por design**: ownership administrativo sob multisig Safe 2-de-3; relayer operacional sem privilégios administrativos.
- **Open source**: workspace público com módulos independentes integrados como git submodules.

## Módulos do projeto

| Módulo | Repositório | Descrição |
|---|---|---|
| Middleware | [rapport_oracle_middleware](https://github.com/RapportTecnologia/rapport_oracle_middleware) | Worker Cloudflare — API do oráculo, cache KV e fila de atualizações |
| Smart Contracts | [rapport_oracle](https://github.com/RapportTecnologia/rapport_oracle) | Conectores on-chain (Hardhat/Foundry, Anchor, Soroban) e scripts de deploy |
| Workspace | [Rapport_Oracle_Workspace](https://github.com/RapportTecnologia/Rapport_Oracle_Workspace) | Repositório raiz que integra os módulos como submodules |

## Casos de uso

- **Feeds de preços e cotações** para DeFi e tesourarias tokenizadas.
- **Dados climáticos, IoT e sensores** para contratos paramétricos.
- **Resultados esportivos e eventos** para mercados de previsão e sorteios auditáveis.
- **Qualquer API HTTP pública** consumível pela DSL `json(url).path`.

## Faucets para teste

Precisa de tokens de teste para experimentar o oracle — POL na Polygon Amoy, SOL na devnet da Solana ou XLM na testnet da Stellar? Solicite diretamente [abrindo uma issue no repositório](https://github.com/RapportTecnologia/Rapport_Oracle_Workspace/issues/new?title=Solicita%C3%A7%C3%A3o%20de%20Faucet%20para%20teste&body=Rede%3A%20(ex.%3A%20Polygon%20Amoy%2C%20Solana%20devnet%2C%20Stellar%20testnet)%0AEndere%C3%A7o%20da%20carteira%3A%0AQuantidade%20estimada%3A) ou pela página [Crypto Faucets](https://rapport.tec.br/crypto-faucets/) da Rapport.

## Saiba mais

Visite a página do projeto em [rapporttecnologia.github.io/Rapport_Oracle_Workspace](https://rapporttecnologia.github.io/Rapport_Oracle_Workspace/) e explore o código no [GitHub](https://github.com/RapportTecnologia/Rapport_Oracle_Workspace).
