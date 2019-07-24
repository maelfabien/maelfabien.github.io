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
  - url: https://maelfabien.github.io/ent/
    image_path: /assets/images/ent_short.png
---

{% include gallery id="layouts_gallery" class="full" layout="half" caption="Categories"%}


{%- assign search_provider = site.search_provider | default: "lunr" -%}

<input type="text" id="search" class="search-input" tabindex="-1" placeholder="{{ site.data.ui-text[site.locale].search_placeholder_text | default: 'Enter your search term...' }}" />
<div id="results" class="results"></div>
