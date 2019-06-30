---
published: true
title: Who's the painter ?
collection: explorium
layout: single
author_profile: false
read_time: true
categories: [machinelearning]
excerpt : "Advanced Machine Learning"
header :
    overlay_image: "https://maelfabien.github.io/assets/images/wolf.jpg"
    teaser : "https://maelfabien.github.io/assets/images/wolf.jpg"
comments : true
toc: true
toc_sticky: true
sidebar:
    nav: sidebar-sample
---

<script type="text/javascript" async
    src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

In this article, we'll by using data from the Web Gallery of Art, a virtual museum and searchable database of European fine arts from the 3rd to 19th centuries. The gallery can be accessef from [here](https://www.wga.hu/index1.html).

We will create an algorithm able to predict the name of the painter based on a set of features of the painting, by including gradually more and more features, improving the feature engineering, and eventually including pictures.

Through this article, we'll illustrate :
- The importance of a good feature engineering
- The importance of data enrichment
- And the impact this can have on the accuracy of our prediction.

Ready ? Let's get started !

# The data

To download the data, you can either :
- click [this link](https://www.wga.hu/database/download/data_xls.zip)
- or from the website, go to Database tab, and click on the last link : "You can download the catalogue for studying or searching off-line". Select the Excel format of 5.2 Mb. 

We start off by importing several packages we'll be using later on :

```python
### Manipulating and plotting data ###
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import seaborn as sns

### Process text ###
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import spacy
from sklearn.decomposition import PCA
from sklearn.preprocessing import MinMaxScaler
import re
nlp = spacy.load('en_core_web_md')

### Process images ###
import glob
import cv2
import matplotlib.image as mpimg
import urllib.request

### Modeling libraries performance ###
from sklearn import preprocessing
from sklearn.metrics import accuracy_score
from sklearn.metrics import confusion_matrix
from sklearn.model_selection import cross_val_predict
from sklearn.model_selection import cross_val_score
from sklearn.ensemble import RandomForestClassifier

import warnings
warnings.filterwarnings("ignore")
```

The architecture of our folders should be the following :

```
- Notebook.ipynb
- images
- catalog.xlsx
```

We can import the file `catalog.xlsx` :

```python
catalog = pd.read_excel('catalog.xlsx', header=0)
catalog.head()
```

![image](https://maelfabien.github.io/assets/images/expl_0.png)

We directly notice that we need to process the data, to make it exploitable. The available columns are :
- The author, which we'll by trying to predict
- The date of birth and death of the author. We'll drop this column since it is directly linked to the author
- The title of the painting
- The date of the painting, if available
- The technique used (Oil on copper, oil on canvas, Wood...) as well as the size of the painting
- The current location of the painting
- The URL of the image on the website
- The form (painting, ceramics, sculpture...). We'll only focus on paintings in our case.
- The type of painting (mythological, genre, portrait, landscape...)
- The school, i.e the painting guidelines
- The timeframe in which experts estimate the painting has been realized

# Feature engineering

Since the dataset itself is not made for running a ML algorithm, but meant to be a simple catalog, we need some processing. 

## Date

By exploring the data, we notice some missing values for the date. When the date is approximative, it is denoted by :
- 1590s
- or c.1596

Moreover, the missing values are denoted by an hyphen. For all these reasons, using a regex to extract the date seems to be appropriate.

```python

def date_extract(date) :
    try :
        return re.findall('\d+', date)[0]
    except :
        return None

catalog['DATE'] = catalog['DATE'].astype(str)
catalog['DATE'] = catalog['DATE'].apply(lambda x : date_extract(x))
```

The time frame is quite redundant with the date. Including both would imply adding multi-colinearity in the data. 

```python
catalog = catalog.drop(['TIMEFRAME'], axis=1)
```

## Technique

The "Technique" is an interesting feature. It is a string that takes the following form :

`Oil on copper, 56 x 47 cm`

We can extract several elements from this features :
- the type of painting (oil on copper)
- the height
- the width

We will only focus on paintings, and drop observations that are sculplures or architecture for example.

```python
catalog = catalog[catalog['FORM'] == 'painting']
```

We can apply several functions to extract the width and the height :

```python

def height_extract(tech) :
    try :
        return re.findall('\d+', tech.split(" x ")[0])[0]
    except :
        return None

def height_extract(tech) :
    try :
        return re.findall('\d+', tech.split(" x ")[1])[0]
    except :
        return None
        
def tech_extract(tech) :
    try :
        return tech.split(",")[0]
    except :
        return None
        
catalog['TECH'] = catalog['TECHNIQUE'].apply(lambda x : height_extract(x))
catalog['HEIGHT'] = catalog['TECHNIQUE'].apply(lambda x : height_extract(x))
catalog['WIDTH'] = catalog['TECHNIQUE'].apply(lambda x : height_extract(x))
```

## Width and height

In some cases, the TECHNIQUE feature does not contain the width nor the height. In those cases, we might want to fill the missing values. It's not a great idea to fill it with 0's. To minimize the error, we'll set the missing values to the average of each feature.

```python
catalog['HEIGHT'] = catalog['HEIGHT'].fillna(0).astype(int)
catalog['WIDTH'] = catalog['WIDTH'].fillna(0).astype(int)

mean_height = sum(catalog[catalog['HEIGHT']>0]['HEIGHT'])/len(catalog[catalog['HEIGHT']>0]['HEIGHT'])
mean_width = sum(catalog[catalog['WIDTH']>0]['WIDTH'])/len(catalog[catalog['WIDTH']>0]['WIDTH'])

def treat_height(height) :
    if height == 0 :
        return mean_height
    else : 
        return height

def treat_width(width) :
    if width == 0 :
        return mean_width
    else : 
        return width

catalog['HEIGHT'] = catalog['HEIGHT'].apply(lambda x : treat_height(x))
catalog['WIDTH'] = catalog['WIDTH'].apply(lambda x : treat_width(x))
```

## Missing values and useless columns

We won't exploit the birth and death of the author, since it's an information that depends on the author.

```python
catalog = catalog.drop(['BORN-DIED'], axis=1)
```

At that point, we can confidently drop any row that has missing values, since the processing is almost over.

```
catalog = catalog.dropna()
```

There are many authors in the database, indeed 3584 overall. To check this, simply run a values count on the author's feature.

```python
catalog['AUTHOR'].value_counts()
```

We'll need a good number of training samples of each label for the algorithms we'll apply after. For this reason, we'll drop all authors whom for we have less than 200 observations. This is a major limitation in our simple model, but it will allow a better class balance later on.

```python
counts = catalog['AUTHOR'].value_counts()
catalog = catalog[catalog['AUTHOR'].isin(counts.index[counts > 200])]
catalog['AUTHOR'].value_counts()
```

```python
GIOTTO di Bondone                 564
GOGH, Vincent van                 332
REMBRANDT Harmenszoon van Rijn    315
RUBENS, Peter Paul                303
RAFFAELLO Sanzio                  289
TINTORETTO                        287
MICHELANGELO Buonarroti           278
CRANACH, Lucas the Elder          275
TIZIANO Vecellio                  269
VERONESE, Paolo                   266
TIEPOLO, Giovanni Battista        249
GRECO, El                         245
ANGELICO, Fra                     242
UNKNOWN MASTER, Italian           236
MEMLING, Hans                     209
BRUEGEL, Pieter the Elder         205
```

# A first model

The aim of this exercise is to illustrate the need for  a good feature engineering and additional data. We won't spend too much time on the optimization of the model. We'll be using a random forest classifier.

We need to apply a label encoding to transform the labels into numeric values that can be understood by our model.

```python
df = catalog.copy()
df = df.drop(['TITLE', 'LOCATION', 'TECHNIQUE', 'URL'], axis=1)

le = preprocessing.LabelEncoder()

df['AUTHOR'] = le.fit_transform(df['AUTHOR'])
df['FORM'] = le.fit_transform(df['FORM'])
df['TYPE'] = le.fit_transform(df['TYPE'])
df['SCHOOL'] = le.fit_transform(df['SCHOOL'])
```

```
rf = RandomForestClassifier(n_estimators=500)
y = df['AUTHOR']
X = df.drop(['AUTHOR'], axis=1)

cv = cross_val_score(rf, X, y, cv=5)
print(cv)  
print(np.mean(cv))
```

```
[0.83056478 0.83592018 0.90189521 0.9027933  0.74971942]
0.8441785760310498
```

The mean accuracy during our cross validation reaches 84.6% with our simple random forest model. We can also look at the confusion matrix.

```python
y_pred = cross_val_predict(rf, X, y, cv=5)
conf_mat = confusion_matrix(y, y_pred)

plt.figure(figsize=(12,8))
sns.heatmap(conf_mat)
plt.title("Confusion Matrix")
plt.show()
```

It's quite easy to notice how we tend to make more mistakes for the latest authors. These painters are also those whom fo we have the least observations. 

# More feature engineering

## Technique

Alright, we are now ready to move on and add other variables by doing a better feature engineering. By looking at the TECHNIQUE variable, you can notice that we don't use the type of painting information so far. Indeed, we only extracted  the width and the height from this field.

The technique is systematically specified before the first comma. We'll split the string on the first comma if there is one, and return the first part of the string.


```python
def process_tech(tech) :
    tech = tech.split(" ")[0]
    try : 
        return tech.split(",")[0]
    except :
        return tech

catalog['TECHNIQUE'] = catalog['TECHNIQUE'].apply(lambda x: process_tech(x))
````

## Location

We have not yet exploited the location field. The location describes where the painting is being kept. We'll simply extract the name of the city from this field. Indeed, extracting the name of the museum would lead to an overfitting as the collections of each museum are limited, and we only have at that point around 4'500 training samples.

```python
def process_loc(loc) :
    return loc.split(",")[-1]
    
catalog['LOCATION'] = catalog['LOCATION'].apply(lambda x: process_loc(x))
```

## Second model

After adding these two variables, we can test again the outcome on a cross validation.

```python
df = catalog.copy()
df = df.drop(['TITLE', 'URL'], axis=1)

le = preprocessing.LabelEncoder()

df['AUTHOR'] = le.fit_transform(df['AUTHOR'])
df['TECHNIQUE'] = le.fit_transform(df['TECHNIQUE'])
df['FORM'] = le.fit_transform(df['FORM'])
df['TYPE'] = le.fit_transform(df['TYPE'])
df['SCHOOL'] = le.fit_transform(df['SCHOOL'])
df['LOCATION'] = le.fit_transform(df['LOCATION'])

y = df['AUTHOR']
X = df.drop(['AUTHOR'], axis=1)
```

Then, run the cross validation :


```python
cv = cross_val_score(rf, X, y, cv=5)
print(cv)  
print(np.mean(cv))
```

And print the confusion matrix :

```
y_pred = cross_val_predict(rf, X, y, cv=5)
conf_mat = confusion_matrix(y, y_pred)

plt.figure(figsize=(12,8))
sns.heatmap(conf_mat)
plt.title("Confusion Matrix")
plt.show()
```

We have gained a significant accuracy by improving the feature engineering !

## Process the title
