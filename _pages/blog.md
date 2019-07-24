---
layout: single
permalink: /blog/
author_profile: true
title: "Articles"
excerpt: "Minimal Mistakes is a flexible two-column Jekyll theme."
layouts_gallery:
  - url: https://maelfabien.github.io/ml/
    image_path: /assets/images/ml_short.png
  - url: https://maelfabien.github.io/dl/
    image_path: /assets/images/dl_short.png
  - url: https://maelfabien.github.io/bgd/
    image_path: /assets/images/de_short.png
---

{% include gallery id="layouts_gallery" class="full" layout="half" caption="Categories"%}


<div id="main" role="main">
  {% include sidebar.html %}

  <div class="archive">

    {%- assign search_provider = site.search_provider | default: "lunr" -%}
    {%- case search_provider -%}
      {%- when "lunr" -%}
        <input type="text" id="search" class="search-input" tabindex="-1" placeholder="{{ site.data.ui-text[site.locale].search_placeholder_text | default: 'Enter your search term...' }}" />
        <div id="results" class="results"></div>
      {%- when "google" -%}
        <form onsubmit="return googleCustomSearchExecute();" id="cse-search-box-form-id">
        <input type="text" id="cse-search-input-box-id" class="search-input" tabindex="-1" placeholder="{{ site.data.ui-text[site.locale].search_placeholder_text | default: 'Enter your search term...' }}" />
        </form>
        <div id="results" class="results">
          <gcse:searchresults-only></gcse:searchresults-only>
        </div>
      {%- when "algolia" -%}
        <div class="search-searchbar"></div>
        <div class="search-hits"></div>
    {%- endcase -%}
  </div>
</div>
