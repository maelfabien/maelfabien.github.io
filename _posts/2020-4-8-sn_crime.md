---
published: true
title: Social network analysis as a tool for criminal intelligence: Understanding its potential from the perspectivesof intelligence analysts
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

In this article, I will discuss and summarize the paper: ["Social network analysis as a tool for criminal intelligence:understanding its potential from the perspectivesof intelligence analysts"](https://www.researchgate.net/publication/318037428_Social_network_analysis_as_a_tool_for_criminal_intelligence_Understanding_its_potential_from_the_perspectives_of_intelligence_analysts) by Morgan Burcher and Chad Whelan.

<script type="text/javascript" async
src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

# Background

More and more research focuses on social network analysis (SNA) in criminal networks. However, are these methods acutally used by Law Enforcement Agencies (LEAs) and can they leverage it properly? This paper goes some way towards addressing these issues by drawing on qualitative interviews with criminal intelligence analysts from two Australian state law enforcement agencies.

Some past studies have shown that there is sometimes a missalignment between the suspects identified/followed by LEAs and the actual vital characters as identified by SNA. It is hard for researchers to access real world data for security reasons, and it is hard to track how efficient a SNA system actually is in production. 

# The interviews

Semi-structured interviews were conducted among 2 Australian state-police, with respectively 10 and 17 participants, betweeen 2015-2016. These state police have budgets exceeding 3 billion $ each, and more than 10'000 employees each.

Participants are analysts working with digital tools, most of them learned about SNA through internal training. 

# Findings

The understanding of SNA for most analysts is limited to the understanding of the network structure (who knows who), and some basic metrics like the centrality. Most of them do not have a proper idea of what the difference between "betweenness centrality" and "degree centrality" is, it's rather just buttons on the sidebar. Few tools that they use involve disrupting networks or predicting hidden links.

Some participants suggest that SNA is used to identify suspects that were not on the radar of LEAs so far. Also, some suggest that it helps identify if a new information is important or not.

Challenges can be grouped in 4 categories:
- the *size of the network*, which can become huge. Too much information can distract the analyst.
- the *incompleteness of the data*, by the collection or the time during which analysts can keep the data (often limited)
- wasting scarce resources by not defining properly who to include in the SNA or not, know as *fuzzy boundaries*
- the information collected is *dynamic* by nature, meaning that the structure of the network might change quickly

No or few feedbacks are provided on the tool. When a case is over, additional studies should be conducted and feedback should be given (could be automatic, re-train algorithms...). However, no organization is doing that for the moment. 

The lack of training and the technical gap between the software capability and the understanding of analysts is also an issue.

# My personal take on that

I've had several meetings with LEAs these pasts months, and start to understand how they use SNAs tools. Quite often, the lack of training could be partly filled by simple videos explaining how betweenness centrality works for example. I'm pretty sure few softwares currently include that.

Then, I do believe in continual/incremental learning. This is a different learning paradigm for algorithms, since it does require constant feedback on the tool. Clicks (such as merging nodes) should re-train a matching algorithm automatically for example.

