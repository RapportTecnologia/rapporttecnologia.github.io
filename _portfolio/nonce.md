---
layout: project
title: "Nonce — Laboratório Didático de Blockchain"
description: "Laboratório interativo para explorar nonce, hashes SHA-256, mineração Proof of Work e integridade do encadeamento de blocos diretamente no navegador."
tags: [Nonce, blockchain, SHA-256, hash, Proof of Work, mineração, criptografia, educação, laboratório didático, Rapport Tecnologia]
image: "cards/nonce.svg"
---

## Nonce — Laboratório Didático de Blockchain

O **Nonce** é um laboratório interativo da Rapport Tecnologia para compreender como o nonce participa do cálculo do hash e como os blocos se conectam em uma blockchain. A proposta é aprender pela experimentação: alterar dados, comparar resultados e observar o que acontece com a integridade da cadeia.

Diretamente no navegador, o usuário pode explorar a composição de um bloco, modificar suas transações e variar o nonce para acompanhar as mudanças no **hash SHA-256**.

### Principais recursos

- **Composição de um bloco**: edição de versão, altura, timestamp, hash do bloco anterior e nonce, além das transações que alimentam uma Merkle Root didática.
- **Cálculo de hash SHA-256**: visualização dos dados usados no cálculo e do resultado produzido a cada alteração.
- **Mineração didática**: busca automática de um nonce que satisfaça o critério de dificuldade, ajustável de um a cinco zeros iniciais no hash.
- **Acompanhamento das tentativas**: histórico de nonces e hashes, quantidade de tentativas, tempo decorrido e taxa de cálculo.
- **Efeito avalanche**: comparação entre o hash anterior e o atual, com indicação da diferença aproximada entre seus bits.
- **Teste de integridade**: selagem de um bloco válido e demonstração de como alterações posteriores afetam sua ligação com o próximo bloco.

### Aprenda experimentando

1. **Explore o bloco** e edite os metadados ou as transações de exemplo.
2. **Varie o nonce** manualmente ou inicie a mineração para encontrar um hash que atenda à dificuldade escolhida.
3. **Compare os hashes** para observar como uma pequena alteração modifica o resultado.
4. **Sele o bloco e altere seus dados** para entender por que o próximo bloco deixa de apontar para o hash atual.

### Para quem é o projeto

O laboratório é voltado a **estudantes, educadores, desenvolvedores e pessoas interessadas em blockchain**. Pode apoiar aulas, oficinas e estudos individuais sobre hashes, Proof of Work e encadeamento de blocos, tornando esses conceitos visíveis por meio de experimentos.

O modelo é uma **representação didática de uma blockchain Proof of Work**, com uma Merkle Root simulada. Redes reais possuem regras adicionais de consenso, validação, comunicação e composição dos blocos.

### Explore o laboratório

[Acesse o Nonce](https://rapport.tec.br/nonce/) e experimente os conceitos na prática.

O código do projeto está disponível no [GitHub da Rapport Tecnologia](https://github.com/RapportTecnologia/nonce).
