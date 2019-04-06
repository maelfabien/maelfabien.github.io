---
published: false
title: Types of Time Series
collection: st
layout: single
author_profile: false
read_time: true
categories: [statistics]
excerpt : "Time Series"
header :
    overlay_image: "https://maelfabien.github.io/assets/images/wolf.jpg"
    teaser : "https://maelfabien.github.io/assets/images/wolf.jpg"
comments : true
toc: true
toc_sticky: true
sidebar:
    nav: sidebar-sample
---

In this article, we'll introduce the main types of time series. 

<script type="text/javascript" async
    src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

{% highlight matlab %}
{% endhighlight %}

We'll be using the same data set as in the previous article : Open Power System Data ([OPSD](https://open-power-system-data.org/)) for Germany. The data can be downloaded [here](https://raw.githubusercontent.com/jenfly/opsd/master/opsd_germany_daily.csv)

Start off by importing the following packages :

```python
### General import
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn import preprocessing
import statsmodels.api as sm

### Time Series
from statsmodels.tsa.ar_model import AR
from sklearn.metrics import mean_squared_error
from pandas.tools.plotting import autocorrelation_plot
from statsmodels.tsa.arima_model import ARIMA
from statsmodels.tsa.seasonal import seasonal_decompose
from statsmodels.tsa.stattools import adfuller
#from statsmodels.tsa.sarimax_model import SARIMAX

### LSTM Time Series
from keras.models import Sequential  
from keras.layers import Dense  
from keras.layers import LSTM  
from keras.layers import Dropout 
from sklearn.preprocessing import MinMaxScaler  
```

Then, load the data :
```python
df = pd.read_csv('opsd_germany_daily.csv', index_col=0)
df.head(10)
```

![image](https://maelfabien.github.io/assets/images/ts_2.png)

Then, make sure to transform the dates into `datetime` format in pandas :

```python
df.index = pd.to_datetime(df.index)
```

# I. Moving Average Process

Moving average processes are processes that depend on a deterministic mean, an error term, and the error term of the previous observation. 

## MA(1) Process

$$ y_t = \mu + \epsilon_t + \theta \epsilon_{t-1} = \mu + \theta (L) \epsilon_t $$

Since the lag operator has the following property : $$ \theta(L) = 1 + \theta L $$

Where $$ \epsilon_t $$
# II. Autoregressive Process

# III. ARMA(p,q)

# IV. ARIMA(p,d,q)

# V. SARIMA

# VI...


> **Conclusion** : I hope you found this article useful. Don't hesitate to drop a comment if you have a question.
