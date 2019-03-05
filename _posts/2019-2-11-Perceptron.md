---
published: true
title: The Rosenblatt Perceptron
collection: dl
layout: single
author_profile: false
read_time: true
categories: [deeplearning]
excerpt : "Deep Neural Networks"
header :
    overlay_image: "https://maelfabien.github.io/assets/images/wolf.jpg"
    teaser_image: "https://maelfabien.github.io/assets/images/wolf.jpg"
comments : true
toc: true
toc_sticky: true
---
In this series of articles, I am going to focus on the basis of Deep Learning, and progressively move toward recent research papers and more advanced techniques. As I am particularly interested in computer vision, I will explore some examples applied to object detection or emotion recognition for example.

{% highlight python %}
{% endhighlight %}

<script type="text/javascript" async
    src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

## Definition

A perceptron is a single layer Neural Network. A perceptron can simply be seen as a set of inputs, that are weighted and to which we apply an activation function. This produces sort of a weighted sum of inputs, resulting in an output. This is typically used for binary classification problems. 

The perceptron was first introduced in 1957 by Franck Rosenblatt. Since then, it has been the core of Deep Learning.


![image](https://maelfabien.github.io/assets/images/perceptron.png)

We have a set of inputs $$ X_i $$, to which we apply :
- weights $$ w_i $$ to form a weight sum,
- a bias term $$ b_i $$ that can also be introduced as an input,
- and pass the overall function into an activation function.


The inputs can be seen as neurons, and will be called the input layer.The activation function might take several forms and should "send" the weighted sum into a smaller set of possible values that allows us to classify the output. One common activation function for a simple perceptron is a modified version of $$ sign $$ function, noted $$ h_w(x^i) $$, for which we assign the value 1 if the weighted sum is larger than some threshold, and 0 otherwise. This projects the weighted sum of inputs into a Heaviside function.

Then, a given observation can be either well classified, or in the wrong class. As in most optimization problems, we want to minimize the cost, i.e the sum of the individual losses on each training observation.

A pseudo code corresponding to our problem is :

![image](https://maelfabien.github.io/assets/images/pseudo.png)


In the most basic framework, we consider essentially a linear classification rule than can be represented as :

$$ g(x) = sign({\alpha + \beta^tx}) $$


where $$ {\alpha} $$ represents the bias term, and $$ {\beta} $$ the weights on each neuron.

In this framework, the empirical loss function to minimize when classifying is :

$$ min_{(x, {\beta})}\hat{L}_n(g) $$

$$ \hat{L}_n(g) = \frac{1}{n} \sum 1(-(\alpha + \beta^tx)y > 0)  $$

However, due to the form of the $$ sign $$ function, we cannot apply a gradient descent to identify the minimum. 


![image](https://maelfabien.github.io/assets/images/Signum_function.svg.png){:height="50%" width="50%"}

However, due to the form of the \(sign\) function, we cannot apply a gradient descent to identify the minimum. We need to apply a stochastic gradient descent. The perceptron "learns" how to adapt the weights using back propagation. The weights and bias are firstly set randomly, and we compute an error rate. Then, we proceed to a back propagation to adjust the parameters that we did not correctly identify, and we start all over again for a given number of epoch.

We will further detail the concepts of stochastic gradient descent and back propagation in the context of Multilayer Perceptron.

Another approach to overcome the lack of derivability of the Heaviside function is to use the sigmoid function as an activation function :

$$ {\sigma(z)} = \frac{1}{1 + e^{-z}}  $$

This produces a modified perceptron, which is called a logistic regression with 0 hidden layer.

The perceptron has another major drawback. If the categories are linearly separable for example, it identifies a single separating hyper-plane without taking into account the notion of margin we would like to maximize. This problem is solved by the Support Vector Machine (SVM) algorithm.

Finally, the perceptron classification rule is linear. This is due to the simple structure of the perceptron, and implies limitations when looking at complex problems such as emotion recognition.

Using tensorflow famous data base MNIST as an example, a perceptron can be built the following way in Python. This simple application heads an accuracy of around 80 percents. This example is taken from the book : "Deep Learning for Computer Vision" by Dr. Stephen Moore, which I do encourage you to read.

```python
from tensorflow.examples.tutorials.mnist import input_data
import tensorflow as tf
mnist_data = input_data.read_data_sets('MNIST_data', one_hot=True)

input_size = 784
no_classes = 10
batch_size = 100
total_batches = 200

x_input = tf.placeholder(tf.float32, shape=[None, input_size])
y_input = tf.placeholder(tf.float32, shape=[None, no_classes])
weights = tf.Variable(tf.random_normal([input_size, no_classes]))
bias = tf.Variable(tf.random_normal([no_classes]))

logits = tf.matmul(x_input, weights) + bias

softmax_cross_entropy = tf.nn.softmax_cross_entropy_with_logits(labels=y_input,
logits=logits)
loss_operation = tf.reduce_mean(softmax_cross_entropy)
optimiser = tf.train.GradientDescentOptimizer(learning_rate=0.5)
.minimize(loss_operation)

session = tf.Session()
session.run(tf.global_variables_initializer())

for batch_no in range(total_batches):
mnist_batch = mnist_data.train.next_batch(batch_size)
_, loss_value = session.run([optimiser, loss_operation], feed_dict={
x_input: mnist_batch[0],
y_input: mnist_batch[1]
})
print(loss_value)

predictions = tf.argmax(logits, 1)
correct_predictions = tf.equal(predictions, tf.argmax(y_input, 1))
accuracy_operation = tf.reduce_mean(tf.cast(correct_predictions,
tf.float32))
test_images, test_labels = mnist_data.test.images, mnist_data.test.labels
accuracy_value = session.run(accuracy_operation, feed_dict={
x_input: test_images,
y_input: test_labels
})
print('Accuracy : ', accuracy_value)
session.close()
```
This heads an accuracy of around `80%` which can be largely improved by the next techniques we are going to cover.

> **Conclusion** : Next step, we are going to explore the Multilayer Perceptron !
