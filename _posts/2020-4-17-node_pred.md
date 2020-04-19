---
published: true
title: Predicting the centrality of a node in time-varying networks
layout: single
author_profile: true
read_time: true
categories: [machinelearning]
excerpt : "Criminal Networks"
header :
    overlay_image: "https://maelfabien.github.io/assets/images/wolf.jpg"
    teaser: "https://maelfabien.github.io/assets/images/wolf.jpg"
comments : true
toc: true
toc_sticky: true
sidebar:
    nav: sidebar-sample
---

I have recently been working on time-varying networks, i.e. networks for which we have timestamps of various interactions between the nodes. This is the case for social networks or criminal networks for example. When we analyze the centrality of the nodes of a graph, it gives us a snapshot at the exact moment of the structure of the graph.

However, these networks are time-varying by nature. They evolve, new interactions are being made, new nodes are created... And knowing which nodes are going to be central next month can be a key information in criminal investigations. For this reason, I wanted to spend some time and look at whether one can actually predict the central nodes in the future.


<script type="text/javascript" async
src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

# Dataset

I am working on the Enron e-mail dataset, enriched by phone calls that I was able to match. I have overall 1264 events, each event being either an email or a phone call between 2 characters (or more).

The timestamps vary between 2000-08-03 09:10:00 and 2001-01-29 22:21:00. Thus, we have a time period of close to 4 months of events. 

The first thing that we should look at is the evolution of the centrality of the nodes over time.




![image](https://maelfabien.github.io/assets/images/var.png)

# Discussion
