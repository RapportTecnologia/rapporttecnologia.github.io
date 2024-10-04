---
layout: page
language: pt-br
title: Contratos
description: Lista dos Contratos
tags:
  [ingeligência artificial, chatGPT, LLM, FSM, NLP, LGPD, contratos, GDPR, RGPD, LOPD, FSM-NLP, RAPPORT, RAPPORT OS, RAPPORT, BOT, RAPPORT BOT, RAPPORT API, API]
redirect_from: /contrato
permalink: /contratos
---

<div class="container">
    <div class="row">
        <div class="col-md-3 col-sm-6">
          <h4>Contratos</h4>
          <ul class="list-unstyled">
              {% assign collection_items = site['contratos'] %}
              {% for item in collection_items %}
                <li>
                  {% if item.icon %}
                    <span class="fa fa-{{ item.icon | downcase }}"></span>
                  {% endif %}
                  <a href="{{ item.url | relative_url }}">{{ item.title }}</a></li>
              {% endfor %}
          </ul>
        </div>
    </div>
</div>