---
layout: project
title: "JWT Lab — Laboratório Didático de JSON Web Tokens"
description: "Laboratório interativo para aprender a construir, assinar, verificar e criptografar JSON Web Tokens, com claims personalizadas e experimentos de JWS e JWE no navegador."
tags: [JWT Lab, JWT, JSON Web Token, JWS, JWE, assinatura digital, criptografia, autenticação, claims, educação, laboratório didático, Rapport Tecnologia]
image: "cards/jwt-lab.svg"
---

## JWT Lab — Laboratório Didático de JSON Web Tokens

O **JWT Lab** é um laboratório didático e interativo para aprender a usar **JSON Web Tokens (JWT)** na prática. A proposta é explorar a construção de tokens, escolher algoritmos e acompanhar as operações de assinatura, verificação e criptografia diretamente no navegador.

Com uma interface em português e explicações passo a passo, o projeto permite experimentar **tokens assinados (JWS)** e **tokens criptografados (JWE)**, além de montar payloads com claims personalizadas. As operações criptográficas são realizadas localmente no navegador com WebCrypto.

### Principais recursos

- **Construção de payloads**: criação de claims personalizadas para explorar as informações transportadas pelo token.
- **Assinatura de tokens**: experimentos com algoritmos como HS256, RS256, PS256, ES256 e EdDSA.
- **Verificação de assinatura e validação de claims**: exploração de expiração (`exp`), início de validade (`nbf`), emissor (`iss`) e destinatário (`aud`).
- **Criptografia e decifragem de JWE**: opções como RSA-OAEP, ECDH-ES, AES-KW, PBES2 e gerenciamento direto de chave (`dir`).
- **Geração de chaves**: criação de pares de chaves RSA e EC no próprio navegador.
- **Acesso gratuito**: ambiente de experimentação com explicações para apoiar o aprendizado de JWT.

### Aprenda experimentando

1. **Monte o payload** com as claims que deseja incluir no token.
2. **Escolha um algoritmo e assine** para explorar a criação de um JWS.
3. **Verifique a assinatura e valide as claims** para estudar os critérios de aceitação do token.
4. **Experimente criptografar e decifrar um JWE** para conhecer também a proteção do conteúdo.

### Para quem é o projeto

O laboratório é voltado a **estudantes, educadores e desenvolvedores** que desejam compreender o uso de JWT em aplicações. Pode apoiar aulas, oficinas e estudos individuais sobre tokens, assinaturas, claims e criptografia, aproximando os conceitos de uma experiência prática.

### Explore o laboratório

[Acesse o JWT Lab](https://rapport.tec.br/jwt/) e experimente a construção, assinatura, verificação e criptografia de tokens no navegador.
