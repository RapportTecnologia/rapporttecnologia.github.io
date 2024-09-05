---
layout: xml-style
title: "RSS Feed (Styled)"
sitemap:
  exclude: true
rootMatcher: '/rss'
disclaimer: 'This <a href="https://en.wikipedia.org/wiki/RSS" target="_blank">RSS feed</a> is meant to be used by <a href="https://en.wikipedia.org/wiki/Template:Aggregators" target="_blank">RSS reader applications and websites</a>.'
---
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <head>
                <title>RSS Feed</title>
                <link rel="stylesheet" type="text/css" href="/css/xslt.css" />
            </head>
            <body>
                <h1>RSS Feed</h1>
                <xsl:for-each select="rss/channel/item">
                    <div class="post">
                        <h2><xsl:value-of select="title"/></h2>
                        <p><xsl:value-of select="description"/></p>
                        <a href="{link}">Read more</a>
                        <hr />
                    </div>
                </xsl:for-each>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
