---
published: true
title: Hadoop with the HortonWorks Sandbox (1/3)
collection: bgd
layout: single
author_profile: false
read_time: true
categories: [bigdata]
excerpt : "Parallel and Distributed Computing"
header :
    overlay_image: "https://maelfabien.github.io/assets/images/wolf.jpg"
    teaser: "https://maelfabien.github.io/assets/images/wolf.jpg"
comments : true
toc: true
toc_sticky: true
sidebar:
    nav: sidebar-sample
---

## Getting started with the VM

### Install and launch

![image](https://maelfabien.github.io/assets/images/Hadoop/hort.png)

The Sandbox by Hortonworks is a straightforward, pre-configured, learning environment that contains the latest developments from Apache Hadoop, specifically the Hortonworks Data Platform (HDP). The Sandbox comes packaged in a virtual environment that can run in the cloud or on your personal machine. Sandbox also offers a data-in-motion framework for IoT solutions called Hortonworks Data Flow (HDF). To configure Hadoop from scratch on a Linux VM, this tutorial might be useful : https://www.tutorialspoint.com/hadoop/hadoop_enviornment_setup.htm


Hortonworks offers a way to use Hadoop Tools connecting to a Virtual Machine in SSH for command lines interfaces. Numerous web interfaces are also available. 

The sandbox can be downloaded from [here](https://www.cloudera.com/downloads/hortonworks-sandbox.html).

Download the **HDP** Sandbox. This Sandbox makes it easy to get started with Apache Hadoop, Apache Spark, Apache Hive, Apache HBase, Druid and Data Analytics Studio (DAS). Choose the VirtualBox installation type.

![image](https://maelfabien.github.io/assets/images/Hadoop/26.png)

Fill in the form and download the **version 2.6.5** of the Sandbox. The sandbox requires around 15 Go of space.

Once this is done (the download might take a really long time) :
- Open VirtualBox
- Click on "New"
- Go in "File -> Import a Virtual Machine".
- Select the image of the Sandbox you just downloaded.
- Start the VM

![image](https://maelfabien.github.io/assets/images/Hadoop/33.png)

The first boot takes a while, so time for a break !

![image](https://maelfabien.github.io/assets/images/Hadoop/28.png)

### Access the Sandbox

The application is now ready to be used :

![image](https://maelfabien.github.io/assets/images/Hadoop/29.png)

**User** 

Once started, the Sandbox is accessible from your local computer, in SSH, on the Port 2222. We will be using username : `raj_ops` and password `raj_ops` as it is pre-registered. 

There are many pre-configured users for the HortonWorks Sandbox, including :

![image](https://maelfabien.github.io/assets/images/Hadoop/27.png)

**SSH**

Launch your terminal and access the Sandbox using SSH :

`ssh raj_ops@localhost -p 2222`

If you are asked whether you'd like to permanently add 2222 to the list of known hosts, say Yes.

**Splash Page**

We should be able to access a graphical view of the services available on a Hadoop cluster. It's called the VirtualBox Splash Page, and it can be accessed on :

`http://localhost:8080`

You will be asked to log-in :

![image](https://maelfabien.github.io/assets/images/Hadoop/34.png)

Then, after loading, the page should look like this :

![image](https://maelfabien.github.io/assets/images/Hadoop/35.png)




> Conclusion : I hope this tutorial was clear and helful. I'd be happy to answer any question you might have in the comments section.
