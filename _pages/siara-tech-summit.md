---
layout: page
title: "Rapport no Siará Tech Summit 2026"
description: "Acompanhe a participação da Rapport Tecnologia no Siará Tech Summit 2026: stand próprio, projetos em exposição e toda a nossa cobertura do evento."
keywords: "Siará Tech Summit, STS 2026, Rapport Tecnologia, Sebrae, inovação, startups, Fortaleza, Centro de Eventos do Ceará"
tags: [Siará Tech Summit, STS 2026, eventos, Rapport Tecnologia, Sebrae, inovação]
---

## Siará Tech Summit 2026

O **Siará Tech Summit (STS)**, promovido pelo **Sebrae/CE**, é o maior evento de tecnologia e inovação do Ceará. A 4ª edição acontece nos dias **7, 8 e 9 de outubro de 2026**, das 14h às 22h, no **Centro de Eventos do Ceará** (Av. Washington Soares, 999 – Fortaleza/CE), reunindo centenas de startups expositoras e dezenas de milhares de visitantes.

A **Rapport Tecnologia** estará presente com **stand próprio**, expondo projetos e soluções de fronteira — Sistemas Embarcados, IoT/AIoT, Inteligência Artificial Agêntica e Blockchain/Web 3.0. Acompanhe abaixo todos os nossos artigos sobre o evento.

### Artigos sobre o Siará Tech Summit

{% assign sts_posts = site.posts | where_exp: "post", "post.tags contains 'Siará Tech Summit'" %}
<ul class="list-unstyled">
{% for post in sts_posts %}
  <li>
    <h4><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h4>
    <p>{{ post.excerpt | strip_html | truncate: 200 }}</p>
    <p><small>Publicado em {{ post.date | date: "%d/%m/%Y" }}{% if post.author %} por {{ post.author }}{% endif %}</small></p>
  </li>
  <hr>
{% else %}
  <li><p class="text-muted">Em breve publicaremos nossos artigos sobre o evento.</p></li>
{% endfor %}
</ul>

Mais informações sobre o evento no site oficial: [stssebrae.com.br](https://stssebrae.com.br/)
