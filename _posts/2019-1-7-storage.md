---
published: true
title: Working with Amazon S3 buckets
collection: bgd
layout: single
author_profile: true
read_time: true
categories: [bigdata]
excerpt : "Amazon Web Services"
header :
    overlay_image: "https://maelfabien.github.io/assets/images/wolf.jpg"
    teaser: "https://maelfabien.github.io/assets/images/wolf.jpg"
comments : true
toc: true
toc_sticky: true
sidebar:
    nav: sidebar-sample
---

![image](https://maelfabien.github.io/assets/images/s3_head.jpg)

Amazon Simple Storage Service (Amazon S3) is an object storage service that offers industry-leading scalability, data availability, security, and performance

{% highlight python %}
{% endhighlight %}

## Create a Bucket

S3 buckets can be created from the console, or directly by following this link :  <span style="color:blue">[https://s3.console.aws.amazon.com/s3/home?region=us-east-1#](https://s3.console.aws.amazon.com/s3/home?region=us-east-1#)</span> ).

Click on Create bucket :
![image](https://maelfabien.github.io/assets/images/s3.jpg){:height="80%" width="80%"}

You must give your bucket a unique name :
![image](https://maelfabien.github.io/assets/images/s3_2.jpg){:height="80%" width="80%"}

You can keep the other default parameters, and confirm the creation of the bucket.

## Download AWS CLI

For some operations like checking the volume of an S3 bucket, using AWS CLI is useful. In your terminal, run the following command :
``` bash
$ pip install awscli --upgrade
```

Then, type :
```
$ aws configure
```

Answer the different questions. Make sure to have the ``` credentials.csv ```  file you downloaded when you created a user group. If you don't have one, I invite you to check my article on how to run a Zeppelin notebook on EMR.

``` bash
AWS Access Key ID [None]: XXX
AWS Secret Access Key [None]: XXX
Default region name [None]: us-east-1
Default output format [None]: text
````

## Check content of an S3 bucket

Finally, you can check the content of your S3 bucket pretty easily :

```bash
$ aws s3 ls --summarize --human-readable --recursive s3://mael-fabien-test-bucket/
````

Which should return for your newly created bucket :
``` bash 
Total Objects: 0
Total Size: 0 Bytes
```