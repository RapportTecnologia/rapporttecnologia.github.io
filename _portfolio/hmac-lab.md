---
layout: project
title: "HMAC Lab — Laboratório Didático de Autenticação de Mensagens"
description: "Laboratório interativo para calcular e verificar HMAC, visualizar suas etapas internas e explorar cenários de autenticação de mensagens, APIs e webhooks no navegador."
tags: [HMAC Lab, HMAC, autenticação de mensagens, integridade, criptografia, SHA-256, SHA-512, webhooks, APIs assinadas, JWT, educação, laboratório didático, Rapport Tecnologia]
image: "cards/hmac-lab.svg"
---

## HMAC Lab — Laboratório Didático de Autenticação de Mensagens

O **HMAC Lab** é um laboratório didático e interativo da Rapport Tecnologia para compreender os **códigos de autenticação de mensagem baseados em hash (HMAC)**. A proposta é aprender pela experimentação: calcular códigos, verificar resultados e acompanhar as etapas que combinam uma chave secreta com uma mensagem.

Com uma interface em português, o projeto aproxima os conceitos de integridade e autenticidade de situações práticas, como **APIs assinadas, webhooks e JWT HS256**. Os cálculos são realizados localmente no navegador, em um ambiente gratuito de estudo.

### Principais recursos

- **Cálculo de HMAC**: experimentos com SHA-256, SHA-384 e SHA-512, além das opções SHA-1 e MD5 disponíveis no laboratório.
- **Visualização das etapas internas**: acompanhamento do tratamento da chave, dos valores `ipad` e `opad` e dos hashes aninhados que compõem o cálculo.
- **Verificação de códigos de autenticação**: conferência de um MAC para explorar sua relação com a mensagem e a chave utilizadas.
- **Diagramas de sequência**: representações de comunicações autenticadas em APIs, webhooks e JWT HS256, incluindo cenários de replay e adulteração.
- **Vetores de teste**: exemplos das RFCs 2202 e 4231 para conferir os resultados dos cálculos.
- **Acesso gratuito pelo navegador**: recursos interativos para apoiar aulas e estudos individuais.

### Aprenda experimentando

1. **Defina a mensagem e a chave** e escolha um algoritmo para calcular o HMAC.
2. **Acompanhe as etapas internas** para observar como a chave e a mensagem participam do resultado.
3. **Verifique o código gerado** e experimente alterar a mensagem ou a chave para comparar os resultados.
4. **Explore os diagramas de sequência** para entender o papel do HMAC em comunicações autenticadas e nos cenários de adulteração e replay.
5. **Confira os vetores de teste** para relacionar os experimentos aos exemplos de referência do laboratório.

### Para quem é o projeto

O laboratório é voltado a **estudantes, educadores e desenvolvedores** interessados em autenticação de mensagens e integração de sistemas. Pode apoiar aulas, oficinas e estudos sobre HMAC, aproximando o cálculo criptográfico de seus usos em aplicações.

### Explore o laboratório

[Acesse o HMAC Lab](https://rapport.tec.br/hmac/) e experimente o cálculo, a verificação e a visualização de códigos de autenticação de mensagem.
