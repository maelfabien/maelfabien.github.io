---
published: true
title: Introduction to the ElasticStack
collection: bgd
layout: single
author_profile: true
read_time: true
categories: [bigdata]
excerpt : "Elastic Search, Logstash, Kibana"
header :
    overlay_image: "https://maelfabien.github.io/assets/images/wolf.jpg"
    teaser: "https://maelfabien.github.io/assets/images/wolf.jpg"
comments : true
toc: true
toc_sticky: true
sidebar:
    nav: sidebar-sample
---

![image](https://maelfabien.github.io/assets/images/els.jpg)

You may have already heard of Elasticsearch and Kibana. Elasticsearch is an open-source distributed, RESTful search and analytics engine capable of solving a growing number of use cases. Elasticsearch has been downloaded over 250 million times and has an active community of more than 100'000 members.

# I. The Elastic Stack

![image](https://maelfabien.github.io/assets/images/elastic_stack.jpg)

Kibana is used to visualize data, and Elasticsearch is used to store, search and analyze the data. 

Logstash and Beats are used to ingest the data and put them into Elasticsearch :
- Beats is a lightweight data shipper that you can put on your applications
- Logstash is an ETL tool to enrich and process the data before putting it into Elasticsearch

Elasticsearch became so popular because :
- it is scalable and distributed, and can easily handle millions of documents or a large number of requests per second
- the data model in Elasticsearch is flexible, and data can, therefore, be represented in more than 2 different ways. It mimics how an application will consume the data. 
- it is highly available and fault tolerant
- it is also developer-friendly

There are two ways to deploy Elasticsearch :
- using the fully managed cloud solution accessible <span style="color:blue">[here](https://cloud.elastic.co/)</span>
- locally, using <span style="color:blue">[this link](https://www.elastic.co/downloads/elasticsearch)</span>

In further articles, we'll cover both deployment methods.
