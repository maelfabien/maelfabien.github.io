---
published: false
title: Time Series Models
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
# I. Moving Average Process

Moving average processes are processes that depend on a deterministic mean, an error term, and the error term of the previous observation. 

## MA(1) Process

$$ y_t = \mu + \epsilon_t + \theta \epsilon_{t-1} = \mu + \theta (L) \epsilon_t $$

Since the lag operator has the following property : $$ \theta(L) = 1 + \theta L $$

Where $$ \epsilon_t $$ is a white noice of mean 0 and variance $$ \sigma^2 $$.

The moments of the process are the following :

$$ E(Y_t) = \mu $$

$$ \gamma_0 = Var(Y_t) = E[(Y_t - \mu)^2] = E[(\epsilon_t + \theta \epsilon_{t-1})^2] $$ 

$$ = \sigma^2 (1+\theta^2) $$

$$ \gamma_1 = E[(Y_t - \mu)(Y_{t-1} - \mu)] = E[(\epsilon_t + \theta \epsilon_{t-1})(\epsilon_t + \theta \epsilon_{t-1})] $$

$$ = \sigma^2 \theta $$

Therefore, we can define the autocorrelation as :

$$ \rho_1 = \frac {\theta_1} {\theta_0} = \frac {\theta} {1 + \theta^2} $$



# II. Autoregressive Process

# III. ARMA(p,q)

# IV. ARIMA(p,d,q)

# V. SARIMA

# VI...

