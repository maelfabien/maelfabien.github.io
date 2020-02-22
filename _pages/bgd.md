---
title: Data Engineering
layout: single
permalink: /bgd/
author_profile: false
header :
    image: "https://maelfabien.github.io/assets/images/bgd_head.png"
sidebar:
    nav: sidebar-sample
---

A series of articles dedicated to Big Data analytics and Data Engineering. All codes and exercises of my blog are hosted on GitHub in a dedicated repository :

<div class="github-card" data-github="maelfabien/Machine_Learning_Tutorials" data-width="100%" data-height="" data-theme="default"></div>
<script src="//cdn.jsdelivr.net/github-cards/latest/widget.js"></script>

I'll start by introducing really general articles :

[Understanding Computer Components](https://maelfabien.github.io/bigdata/comp_components) : In order to fully understand the cloud concepts, I wrote a quick article on the main components of computers.

[Useful Bash commands](https://maelfabien.github.io/bigdata/Terminal) : A quick recap of useful Bash commands to interact with your Terminal.

[Making your code production-ready](https://maelfabien.github.io/bigdata/Code) : A quick overview of nice tools to improve the quality of your code before production !

<br>

![image](https://maelfabien.github.io/assets/images/hadoop_head.jpg)

[Introduction to Hadoop](https://maelfabien.github.io/bigdata/hadoop) : In this article, we'll cover the basics of Hadoop, a quick history, and an overview of the main features of Hadoop.

[MapReduce](https://maelfabien.github.io/bigdata/MapReduce) : MapReduce is a programming paradigm that allows to process a large amount of data by initially splitting the data into blocks, sending the blocks to different clusters to perform operations, and aggregating the results.

[HDFS](https://maelfabien.github.io/bigdata/HDFS) : HDFS stands for Hadoop Distributed File System. It is a sub-project of Hadoop. HDFS lets you connect nodes contained within clusters over which data files are distributed, overall being fault-tolerant.

[VM's in Virtual Box](https://maelfabien.github.io/bigdata/VM) : Hadoop runs only on GNU/Linux platforms. Therefore, if you have another OS, you need to install Virtual Box. Virtual Box is a software that lets you create and run Virtual Machines.

[Hadoop with the HortonWorks Sandbox](https://maelfabien.github.io/bigdata/HortonWorks) : The Sandbox by Hortonworks is a straightforward, pre-configured, learning environment that contains the latest developments from Apache Hadoop, specifically the Hortonworks Data Platform (HDP).

[Load and move files to HDFS](https://maelfabien.github.io/bigdata/HDFS_2) : In this article, we'll see how to download the input text file for our WordCount job, and put the file into HDFS. 

[Launch a Map Reduce Job](https://maelfabien.github.io/bigdata/MRJob) : In this article, we'll get to the core of the exercise : launch a MapReduce WordCount job.

[MapReduce Jobs in Python](https://maelfabien.github.io/bigdata/MRJobP) : Using Hadoop Streaming, we can submit MapReduce Jobs in Python.

[Execute MapReduce Job in Python locally](https://maelfabien.github.io/bigdata/MRH) : In this short article, we'll see how to execute MapReduce Jobs using Hadoop streaming locally.

<br>

![image](https://maelfabien.github.io/assets/images/spark_head.jpg)

[Introduction to Spark](https://maelfabien.github.io/bigdata/spark1) : Apache Spark is a unified analytics engine for large-scale data processing. It is overall much faster than Hadoop MapReduce, and widely used in the industry.

[Install Spark-Scala and PySpark](https://maelfabien.github.io/bigdata/spark2) : In this quick tutorial, we'll cover installation techniques for the 2 most popular APIs of Spark.

[Using Spark-Scala for Machine Learning](https://maelfabien.github.io/bigdata/spark3) : A dive into Spark-Scala for Machine Learning through examples.


<br>

![image](https://maelfabien.github.io/assets/images/aws_head.jpg)

[Cloud Concepts](https://maelfabien.github.io/bigdata/cloud_concept/) : What is Cloud Computing ? What are the main concepts behind it ? This article is part of the AWS Cloud Practioner certification.

[Core Services](https://maelfabien.github.io/bigdata/core_services/) : What are the core services of AWS and other Cloud providers ?

<br>

![image](https://maelfabien.github.io/assets/images/gcp_head.jpg)

[TPU survival guide on Google Colaboratory](https://maelfabien.github.io/bigdata/ColabTPU/) : TPUs are changing the way we are training Neural Networks. Developped by Google, TPUs have a different way to perform matrix operations and are optimized for certain tasks. We'll cover the basics of TPU computation, and how to use them in Colab.

[Using Google Drive to save and load files in Colab](https://maelfabien.github.io/bigdata/ColabDrive/) : Google Colab offers CPUs, GPUs and TPUs for free. It's a great tool for any project, but you need to have your files uploaded on Google Drive. We'll see how to interact with Google Drive from Colab.


[Deploy a container on GCP](https://maelfabien.github.io/project/Streamlit2/) : A simple step by step tutorial on how to deploy a container on Google Cloud Platform.

The articles below are part of the **Google Cloud Platform Data Engineering Specialization** on Coursera :

*Course 1:  Google Cloud Platform Big Data and Machine Learning Fundamentals*

[Introduction to GCP (Week 1 Module 1)](https://maelfabien.github.io/bigdata/gcps_1/) : Introduction to Google Cloud Platform and its services.

[Lab on Compute Engine (Week 1 Module 1)](https://maelfabien.github.io/bigdata/gcps_2/) : Create a small webapp to display earthquake data publicly using Compute Engine and Storage Buckets.

[Lab on BigQuery (Week 1 Module 1)](https://maelfabien.github.io/bigdata/gcps_3/) : Explore a Public Dataset with BigQuery, and import our own data.

[Introduction to Recommendation Systems (Week 1 Module 2)](https://maelfabien.github.io/bigdata/gcps_4/) : E-commerce is probably the most common recommendation systems that we encounter. Models learn what we may like based on our preferences.

[Run Spark jobs on Cloud DataProc (Week 1 Module 2)](https://maelfabien.github.io/bigdata/gcps_5/) : Running a Pi-estimate Spark job using Cloud DataProc.

[Lab - Recommend products using Cloud SQL and SparkML](https://maelfabien.github.io/bigdata/gcps_6/) : Execute SparkML jobs and recommend products using CloudSQL.

[Run ML models in SQL with BigQuery ML (Week 1 Module 3)](https://maelfabien.github.io/bigdata/gcps_7/) : BigQuery ML is a cool feature to run linear or logistic regressions in SQL. 

[Create Streaming Data Pipelines (Week 2 Module 1)](https://maelfabien.github.io/bigdata/gcps_8/) : Discover Cloud DataFlow, Apache Beam, Cloud Pub/Sub...

[Lab - Create a streaming data pipeline with Cloud DataFlow](https://maelfabien.github.io/bigdata/gcps_9/) : Ingest real-time data with Cloud Dataflow, analyze it in BigQuery, explore it in DataStudio.

[Classify Images using Vision API and Cloud AutoML (Week 2 Module 2)](https://maelfabien.github.io/bigdata/gcps_10/) : An introduction to ML solutions for unstructured data in GCP.

*Course 2: Leveraging Unstructured Data with Cloud Dataproc on Google Cloud Platform*

[Introduction to Cloud Dataproc (Week 1 Module 1)](https://maelfabien.github.io/bigdata/gcps_12/) : Running Hadoop Clusters and submitting jobs has never been easier.

[Lab - Create a Cloud DataProc Cluster](https://maelfabien.github.io/bigdata/gcps_13/) : A full guide to creating a cluster on Cloud Dataproc.

[Run jobs on Dataproc (Week 1 Module 2)](https://maelfabien.github.io/bigdata/gcps_14/) : How to run jobs on Dataproc using Pig, Hive or Spark?
 
<br>

![image](https://maelfabien.github.io/assets/images/docker_head.png)

[Deploy a Streamlit WebApp with Docker](https://maelfabien.github.io/project/Streamlit/) : Build and run a container from a simple Named Entity Recognition web application.

[Deploy a container on GCP](https://maelfabien.github.io/project/Streamlit2/) : Deploy the container to DockerHub and run it on GCP !

![image](https://maelfabien.github.io/assets/images/elk_head.jpg)

[Introduction to the Elastic Stack](https://maelfabien.github.io/bigdata/ElasticStack/) : What is the Elastic Stack ? What are the main products and features of ELK ?

[Getting started with Elastic Cloud and Kibana](https://maelfabien.github.io/bigdata/ElasticCloud/) : Elastic Cloud allows on demand cluster deployment. It is an easy way to deploy your platform within seconds, and start visualization with Kibana.

[Install and run Elasticsearch + Kibana locally](https://maelfabien.github.io/bigdata/Elasticsearch/) : How can you install Elasticsearch and Kibana locally ? We'll also cover a Heartbeat metric for your computer.

[Working with Dev Tools in Elasticsearch](https://maelfabien.github.io/bigdata/DevTools/) : DevTools is the default interpreter to interact with your data in Elasticsearch. We'll cover the basic queries and data manipulations.

<br>

![image](https://maelfabien.github.io/assets/images/neo_head.jpg)

[Introduction to Graphs](https://maelfabien.github.io/machinelearning/graph_1/) :  What is a graph ? Where are graphs being used ? What are the components of a graph ?

[Graph Analysis, Erdos-Rényi, Barabasi-Albert](https://maelfabien.github.io/machinelearning/graph_2/) :  In this article, we cover the two main types of graphs, and describe a first approach to graph analysis. 

[Graph Algorithms](https://maelfabien.github.io/machinelearning/graph_3/) : We'll now explore the main graph algorithms and several use cases in a visual way with direct examples in Python. 

[Graph Learning](https://maelfabien.github.io/machinelearning/graph_4/) :  How can we handle missing links or missing nodes in graphs ? 

[Introduction to Neo4J and Graph Databases](https://maelfabien.github.io/bigdata/Neo4J/) : Neo4J is a graph oriented database that is widely used for anomaly detection or real time recommendation. We'll cover the basics of Neo4J here.

[A day at the Neo4J Graph Tour](https://maelfabien.github.io/bigdata/Neo4J_gt/) : I had the opportunity to attend the Neo4J Graph Tour 2019. Here's what I learned.

<br>

![image](https://maelfabien.github.io/assets/images/nosql_head.jpg)

[Install Zeppelin Locally](https://maelfabien.github.io/bigdata/zeppelin_local/) : How to easily install Zeppelin on your local machine ? 

[Run a Zeppelin Notebook in AWS EMR](https://maelfabien.github.io/bigdata/zeppelin_emr/) : Running Zeppelin locally is good. But at the time of Big Data analytics, how can you launch Zeppelin on AWS EMR ?

[Working with Amazon S3 Buckets](https://maelfabien.github.io/bigdata/storage/) : S3 buckets offer great storage solutions for your Big Data projects. We'll see how to get a simple example to work.

[Launch and access an AWS EC2 Cluster](https://maelfabien.github.io/bigdata/EC2/) : A quick overview of how to work with AWS EC2 and establish SSH connection with it.

[Install Apache Cassandra on an AWS EC2 Cluster](https://maelfabien.github.io/bigdata/EC2_Cassandra/) : Cassandra is a No-SQL approach store large amount of data. In this article, we'll see how to install it on your EC2 cluster.

[Install Zookeeper on EC2 instances](https://maelfabien.github.io/bigdata/ZK/) : How can you install Zookeeper on EC2 instances for a resilient architecture ?

[Install Apache Spark on EC2 instances](https://maelfabien.github.io/bigdata/Spark/) : An article on how to install Spark on EC2 instances and get your Big Data platform ready !

[Big (Open)  Data , the GDELT Project](https://maelfabien.github.io/bigdata/zeppelin-GDELT/) : We'll introduce GDELT, an open source database with several Tb of data available. 

[Build an ETL in Scala for GDELT Data](https://maelfabien.github.io/bigdata/Scala/) : How can you process such a large amount of data using Scala and S3 ?

[Move Scala Dataframes to Cassandra](https://maelfabien.github.io/bigdata/Scala_Cassandra/) : Once the data has been processed, how can you move it to Cassandra ?

<br>

<script type="text/javascript" src="//downloads.mailchimp.com/js/signup-forms/popup/unique-methods/embed.js" data-dojo-config="usePlainJson: true, isDebug: false"></script><script type="text/javascript">window.dojoRequire(["mojo/signup-forms/Loader"], function(L) { L.start({"baseUrl":"mc.us3.list-manage.com","uuid":"c76a8e2ec2bd989affb9a074f","lid":"4646542adb","uniqueMethods":true}) })</script>
