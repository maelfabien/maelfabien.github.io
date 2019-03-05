---
published: true
title: Using Google Drive to store your data on Colab
collection: bgd
layout: single
author_profile: false
read_time: true
categories: [bigdata]
excerpt : "Google Cloud Platform"
header :
    overlay_image: "https://maelfabien.github.io/assets/images/wolf.jpg"
    teaser_image: "https://maelfabien.github.io/assets/images/wolf.jpg"
comments : true
toc: true
toc_sticky: true
---

![image](https://maelfabien.github.io/assets/images/gc.png)

In this quick tutorial, we'll see how to use Google Drive as a file storage system when working in Google Colab.

## Mount Google Drive

The first step is to mount Google Drive on your Colab session :

```python
from google.colab import drive
drive.mount('/content/drive')
```

![image](https://maelfabien.github.io/assets/images/gd_init.png)

Once you run the cell, a link is provided, similar to :
```Go to this URL in a browser: https://accounts.google.com/o/oauth2/auth?client_id=XXX```

![image](https://maelfabien.github.io/assets/images/gd_connect.png)

Open the URL. You should now see a page asking for an access to the content of your Drive. Allow access.

![image](https://maelfabien.github.io/assets/images/gd_allow.png)

Now, simply copy the code given.

![image](https://maelfabien.github.io/assets/images/gd_copy.png)

Paste it in your notebook :

![image](https://maelfabien.github.io/assets/images/gd_valid.png)

## Check the content of your drive

Your personal drive is accessible through the folder  `drive/My Drive`. To check the content of this folder, run the following cell in your notebook :

```
!ls "drive/My Drive"
```

## Load a file from your drive

Your drive can now be used as a local folder ! For example :

```
X_train = np.load('drive/My Drive/X_train.npy')
```

Similarly, you can save your files as you would do locally.

> **Conclusion** : I hope this quick tip on Google Drive on Colab was helpful. I you have any question, don't hesitate to drop a comment !
