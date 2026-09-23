---
layout: project
title: "Rapport Crypto Chat"
description: "Chat descentralizado com criptografia ponta a ponta, conexões diretas via WebRTC, identidade baseada em carteira Ethereum e pagamentos protegidos por escrow."
tags: [Rapport Crypto Chat, chat privado, criptografia ponta a ponta, WebRTC, conexão direta, descentralização, blockchain, Ethereum, carteira digital, privacidade, dApp, escrow]
image: "cards/crypto-chat.webp"
external_url: "https://crypto-chat.rapport.tec.br"
redirect_from: /projetos/crypto-p2p-chat/
---

## Rapport Crypto Chat

O **Rapport Crypto Chat** é um aplicativo de conversas privadas que combina **criptografia ponta a ponta**, conexões diretas entre participantes e identidade baseada em carteira blockchain. Não exige cadastro com e-mail ou telefone: a carteira Ethereum representa a identidade do usuário.

As mensagens são cifradas no dispositivo antes do envio com **X25519** e **ChaCha20-Poly1305**. A comunicação ocorre de forma direta entre os dispositivos via **WebRTC**; o relay é utilizado somente para sinalização e não transporta o conteúdo das conversas.

### Principais recursos

- **Criptografia ponta a ponta** para manter o conteúdo das mensagens privado.
- **Conexão direta entre dispositivos via WebRTC**, reduzindo a dependência de servidores centrais de mensagens.
- **Identidade por carteira Ethereum**, sem e-mail, telefone ou KYC.
- **Aplicativo descentralizado**, pensado para conversas com mais autonomia e privacidade.

### Pagamentos protegidos com Escrow

O **Rapport Crypto Chat** também oferece um serviço de **escrow** para envio de criptomoedas com custódia neutra. Em vez de transferir diretamente para o destinatário, o valor fica travado em um contrato inteligente até que um árbitro — uma pessoa de confiança escolhida pelas partes — confirme que o pagamento pode ser liberado.

- **Custódia neutra em contrato inteligente**: os fundos só saem com aprovação do árbitro.
- **Árbitro escolhido pelas partes**: pode ser um único árbitro ou dois, caso o recebedor solicite uma segunda opinião.
- **Reembolso automático**: se o prazo definido expirar ou o árbitro rejeitar, o pagador recupera o valor.
- **Transparente no chat**: cada etapa do escrow aparece como mensagem cifrada para todos os envolvidos.
- **Taxas claras**: 0,50% para o gestor do app e 0,25% para cada árbitro, cobradas apenas na liquidação.

Para usar, basta digitar `/escrow` dentro de uma conversa direta. Saiba mais em [crypto-chat.rapport.tec.br/escrow](https://crypto-chat.rapport.tec.br/escrow).

[Acesse o Rapport Crypto Chat](https://crypto-chat.rapport.tec.br).
