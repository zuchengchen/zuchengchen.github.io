---
layout: academic-page
title: "Publications"
permalink: /publications/
author_profile: false
---

<div class="academic-page academic-page--archive">
  <header class="academic-page__header">
    <p class="section-kicker">
      <span class="lang-en">Publications</span>
      <span class="lang-zh">论文</span>
    </p>
    <h1>
      <span class="lang-en">Research Publications</span>
      <span class="lang-zh">研究论文</span>
    </h1>
    <p class="lang-en">Selected and generated publication records are listed below. Paper titles and journal metadata are kept in their original scholarly form.</p>
    <p class="lang-zh">下方为论文记录列表。论文题名、期刊和 arXiv 信息保留学术原文格式。</p>
    <p>
      <a class="text-link" href="https://scholar.google.com/citations?user=orjQzDgAAAAJ&amp;hl=en">Google Scholar</a>
    </p>
  </header>

  {% include base_path %}

  <div class="academic-archive-list">
    {% for post in site.publications reversed %}
      {% include archive-single.html %}
    {% endfor %}
  </div>
</div>
