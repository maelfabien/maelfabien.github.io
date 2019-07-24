---
layout: archive
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

{% include gallery id="layouts_gallery" class="full" layout="half"%}

# All articles

{% capture written_label %}'None'{% endcapture %}

{% for collection in site.collections %}
    {% unless collection.output == false or collection.label == "posts" %}
        {% capture label %}{{ collection.label }}{% endcapture %}
        {% if label != written_label %}
            <h2 id="{{ label | slugify }}" class="archive__subtitle">{{ label }}</h2>
            {% capture written_label %}{{ label }}{% endcapture %}
        {% endif %}
    {% endunless %}
    {% for post in collection.docs %}
        {% unless collection.output == false or collection.label == "posts" %}
            {% include archive-single.html %}
        {% endunless %}
    {% endfor %}
{% endfor %}