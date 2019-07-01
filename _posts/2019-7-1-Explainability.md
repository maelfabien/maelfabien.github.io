---
published: true
title: Machine Learning Explainability
collection: ml
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

In this series, I will summarize the course "Machine Learning Explaibnability" from Kaggle Learn. The full course is available [here](https://www.kaggle.com/learn/machine-learning-explainability).

# Use cases for model insights

In this course, we will answer the following questions on model insights extraction :
- What features in the data did the model think are most important?
- For any single prediction from a model, how did each feature in the data affect that particular prediction?
- How does each feature affect the model's predictions in a big-picture sense (what is its typical effect when considered over a large number of possible predictions)?

These insights are valuable since they have many use cases.

## Debugging

Understanding the patterns a model is finding helps us identify when these patterns are odds. This is the first step to track bugs, unreliable and dirty data. 

## Informing feature engineering

Feature engineering is a great way to improve model accuracy. It implies a transformation of the existing features. But what happens when we have up to 100 features, when we don't have the right background to create smart features or when for privacy reasons the column names are not available?

By identifying the most important features, it is then much easier to simply create an addition, a subtraction or a multiplication between 2 features for example.

## Directing future data collection

Many businesses can expand the types of data they collect. Model-based insights show you what are the most important features to collect, and helps you reason about what new values may be most useful.

## Informing human decision-making

For many human decisions that cannot (yet?) be made automatically by an algorithm, insights on the model prediction can bring explanability to support a decision.

## Building trust

Many people won't assume they can trust your model for important decisions without verifying some basic facts. Showing the right insights, even to people with few data science knowledge, is important.

# Permutation importance

What features have the biggest impact on predictions? There are many ways to compute feature importance. We will focus on permutation importance, which is :
- fast to compute
- widely used
- consistent with the properties needed

## How does it work?

Permutation importance is computed after a model has been fitted. It answers the following question :
If with randomly shuffle a single column of the validation data, leaving the target and all other columns in place, how would that affect the accuracy?

For example, say we want to predict the height of a person at age 20 based on a set of features, including some less relevant ones (the number of socks owned at age 10):

![image](https://maelfabien.github.io/assets/images/perm.jpg)

Randomly re-ordering a single column should decrease the accuracy. Depending on how relevant the feature is, it will more or less impact the accuracy. From the impact on the accuracy, we can determine the importance of a feature.

## Example

In this example, we will try to predict the "Man of the Game" of a football match based on a set of features of a player in a match.

```python
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

data = pd.read_csv('../input/fifa-2018-match-statistics/FIFA 2018 Statistics.csv')

y = (data['Man of the Match'] == "Yes")  # Convert from string "Yes"/"No" to binary
feature_names = [i for i in data.columns if data[i].dtype in [np.int64]]
X = data[feature_names]

X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=1)
my_model = RandomForestClassifier(random_state=0).fit(X_train, y_train)
```

We can then compute the Permutation Importance with [Eli5 library](https://eli5.readthedocs.io/en/latest/). Eli5 is a Python library which allows to visualize and debug various Machine Learning models using unified API. It has built-in support for several ML frameworks and provides a way to explain black-box models.

```python
import eli5
from eli5.sklearn import PermutationImportance

perm = PermutationImportance(my_model, random_state=1).fit(X_test, y_test)
eli5.show_weights(perm, feature_names = val_X.columns.tolist())
```

![image](https://maelfabien.github.io/assets/images/perm2.jpg)

In our example, the most important feature was Goals scored. The first number in each row shows how much model performance decreased with a random shuffling (in this case, using "accuracy" as the performance metric). We measure the randomness by repeating the process with multiple shuffles.

Negative value for importance occurs when the feature is not important at all.

# Partial dependence plots

While feature importance shows what variables most affect predictions, partial dependence plots show how a feature affects predictions.

Partial dependence plots can be interpreted similarly to coefficients in linear or logistic regression models, but can capture more complex patterns than simple coefficients.

We can use partial dependence plots to answer questions like :
- Controlling for all other house features, what impact do longitude and latitude have on home prices? To restate this, how would similarly sized houses be priced in different areas?
- Are predicted health differences between two groups due to differences in their diets, or due to some other factor?

## How does it work?

Partial dependence plots are calculated after a model has been fit. How do we then disentangle the effects of several features?

We start by selecting a single row. We will use the fitted model to predict our outcome of that row. But we repeatedly **alter the value** for **one variable** to make a series of predictions.

For example, in the football example used above, we could predict the outcome if the team had the ball 40% of the time, but also 45, 50, 55, 60, ...

We build the plot by:
- representing on the horizontal axis the value change in the ball possession for example
- and on the horizontal axis the change of the outcome

We don't use only a single row, but many rows to do that. Therefore, we can represent a confidence interval and an average value, just like on this graph:

![image](https://maelfabien.github.io/assets/images/perm3.jpg)

The blue shaded area indicates the level of condifence.

## Example

Back to our FIFA Man of the Game example :

```python
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier

data = pd.read_csv('../input/fifa-2018-match-statistics/FIFA 2018 Statistics.csv')

y = (data['Man of the Match'] == "Yes")  # Convert from string "Yes"/"No" to binary
feature_names = [i for i in data.columns if data[i].dtype in [np.int64]]
X = data[feature_names]

X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=1)
tree_model = DecisionTreeClassifier(random_state=0, max_depth=5, min_samples_split=5).fit(X_train, y_train)
```

Then, we can plot the Partial Dependence Plot using [PDPbox](https://pdpbox.readthedocs.io/en/latest/). The goal of this library is to visualize the impact of certain features towards model prediction for any supervised learning algorithm using partial dependence plots. The PDP fot the number of goals scored is the following :

```python
from matplotlib import pyplot as plt
from pdpbox import pdp, get_dataset, info_plots

# Create the data that we will plot
pdp_goals = pdp.pdp_isolate(model=tree_model, dataset=X_test, model_features=feature_names, feature='Goal Scored')

# plot it
pdp.pdp_plot(pdp_goals, 'Goal Scored')
plt.show()
```

![image](https://maelfabien.github.io/assets/images/perm4.jpg)

From this particular graph, we see that scoring a goal substantially increases your chances of winning "Man of The Match." But extra goals beyond that appear to have little impact on predictions.

We can pick a more complex model and another feature to illustrate the changes :

```python
# Build Random Forest model
rf_model = RandomForestClassifier(random_state=0).fit(X_train, y_train)

pdp_dist = pdp.pdp_isolate(model=rf_model, dataset=X_test, model_features=feature_names, feature=feature_to_plot)

pdp.pdp_plot(pdp_dist, feature_to_plot)
plt.show()
```

![image](https://maelfabien.github.io/assets/images/perm5.jpg)

## 2D Partial Dependence Plots

We can also plot interactions between features on a 2D graph.

```python
# Similar to previous PDP plot except we use pdp_interact instead of pdp_isolate and pdp_interact_plot instead of pdp_isolate_plot

features_to_plot = ['Goal Scored', 'Distance Covered (Kms)']

inter1  =  pdp.pdp_interact(model=tree_model, dataset=X_test, model_features=feature_names, features=features_to_plot)

pdp.pdp_interact_plot(pdp_interact_out=inter1, feature_names=features_to_plot, plot_type='contour')
plt.show()
```

![image](https://maelfabien.github.io/assets/images/perm6.jpg)

In this example, each feature can only take a limited number of values. What happens if we have continuous variables ? The level frontiers bring value on the interaction between the 2 variables.

![image](https://maelfabien.github.io/assets/images/perm7.jpg)

# SHAP Values




> **Conclusion** : That's it ! Don't hesitate to drop a comment if you have any question.
