---
published: true
title: How to install (py)Spark on MacOS (late 2020)
collection: bgd
layout: single
author_profile: true
read_time: true
categories: [bigdata]
excerpt : "Apache Spark"
header :
    overlay_image: "https://maelfabien.github.io/assets/images/wolf.jpg"
    teaser: "https://maelfabien.github.io/assets/images/wolf.jpg"
comments : true
toc: true
toc_sticky: true
sidebar:
    nav: sidebar-sample
---

I have encountered lots of tutorials from 2019 on how to install Spark on MacOS, like [this one](https://medium.com/swlh/pyspark-on-macos-installation-and-use-31f84ca61400). However, due to a recent update on the availability of Java through Homebrew, these commands do not work anymore.

# Step 1 (Optional): Install Homebrew

If you don't have Homebrew, here's the command:

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

# Step 2: Install Java 8

Spark requires Java8, and this is where I had to browse Github to find this alternative command:

```bash
brew cask install homebrew/cask-versions/adoptopenjdk8
```

# Step 3: Install Scala

You probably know it, but Apache-Spark is written in Scala, which is a requirement to run it.

```bash
brew install scala
```

# Step 4: Install Spark

We're almost there. Let's now install Spark:

```bash
brew install apache-spark
```

# Step 5: Install pySpark

You might want to write your Spark code in Python, and pySpark will be useful for that:

```bash
pip install pyspark
```

# Step 6: Modify your bashrc

Whether you have bashrc or zshrc, modify your profile with the following commands. Adapt the commands to match your Python path (using `which python3`) and the folder in which Java has been installed:


```bash
export JAVA_HOME=/Library/Java/JavaVirtualMachines/adoptopenjdk-8.jdk/Contents/Home
export JRE_HOME=/Library/java/JavaVirtualMachines/adoptopenjdk-8.jdk/Contents/Home/jre/
export SPARK_HOME=/usr/local/Cellar/apache-spark/3.0.1/libexec
export PATH=/usr/local/Cellar/apache-spark/3.0.1/bin:$PATH
export PYSPARK_PYTHON=/Users/maelfabien/opt/anaconda3/bin/python
```

Finally, source the profile using:

```bash
source .zshrc
```

And you are all set!

# Step 7: Launch a Jupyter Notebook

Now, in your Jupyter notebook, you should be able to execute the following commands:

```python
import pyspark
from pyspark import SparkContext
sc = SparkContext()
n = sc.parallelize([4,10,9,7])
n.take(3)
```

And observe the SparkUI on the following link: [http://localhost:4040/](http://localhost:4040/).



