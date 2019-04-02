---
published: true
title: Key Concepts of Time Series
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
---

<iframe allowtransparency="true" scrolling="no" frameborder="no" src="https://w.soundcloud.com/icon/?url=http%3A%2F%2Fsoundcloud.com%2Fundefined&color=orange_white&size=32" style="width: 32px; height: 32px;"></iframe>

In this article, we'll introduce the key concepts related to time series.

<script type="text/javascript" async
    src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

{% highlight matlab %}
{% endhighlight %}

We'll be using the same data set as in the previous article :vOpen Power System Data ([OPSD](https://open-power-system-data.org/)) for Germany. The data can be downloaded [here](https://raw.githubusercontent.com/jenfly/opsd/master/opsd_germany_daily.csv)

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

# I. Key concepts

## 1. Auto-correlation

The auto-correlation is defined as the correlation of the series over time, i.e how much the value at time $$ t $$ depends on the value at time $$ t-j $$ for all $$ j $$.

- The auto-correlation of order 1 is : $$ Corr(y_t, y_{t-1}) $$
- The auto-correlation of order j is : $$ Corr(y_t, y_{t-j}) $$
- The auto-covariance of order 1 is : $$ Cov(y_t, y_{t-1}) $$
- The auto-covariance of order j is : $$ Cov(y_t, y_{t-j}) $$

Empirically, the auto-correlation can be estimated by the sample auto-correlation :

$$ r_j = \frac {Cov^e (y_t, y_{t-j})} {Var^e(y_t)} $$ 

Where : $$ Cov^e = \frac {1} {T} \sum_{t-j+1} (y_t - \bar{y_{j+1,T}} )  (y_{t-j} - \bar{y_{1,T-j}}) $$

To plot the auto-correlation and the partial auto-correlation, we can use `statsmodel` package :

```python
fig, axes = plt.subplots(1, 2, figsize=(15,8))

fig = sm.graphics.tsa.plot_acf(df['Consumption'], lags=400, ax=axes[0])
fig = sm.graphics.tsa.plot_pacf(df['Consumption'], lags=400, ax=axes[1])
```

![image](https://maelfabien.github.io/assets/images/ts_18.png)

We observe a clear trend. The value od consumption at time $$ t $$ is negatively correlated with the values 180 days ago, and positively correlated with the values 360 days ago.

The partial autocorrelation function (PACF) gives the partial correlation of a stationary time series with its own lagged values, regressed the values of the time series at all shorter lags. It contrasts with the autocorrelation function, which does not control for other lags.

## 2. Stationarity

**Stationarity** of a time series is a desired property, reached when the joint distribution of $$ y_s, y_{s+1}, y_{s+2}... $$ does not depend on $$ s $$. In other words, the future and the present should be quite similar. Stationary time series do therefore not have underlying trends or seasonal effect.

![image](https://maelfabien.github.io/assets/images/ts_19.png)

How can we test if a time series is stationary ?
- look at the plots (as above)
- look at summary statistics and box plots as in the previous article. A simple trick is to cut the data set in 2, look at mean and variance for each split, and plot the distribution of values for both splits.
- perform statistical tests, using the Augmented Dickey-Fuller test


## 3. Ergodicity

**Ergodicity** is the process by which we forget the initial conditions. This is reached when auto-correlation of order $$ k $$ tends to $$ 0 $$ as $$ k $$ tends to $$ \infty $$.

According to the ergodicity theorem, when a time series is strictly stationary and erdogic, and $$ E(Y_T) < \infty $$ when $$ T → \infty $$, then $$ \frac {1} {n} \sum_i y_t → E(Y_T) $$ 




> **Conclusion** : I hope you found this article useful. Don't hesitate to drop a comment if you have a question.
