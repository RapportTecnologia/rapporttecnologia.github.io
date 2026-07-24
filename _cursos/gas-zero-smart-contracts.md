---
layout: project
title: "Introdução ao uso de taxa (GAS) 0 em transações com Smart Contracts"
description: "Implemente transações patrocinadas com Account Abstraction, Smart Accounts e Paymaster sem transferir a complexidade do GAS ao usuário."
tags: [GAS, Account Abstraction, ERC-4337, Smart Account, Paymaster, Bundler, UserOperation, Smart Contracts, workshop, ApD]
image: "cards/gas-zero-smart-contracts.webp"
order: 5
---

## Introdução ao uso de taxa (GAS) 0 em transações com Smart Contracts

“GAS 0” descreve uma experiência em que o usuário não precisa possuir o token
nativo para enviar uma operação. A taxa da rede continua existindo, mas é
patrocinada por uma plataforma por meio de regras e limites definidos em um
**Paymaster**.

### Objetivos

- compreender por que toda execução em blockchain possui custo;
- distinguir uma transação tradicional de uma `UserOperation`;
- conhecer Smart Account, Bundler, EntryPoint e Paymaster;
- criar uma política de patrocínio com limites e validações;
- implementar e testar um fluxo patrocinado em testnet;
- avaliar segurança, orçamento, abuso e observabilidade.

### Conteúdo

1. GAS, token nativo, estimativa e ciclo de inclusão;
2. Account Abstraction e arquitetura ERC-4337;
3. construção, assinatura e envio de `UserOperation`;
4. validação e execução por Smart Accounts;
5. Paymaster, depósito, stake e políticas de patrocínio;
6. allowlists, quotas, expiração, anti-replay e prevenção de spam;
7. monitoramento de custos e alternativas como meta-transações.

### Desafio do workshop

Na abordagem **ApD**, a turma recebe o desafio de remover a barreira inicial de
GAS de uma aplicação. Os participantes especificam a política do patrocinador,
implementam o fluxo em testnet e demonstram uma operação na qual o usuário não
paga diretamente a taxa.

### Público e requisitos

Indicado para desenvolvedores com noções de Solidity, carteiras e integração
Web3. O workshop não utiliza fundos reais e enfatiza limites operacionais e
controles de segurança.

### Resultado esperado

O aluno compreenderá que o custo não desaparece: ele é realocado. Ao final,
terá um protótipo de operação patrocinada e critérios para decidir quando essa
experiência é sustentável.
