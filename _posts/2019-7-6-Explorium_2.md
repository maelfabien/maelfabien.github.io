---
published: true
title: Interpretability and Explainability
collection: explorium
layout: single
author_profile: false
read_time: true
categories: [machinelearning]
excerpt : "Better ML"
header :
    overlay_image: "https://maelfabien.github.io/assets/images/wolf.jpg"
    teaser : "https://maelfabien.github.io/assets/images/wolf.jpg"
comments : true
toc: true
toc_sticky: true
search: false
sidebar:
    nav: sidebar-sample
---

<script type="text/javascript" async
src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

In the previous blog post ["Complexity vs. Explainability"](https://www.explorium.ai/complexity-vs-explainability/), we highlighted the tradeoff between increasing the model's complexity and loosing explainability. In this article, we will continue our discussion and see how to make models interpretable and explainable.

Machine Learning interpretability and explainability are becoming essential in solutions we build nowadays. In fields such as health care or banking, there exists legal restrictions that interpretability and explainability could help overcome. In solutions that support a human decision, it is essential to build a trust relationship and explain the outcome of an algorithm. The whole idea behind interpretable and explainable ML is to avoid the black box effect.

Christop Molnar has recently publshed an excellent book on this topic : [Interpretable Machine Learning](https://christophm.github.io/interpretable-ml-book/).

Fist of all, let's define the difference between machine learning explainability and interpretability :
- Interpretability is linked to the model. A model is said to be interpretable if its parameters are linked in a clear way to the impact of a feature on the outcome. In some sense, it is the extent to which we are able to predict what is going to happen, given a change in input. Among interpretable models, one can for example mention :
    - Linear regression
    - Logistic regression
    - Decision trees
    - ...
- Explainability can be applied to any model, even models that are not interpretable. Explainability is the extent to which we can interpret the outcome and the internal mechanics of an algorithm. 

In this article, we will be using the [UCI Machine learning repository Breast Cancer](https://archive.ics.uci.edu/ml/datasets/Breast+Cancer+Wisconsin+%28Diagnostic%29) data set. It is also available on [Kaggle](https://www.kaggle.com/uciml/breast-cancer-wisconsin-data/downloads/breast-cancer-wisconsin-data.zip/2). The data has 30 features, including the radius of the tumor, the texture, the perimiter... Our task will be to perform a binary classification of the tumor, that is either malignant (M) or benign (B). Features are computed from a digitized image of a fine needle aspirate (FNA) of a breast mass. They describe characteristics of the cell nuclei present in the image.

Start off by importing the packages :

```python
# Handle data and plot
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Interpretable models
from sklearn.model_selection import train_test_split
import sklearn.linear_model as lm

# Explainability of models

```

Then, read the data and apply a simply numeric transformation of the label ("M" or "B").

```python
df = pd.read_csv('data.csv').drop(['id', 'Unnamed: 32'], axis=1)

def to_category(diag):
    if diag == "M" :
        return 1
    else :
        return 0

df['diagnosis'] = df['diagnosis'].apply(lambda x : to_category(x))
df.head()
```

![image](https://maelfabien.github.io/assets/images/df_head.png)

```python
X = df.drop(['diagnosis'], axis=1)
y = df['diagnosis']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
```

It is a great exercise to work on interpretability and explainability of models in the healthcare sector, since performing such work would typically be required by authorities.

In the next sections, we will cover the main interpretable models, their advantages, their limitations and examples. We will then explore explainability methods, as well as examples for each method.

# I. Interpretable models

## 1. Linear Regression

Linear regression is one of the most basic models and takes the following form.

$$ Y_i = {\beta}_0 + {\beta}_1{X}_{1i} + {\beta}_2{X}_{2i} + {\beta}_3{X}_{3i} + ... + {\epsilon}_i $$. 

This simple equation states the following :
- suppose we have $$ n $$ observations of a dataset and we pick on $$ i^{th} $$
- $$ Y_i $$ is the target, e.g. the diagnosis of the breast tissue
- $$ {X}_{1i} $$ is the $$ i^{th} $$ observation of the first feature, e.g. the radius of the tumor
- $$ {X}_{2i} $$ is the $$ i^{th} $$ observation of the second feature, e.g. the texture of the tumor
- ...
- $$ {\beta}_0 $$ is called the intercept, it is a constant term
- $$ {\beta}_1 $$ is the coefficient associated with $$ X_{1i} $$ . It describes the weight of $$ {X}_{1i} $$ on the final output.
- ...
- $$ {\epsilon} $$ is the noise of the model. The data we observe reraly stand on a straight line or on a hyperplane.

We can fit the linear regression using the `statsmodel` package :

```python
model = sm.OLS(y_train, X_train).fit()
model.summary()
```

![image](https://maelfabien.github.io/assets/images/stats.png)

We have access to the coefficient, the standard error, the t-statistics and the p-value of every feature.

### Interpretability of Linear Regression

- The coefficients of a linear regression are directly interpretable. At stated above, each coefficient describes the effect on the output of a change of 1 unit of a given input. 
- The importance of a feature can be seen as the absolute value of the t-statistic value. The more variance the estimated weight has, the less important the feature is. The higher the estimated coefficient, the more important the feature is.
- In a binary classification task, each coefficient can be seen as a percentage of contribution to a class or another.

$$ t_{\hat{\beta_j}} = \frac{\hat{\beta_j}}{SE(\hat{\beta_j})} $$
- The variance explained by the model can be explained by the $$ R^2 $$ coefficient :

```python
y_pred = model.predict(X_test)
r2_score(y_test, y_pred) 
```
`0.6857028648161004`

- We can use confidence intervals and tests for coefficient values : 

```python
model.conf_int()
```

|  | 0 | 1 |
| radius_mean | -0.854929  | -0.071102 |
| texture_mean | -0.007799 | 0.027502 |
| perimeter_mean | -0.028758 | 0.083970 |
| ...  |  ...  | ... |

- We are guaranteed to find the best coefficients by OLS properties

To illustrate the interpretability of the Linear Regression, we can plot the following graph. This work was inspired by the excellent work of [Zhiya Zuo](https://zhiyzuo.github.io/Python-Plot-Regression-Coefficient/). Start by computing an error term equal to the difference between the parameter and the lower confidence interval bound, and build a single table with the coefficient, the error term and the name of the variable.

```python
err = model.params - model.conf_int()[0]
coef_df = pd.DataFrame({'coef': model.params.values[1:], #drop the intercept
    'err': err.values[1:], 
    'varname': err.index.values[1:]
})
```

Then, plot the graph :

```python
coef_df.plot(y='coef', x='varname', kind='bar', color='none', yerr='err', legend=False, figsize=(12,8))
plt.scatter(x=np.arange(coef_df.shape[0]), s=100, y=coef_df['coef'], color='blue')
plt.axhline(y=0, linestyle='--', color='black', linewidth=1)
plt.title("Coefficient and Standard error")
plt.show()
```

![image](https://maelfabien.github.io/assets/images/coef_lin.png)

This graph displays for each feature, the coefficient value as well as the standard error around this coefficient.

### Limitations of Linear Regression

- Linear regression is a basic model. It is rare to observe linear relationships in the data, and the linear regression is rarely performing well.
- Moreover, when it comes to classification tasks, the linear regression is risky to apply, since an hyperplane is not a good way to send the output between 0 and 1. We usually prefer to apply the Logistic Regression.

![image](https://maelfabien.github.io/assets/images/log_1.png)

We can also illustrate this limitation by plotting the predictions sorted by value :

```python
plt.figure(figsize=(12,8))
plt.plot(np.sort(y_pred))
plt.axhline(0.5, c='r')
plt.title("Predictions")
plt.show()
```

![image](https://maelfabien.github.io/assets/images/pred.png)

Setting the threshold to 0.5 seems indeed to be an arbitrary choice, since the output is not mapped between 0 and 1 systematically.

We can show that modifying the threshold that we consider for classifying in one class or another has a large effect on the accuracy :

```python
def classify(pred, thr = 0.5) :
    if pred < thr :
        return 0
    else :
        return 1

accuracy = []
for thr in np.linspace(0,1,100): 
    y_pred_class = y_pred.apply(lambda x: classify(x, thr)) 
    accuracy.append(accuracy_score(y_pred_class, y_test))

plt.figure(figsize=(12,8))
plt.plot(accuracy)
plt.title("Acccuracy depending on threshold")
plt.show()
```

![image](https://maelfabien.github.io/assets/images/pred_2.png)

The maximum accuracy is reached for a threshold of 40.4% : 

`np.linspace(0,1,100)[np.argmax(accuracy)]`

For this threshold, the accuracy achieved is 0.9385. Although the linear regression remains interesting for interpretability purposes, it is not optimal to tune the threshold on the predictions. We tend to use logistic regression instead.

## 2. Logistic Regression

The logistic regression using the logistic function to send the output between 0 and 1 for binary classification purposes. The function is defined as :

$$ Sig(z) = \frac {1} {1 + e^{-z}} $$

![image](https://maelfabien.github.io/assets/images//log_2.png)

In the logistic regression model, instead of a linear relation between the input and the output, the relation is the following :

$$ P(Y=1) = \frac {1} {1 + exp^{-(\beta_0 + \beta_1 X_1 + ... + \beta_p X_p)}} $$

How can we interpret the partial effect of $$ X_1 $$ on $$ Y $$ for example ? Well, the weights in the logistic regression **cannot** be interpreted as for linear regression. We need to use the logit transform :

$$ \log( \frac {P(y=1)} {1-P(y=1)} ) = \log ( \frac {P(y=1)} {P(y=0)} ) $$ 

$$ = odds = \beta_0 + \beta_1 X_1 + ... + \beta_k X_k $$

We define the this ratio as the "odds". Therefore, to estimate the impact of $$ X_j $$ increasing by 1 unit, we can compute it this way :

$$ \frac {odds_{X_{j+1}}} {odds} = \frac {exp^{\beta_0 + \beta_1 X_1 + ... + \beta_j (X_j + 1) + ... + \beta_k X_k}} {exp^{\beta_0 + \beta_1 X_1 + ... + \beta_j X_j + ... + \beta_k X_k}} $$

$$ = exp^{\beta_j (X_j + 1) - \beta_j X_j} = exp^{\beta_j} $$

A change in $$ X_j $$ by one unit increases the log odds ratio by the value of the corresponding weight : $$ exp^{\beta_j} $$.

The implementation is straight forward in Python using scikit-learn. 

```python
lr = LogisticRegression()
lr.fit(X_train, y_train)
y_pred = lr.predict(X_test)
y_proba = lr.predict_proba(X_test)
print(accuracy_score(y_pred, y_test))
```

`0.9473684210526315`

### Interpretability of Logistic Regression

With the logistic regression, we can still apply test hypothesis, build confidence intervals and compute the explained variance. Many of the advantages of the linear regression remain.

For example, to plot the value of the coefficients :

```python
plt.figure(figsize=(12,8))
plt.barh(X.columns,lr.coef_[0])
plt.title("Coefficient values")
plt.show()
```

![image](https://maelfabien.github.io/assets/images/pred_3.png)

It is a model meant for binary classification, so the prediction probabilities are sent between 0 and 1.

```python
plt.figure(figsize=(12,8))
plt.plot(np.sort(y_proba[:,0]))
plt.axhline(0.5, c='r')
plt.show()
```

![image](https://maelfabien.github.io/assets/images/pred_4.png)

### Limitations of Logistic Regression

Just like linear regression, the model remains quite limited in terms of performance, although a good regularization can offer decent performance. The coefficients are not as easily interpretable as for the linear regression. There is a tradeoff to make when choosing these kind of models, and they are often used in customer classification for car rental companies or in banking industry for example.

## 3. Decision Trees

Linear regression and logistic regression fail when features interact with each other. The Classification And Regression Trees (CART) algorithm is the most simple and popular tree algorithm.

![image](https://maelfabien.github.io/assets/images/dt.png)

To build the tree, we choose each time the feature that splits our data the best way possible. How do we measure the qualitiy of a split ? Let $$ p_{i} $$ be the fraction of items labeled with class i in the set :
- Cross-entropy : $$ H(p,q) = -\sum_{x \in {\mathcal{X}}} p(x) \log q(x) $$
- Gini impurity : $$ I_G = 1 - \sum_{i = 1...J} {p_i}^2 $$
- classification error

Note that in order to grow a decision tree for numeric data, we usually order the data by value of each feature, compute the average between every successive pair of values, and compute the split quality measure (e.g Gini) using this average.

We stop the development of the tree when splitting a node does not lower the impurity.

The relationship between the inputs and the output is given by :

$$ \hat{y}=\hat{f}(x)=\sum_{m=1}^Mc_m{}I\{x\in{}R_m\} $$ where $$ R_m $$ denotes the subset $$ m $$. If an observation to predict falls into the subset $$ R_j $$, the predicted value is $$ c_j $$, the average value of all training instances that fell in this subset.

To implement decision trees in Python, we can use scikit-learn :

```python
clf = DecisionTreeClassifier(max_depth=3)
clf.fit(X_train, y_train)
y_pred = clf.predict(X_test)
accuracy_score(y_pred, y_test)
```

`0.9210526315789473`


### Interpretability of CART algorithm

By growing the depth of the tree, we add "AND" conditions. For a new instance, the feature 1 is larger than `a` **and** the feature 3 is smaller than `b` **and** the feature 2 equals `c`.

CART algorithm offers a nice way to compute the importance of each feature in the model. We measure the importance of a Gini index by the extent to which the chosen citeria has been decreased when creating a new node on the given feature.

The tree offers a natural interpretability, and can be represented visually :

```python
export_graphviz(clf, out_file="tree.dot")
with open("tree.dot") as f:
dot_graph = f.read()

graphviz.Source(dot_graph)
```

![image](https://maelfabien.github.io/assets/images/pred_5.png)


### Limitations of CART algorithm

CART algorithms fails to represent linear relationships between the input and the output. It easily overfits and gets quite deep if we don't crontrol the model. For this reason, tree based ensemble models such as Random Forest have been developped.

## 4. Other models

There are other models that are by construction interpretable :
- K-Nearest Neighbors (KNN)
- Generalized Linear Models (GLMs)
- Stochastic processses such as Poisson processes if you want to model arrival rates or goals in a football match
- ...

# II. Model explainability

If we don't have to use interpretable models and need higher performance, we tend to use black box models such as XGBoost for example. It might however be needed, for various reasons, to provide an explaination of the outcome and the inner mechanics of the model. In such case, using model explainability techniques is the right choice. 

Explainability is useful for :
- establishing trust in an outcome
- debugging
- legal restrictions
- ... 

The main questions model explainability answers are :
- what are the most important features ?
- how do you decompose a single prediction and the contribution of each feature ?
- how do you decompose the model outcome and the contribution of each feature ?

We will explore several techniques of model explainability :
- individual conditional expectation
- permutation importance
- partial dependence plots
- shapley values

## 1. Feature Importance

What features have the biggest impact on predictions? There are many ways to compute feature importance. We will focus on **permutation importance**, which is fast to compute and widely used.

Permutation importance is computed after a model has been fitted. It shows how randomly shuffling the rows of a single column of the validation data, leaving the target and all other columns in place affects the accuracy.

For example, say that as before, we try to predict if a breast tumor is malignant or benign. We will randomly shuffle, column by column, the rows of the texture, the perimeter, the area, the smoothness...

![image](https://maelfabien.github.io/assets/images/perm.jpg)

Randomly re-ordering a single column should decrease the accuracy. Depending on how relevant the feature is, it will more or less impact the accuracy. We will use a Random Forest Classifier for the classification task.

```python
rf = RandomForestClassifier()
rf.fit(X_train, y_train)
```

We can compute the Permutation Importance with [Eli5 library](https://eli5.readthedocs.io/en/latest/). Eli5 is a Python library which allows to visualize and debug various Machine Learning models using unified API. It has built-in support for several ML frameworks and provides a way to explain black-box models.

To install `eli5` :

`pip install eli5`

We can then compute the permutation importance :

```python
perm = PermutationImportance(my_model, random_state=1).fit(X_test, y_test)
eli5.show_weights(perm, feature_names = val_X.columns.tolist())
```

![image](https://maelfabien.github.io/assets/images/pred_6.png)

In our example, the most important feature is `concave points_worst`. The first number in each row shows how much model performance decreased with a random shuffling (in this case, using "accuracy" as the performance metric). We measure the randomness by repeating the process with multiple shuffles.

Negative value for importance occurs when the feature is not important at all.

## 2. Individual Conditional Expectation (ICE)

How does the prediction change when 1 feature changes ? Individual Conditional Expectation, as its name suggests, is a plot that shows how a change in an individual feature changes the outcome of each individual prediction (one line per prediction). It can be used for regression tasks only. Since we face a classification task, we will re-use the linear regression model fitted above.

To build ICE plots, simply use `pycebox`. Start off by installing the package : 

`pip install pycebox`

```python
ice_radius = ice(data=X_train, column='radius_mean', predict=model.predict)
ice_concave = ice(data=X_train, column='concave points_worst', predict=model.predict)
ice_smooth = ice(data=X_train, column='smoothness_se', predict=model.predict)
```

And build the plots :

```python
ice_plot(ice_concave, c='dimgray', linewidth=0.3)
plt.ylabel('Prob. Malignant')
plt.xlabel('Worst concave points');
```

![image](https://maelfabien.github.io/assets/images/pred_7.png)

```python
ice_plot(ice_radius, c='dimgray', linewidth=0.3)
plt.ylabel('Prob. Malignant')
plt.xlabel('Radius mean');
```

![image](https://maelfabien.github.io/assets/images/pred_8.png)

Logically, since our linear model involves a linear relation between the inputs and the output, the ICE plots are linear. However, if we use a Gradient Boosting Regressor to perform the same task, the linear relation does not hold anymore.

```python
gb = GradientBoostingRegressor()
gb.fit(X_train, y_train)
ice_concave = ice(data=X_train, column='concave points_worst', predict=gb.predict)
```

![image](https://maelfabien.github.io/assets/images/pred_9.png)

Thanks to ICEs, we understand the impact of a feature on the value of the outcome for each individual instance, and we easily understand trends. However, the ICE curves only display one feature at a time, and we cannot plot the joint importance of 2 features for example. Partial dependence plots appear to overcome this issue.

## 3. Partial dependence plots

### 1D Partial Dependence Plot

Just like ICEs, Partial Dependence Plots (PDP) show how a feature affects predictions. They are however more powerful since they can plot joint effects of 2 features on the output. 

Partial dependence plots are calculated after a model has been fitted. How do we then split / disentangle the effects of several features?

We start by selecting a single row. We will use the fitted model to predict our outcome of that row. But we repeatedly **alter the value** for **one variable** to make a series of predictions.

For example, in the breast cancer example used above, we could predict the outcome if the radius is 10, 12, 14, 16...

We build the plot by:
- representing on the horizontal axis the value change in the ball possession for example
- and on the horizontal axis the change of the outcome

We don't use only a single row, but many rows to do that. Therefore, we can represent a confidence interval and an average value.

The blue shaded area indicates the level of condifence. PDPs can be compared with ICEs for these kind of plots, but they show the average trend and confidence levels instead of individual lines.

Then, we can plot the Partial Dependence Plot using [PDPbox](https://pdpbox.readthedocs.io/en/latest/). The goal of this library is to visualize the impact of certain features towards model prediction for any supervised learning algorithm using partial dependence plots. 

To install PDPbox : `pip install pdpbox`

```python
pdp_rad = pdp.pdp_isolate(model=rf, dataset=X_test, model_features=X_test.columns, feature='radius_mean')

pdp.pdp_plot(pdp_rad, 'Radius Mean')
plt.show()
```

![image](https://maelfabien.github.io/assets/images/pred_10.png)

### 2D Partial Dependence Plots

We can also plot interactions between features on a 2D graph.

```python
features_to_plot = ['radius_mean', 'smoothness_se']

inter1  =  pdp.pdp_interact(model=gb, dataset=X_test, model_features=X.columns, features=features_to_plot)

pdp.pdp_interact_plot(pdp_interact_out=inter1, feature_names=features_to_plot, plot_type='contour', x_quantile=True, plot_pdp=True)
plt.show()
```

![image](https://maelfabien.github.io/assets/images/pred_11.png)

### Actual Prediction Plot

Actual prediction plots show the medium value of actual predictions through different feature values for 2 predictions :

```python
fig, axes, summary_df = info_plots.actual_plot_interact(
model=rf, X=X_train, features=features_to_plot, feature_names=features_to_plot
)
```

![image](https://maelfabien.github.io/assets/images/pred_12.png)

## 4. Shapley Values

We have seen so far techniques to extract general insights from a machine learning model. What if you want to break down how the model works for an individual prediction?

SHAP Values (an acronym from SHapley Additive exPlanations) break down a prediction to show the impact of each feature.

This could be used for :
- banking automatic decisiom making 
- healthcare risk factor assessment for a single person

In summary, we use SHAP values to explain individual predictions.

### How does it work ?

SHAP values interpret the impact of having a certain value for a given feature in comparison to the prediction we'd make if that feature took some baseline value.

In our football example, we could wonder how much was a prediction driven by the fact that the team scored 3 goals, instead of some baseline number of goals?

We can decompose a prediction with the following equation:

`sum(SHAP values for all features) = pred_for_team - pred_for_baseline_values`

The SHAP Value can be represented visually as follows :

![image](https://maelfabien.github.io/assets/images/shap.png)

The output value is 0.70. This is the prediction for the selected team. The base value is 0.4979. Feature values causing increased predictions are in pink, and their visual size shows the magnitude of the feature's effect. Feature values decreasing the prediction are in blue. The biggest impact comes from Goal Scored being 2. Though the ball possession value has a meaningful effect decreasing the prediction.

If you subtract the length of the blue bars from the length of the pink bars, it equals the distance from the base value to the output.

### Example

We will use the [SHAP library](https://github.com/slundberg/shap). As previously, we import the Football game example. We will look at SHAP values for a single row of the dataset (we arbitrarily chose row 5).

```python
import shap  # package used to calculate Shap values

row_to_show = 5
data_for_prediction = X_test.iloc[row_to_show]  # use 1 row of data here. Could use multiple rows if desired
data_for_prediction_array = data_for_prediction.values.reshape(1, -1)

# Create object that can calculate shap values
explainer = shap.TreeExplainer(my_model)

# Calculate Shap values
shap_values = explainer.shap_values(data_for_prediction)
```

The `shap_values` is a list with two arrays. It's cumbersome to review raw arrays, but the shap package has a nice way to visualize the results.

```python
shap.initjs()
shap.force_plot(explainer.expected_value[1], shap_values[1], data_for_prediction)
```

![image](https://maelfabien.github.io/assets/images/shap_2.png)

The output prediction is 0.7, which means that the team is 70% likely to have a player win the award.

If we take many explanations such as the one shown above, rotate them 90 degrees, and then stack them horizontally, we can see explanations for an entire dataset:

```python
# visualize the training set predictions
shap.force_plot(explainer.expected_value, shap_values, X)
```

![image](https://maelfabien.github.io/assets/images/shap_7.png)

So far, we have used `shap.TreeExplainer(my_model)`. The package has other explainers for every type of model :
- `shap.DeepExplainer` works with Deep Learning models.
- `shap.KernelExplainer` works with all models, though it is slower than other Explainers and it offers an approximation rather than exact Shap values.

### Advanced uses of SHAP Values

### Summary plots

Permutation importance creates simple numeric measures to see which features mattered to a model. But it doesn't tell you how each features matter. If a feature has medium permutation importance, that could mean it has :
- a large effect for a few predictions, but no effect in general, or
- a medium effect for all predictions.

SHAP summary plots give us a birds-eye view of feature importance and what is driving it. 

![image](https://maelfabien.github.io/assets/images/shap_3.png)

Each dot has 3 characteristics :
- Vertical location shows what feature it is depicting
- Color shows whether the feature was high or low for that row of the dataset
- Horizontal location shows whether the effect of that value caused a higher or lower prediction

In this specific example, the model ignored `Red` and `Yellow & Red` features.High values of goal scored caused higher predictions, and low values caused low predictions.

Summary plots can be built the following way :

```python
# Create object that can calculate shap values
explainer = shap.TreeExplainer(my_model)

# Calculate shap_values for all of X_test rather than a single row, to have more data for plot.
shap_values = explainer.shap_values(X_test)

# Make plot. Index of [1] is explained in text below.
shap.summary_plot(shap_values[1], X_test)
```

Computing SHAP values can be slow on large datasets.

### SHAP Dependence Contribution plots

Partial Dependence Plots to show how a single feature impacts predictions. But they don't show the distribution of the effects for example. 

![image](https://maelfabien.github.io/assets/images/shap_4.png)

Each dot represents a row of data. The horizontal location is the actual value from the dataset, and the vertical location shows what having that value did to the prediction. The fact this slopes upward says that the more you possess the ball, the higher the model's prediction is for winning the Man of the Match award.

The spread suggests that other features must interact with Ball Possession %. For the same ball possession, we encounter SHAP values that range from -0.05 to 0.07.

![image](https://maelfabien.github.io/assets/images/shap_5.png)

We can also notice outliers that stand out spatially as being far away from the upward trend.

![image](https://maelfabien.github.io/assets/images/shap_6.png)

We can find an interpretation for this : In general, having the ball increases a team's chance of having their player win the award. But if they only score one goal, that trend reverses and the award judges may penalize them for having the ball so much if they score that little.

To implement Dependence Contribution plors, we can use the following code :


```python
# Create object that can calculate shap values
explainer = shap.TreeExplainer(my_model)

# calculate shap values. This is what we will plot.
shap_values = explainer.shap_values(X)

# make plot.
shap.dependence_plot('Ball Possession %', shap_values[1], X, interaction_index="Goal Scored")
```

### Summary plots

We can also just take the mean absolute value of the SHAP values for each feature to get a standard bar plot (produces stacked bars for multi-class outputs):

```python
shap.summary_plot(shap_values, X, plot_type="bar")
```

![image](https://maelfabien.github.io/assets/images/shap_8.png)

### Interaction plots

We can represent the interaction effect for two features and the effect on the SHAP Value they have. This can be done by plotting a dependence plot between of the interaction values. Let's take another random example in which we consider the interaction between the age and the white blood cells, and the effect this has on the SHAP interaction values :

```
shap.dependence_plot(
("Age", "White blood cells"),
shap_interaction_values, X.iloc[:2000,:],
display_features=X_display.iloc[:2000,:]
)
```

![image](https://maelfabien.github.io/assets/images/shap_9.png)

## 5. Approximation models

Approximation models (or global surrogate) is a simple and quite efficient trick. The idea is really simple : we train an interpretable model to approach the predictions of a black-box algorithm. 

We keep the original data, and use as `y_train` the predictions made on a data sample by the black-box algorithm. We can use any interpretable model, and benefit from all the advantages of the model chosen.

We might however loose accuracy compared to the black-box model, and we must pay attention to the way we sample data to train the black box algorithm.

> We have covered in this article the motivation for interpretable and explainable machine learning, the main interpretable models and the most widely used methods for explainable machine learning models. The need for transparent models has been rising and there is a clear demand nowadays for such techniques.
