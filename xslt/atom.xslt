---
layout: xml-style
title: "Atom Feed (Styled)"
sitemap:
  exclude: true
rootMatcher: '/atom:feed'
stylesheetAttributes: 'xmlns:atom="http://www.w3.org/2005/Atom"'
disclaimer: 'This <a href="https://en.wikipedia.org/wiki/RSS" target="_blank">Atom feed</a> is meant to be used by <a href="https://en.wikipedia.org/wiki/Template:Aggregators" target="_blank">RSS reader applications and websites</a>.'
---
<<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <head>
                <title>Atom Feed</title>
                <link rel="stylesheet" type="text/css" href="/css/xslt.css" />
            </head>
            <body>
                <h1>Atom Feed</h1>
                <xsl:for-each select="feed/entry">
                    <div class="post">
                        <h2><xsl:value-of select="title"/></h2>
                        <p><xsl:value-of select="content"/></p>
                        <a href="{link}">Read more</a>
                        <hr />
                    </div>
                </xsl:for-each>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
