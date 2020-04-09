---
published: true
title: Earthquake Analysis on GCP
collection: bgd
layout: single
author_profile: true
read_time: true
categories: [project]
header :
    teaser: "https://maelfabien.github.io/assets/images/project_4.png"
comments : true
toc: true
toc_sticky: true
sidebar:
    nav: sidebar-sample
---

In this project, our aim will be to create a VM instance to process real earthquake data and make the analysis publicly available.

# Creating a VM on Compute Engine

First, go to : [https://cloud.google.com](https://cloud.google.com). Open the console, go to the side menu, and click on: Compute Engine > VM Instances.

![image](https://maelfabien.github.io/assets/images/gcp_6.jpg)

The initialization of Compute Engine might take several minutes. Alright, Compute Engine is now up and running. Click on "Create" to create new VM instances :

![image](https://maelfabien.github.io/assets/images/gcp_7.jpg)

We will analyze Earth Quake data for what comes next, so we name the VM accordingly. Set your region (whatever your requirements are). We will stick with the standard machine (1 CPU, 3.75GB memory), but of course, all settings can be modified. 

![image](https://maelfabien.github.io/assets/images/gcp_8.jpg)

To be able to write to cloud storage from the VM we will need to allow full access to all Cloud APIs. We will access the VM through SSH, and not HTTP or HTTPS.

![image](https://maelfabien.github.io/assets/images/gcp_9.jpg)

Click on "Create", wait a few minutes, and the VM should be up and running :)

![image](https://maelfabien.github.io/assets/images/gcp_10.jpg)

If you click on "SSH", a terminal page will launch. Notice that there is absolutely no program installed.

![image](https://maelfabien.github.io/assets/images/gcp_11.jpg)

To install `git` for example, run the following command :

```bash
sudo apt-get install git
```

This will allow us to access our code repository through the VM. Google prepared a GitHub repository with the necessary data for the Earthquake demo. To clone the repo, simply run :

```bash
git clone https://www.github.com/GoogleCloudPlatform/training-data-analyst
```

Once the data has been loaded, simply go in the folder :

```bash
cd training-data-analyst/
cd courses
cd bdml_fundamentals/
cd demos
cd earthquakevm/
```

Notice that there is a file called  `ingest.sh`. To view its content, run : 

```bash
less ingest.sh
```

It removes existing files and makes a `wget` on the file to download. To quit the editor, type `:wq`. The earthquake data comes from USGS. There is also a Python file called `transform.py` that parses and transforms the input data. At that point, there are however many missing libraries in our VM. In this demo, Google packaged all necessary libraries in the `install_missing.sh` script. 

It contains the following lines (you can check it with `cat install_missing.sh`) :

```bash
sudo apt-get update
sudo apt-get -y -qq --fix-missing install python3-mpltoolkits.basemap python3-numpy python3-matplotlib python3-requests
```

We can run the command to install missing libraries : 

```bash
./install_missing.sh
```

Now, download the data by running : 

```bash
./ingest.sh 
```

There is now a file `earthquakes.csv` ! You can check its content by running :

```bash
head earthquakes.csv
```

This displays the following lines :

```
time,latitude,longitude,depth,mag,magType,nst,gap,dmin,rms,net,id,updated,place,type,horizontalError,depthError,mag,Error,magNst,status,locationSource,magSource
2019-07-30T19:49:53.860Z,35.8401667,-117.6665,4.07,1.37,ml,24,80,0.06113,0.19,ci,ci38673143,2019-07-30T19:53:42.289,Z,"24km ESE of Little Lake, CA",earthquake,0.26,0.61,0.134,19,automatic,ci,ci
2019-07-30T19:49:03.730Z,35.9245,-117.7173333,5.78,1.97,ml,29,40,0.05914,0.13,ci,ci38673135,2019-07-30T19:52:54.321, Z,"17km E of Little Lake, CA",earthquake,0.17,0.51,0.238,25,automatic,ci,ci
...
```

The file `transform.py` transforms the data into a PNG file. Execute the content of the file :


```bash
./transform.py
```

It created a file called `earthquakes.png`:

![image](https://maelfabien.github.io/assets/images/gcp_12.jpg)

How can we get this file and read it on our Cloud Storage bucket? Go back to GCP, and click on Storage in the lateral menu. 

![image](https://maelfabien.github.io/assets/images/gcp_13.jpg)

We will create a bucket.

![image](https://maelfabien.github.io/assets/images/gcp_14.jpg)

The name of the bucket has to be globally unique. Set the name, choose the storage location (EU in my case), and leave the default value for the object access control: "Set object-level and bucket-level permissions". Finally, click on "Create", and the bucket is ready! Back to the terminal window, you can check the content of the bucket with the following command:

```bash
gsutil ls gs://earthquake_mael
```

(Where earthquake_mael is the name I gave to my bucket)

![image](https://maelfabien.github.io/assets/images/gcp_15.jpg)

To copy the content of the VM instance to the Bucket, use the copy function in gsutils :

```bash
gsutil cp earthquakes.* gs://earthquake_mael
```

The bucket now contains the files we copied!

![image](https://maelfabien.github.io/assets/images/gcp_16.jpg)

You can click on the `earthquakes.png` file, and this is what it looks like :

![image](https://maelfabien.github.io/assets/images/earthquakes.jpg)

At that point, we don't need the VM instance anymore. To stop paying, simply pause the VM from Compute Engine (or delete it if you don't need it ever again) :

![image](https://maelfabien.github.io/assets/images/gcp_17.jpg)

Suppose that now, we want to make our image public, as a static web app. How can we do that? Go back to the storage part, select all file you want to make available, and click on "Permissions" :

![image](https://maelfabien.github.io/assets/images/gcp_18.jpg)

We then need to create a user and give it rights to view the content stored. Call the user `allUsers`.

![image](https://maelfabien.github.io/assets/images/gcp_19.jpg)

Since the objects are now public, you can click on the public link provided (mine is [here](https://storage.googleapis.com/earthquake_mael/earthquakes.htm)) :

![image](https://maelfabien.github.io/assets/images/gcp_20.jpg)

Anyone with the public link can access the following HTML page that represents earthquakes this week :

![image](https://maelfabien.github.io/assets/images/gcp_21.jpg)
