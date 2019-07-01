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



> **Conclusion** : That's it ! I hope this introduction to Online Learning was clear. Don't hesitate to drop a comment if you have any question.
