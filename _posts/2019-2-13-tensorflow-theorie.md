---
published: true
title: "De zéro à TensorFlow - Théorie"
excerpt: "Architecture, tenseurs, premiers scripts"
classes: wide
comments: true
header:
  overlay_image: "assets/images/tensorflow/cover.jpg"
  teaser: "assets/images/tensorflow/cover.jpg"
categories: [definitions, tensorflow, tensors]
---

Tensorflow est une **librairie machine learning créée par Google** pour la conception, la construction et l'entrainement de modèles.

Parmi les concurrents on trouve :
- **PyTorch**, le framework ML de Facebook, basé sur le language Lua. Facile à prendre en main pour un developpeur Python, car se base sur le même flot de contrôle standard.
- **CNTK**, le framework ML de Microsoft, proposant de une bonne vitesse de calcul et des bonnes performances en reconnaissance d'images.
- **mxnet**, le framework ML choisi par Amazon Web Services.
- **Caffe2**, un framework ML conçu pour des applications mobiles.

## Du vecteur au tenseur
Pour comprendre les tenseurs il est utile d'avoir en tête quelques notions d'algèbre linéaire et de calcul vectoriel.

![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/tensorflow/tensors.png){: .align-center}

### Vecteurs plan
Vocabulaire :

- **Matrice** : Tableau rectangulaire de valeurs.
- **Vecteur** : Type particulier de matrice, on peut considérer un vecteur comme une matrice d'une seule colonne.
- **Scalaire** : Les nombres réels qui multiplient les vecteurs dans un espace vectoriel.

On peut donc considérer un vecteur comme un scalaire, qui possède une direction.

Les vecteurs plans sont la forme la plus simple de tenseurs. Ils sont similaires aux vecteurs évoqués plus haut, avec pour seule différence qu'ils se trouvent dans un espace vectoriel. Un exemple :

On considère un vecteur 2 x 1. C'est à dire qu'il appartient à l'ensemble des nombres réels qui est constitué de paires, ie. ils appartiennent à un espace à deux dimensions. On les représente donc sous la forme (x, y). On peut suivre le même raisonnement pour un vecteur 3 x 1 dans un espace à trois dimensions.

### Bases

Nous avons vu que ces vecteurs sont facilement représentables dans différents espaces, mais ce qui nous interesse est d'effectuer des opérations. Pour cela on va utiliser des bases (ou vecteurs unitaires).

Les vecteurs unitaires ont une longueur de 1. Ils sont souvent représentés par une minuscule avec un accent circonflexe. Les vecteurs unitaires vont s'avérer pratiques pour exprimer un vecteur comme la somme d'autres vecteurs (vecteurs composants).

### Tenseurs

On a vu jusqu'à maintenant qu'un vecteur est caracterisé par une longueur et une direction. **Un tenseur est la représentation mathématique d'une entité physique qui peut être caractérisée par une intensité (magnitude) et plusieurs directions**.

Un tenseur peut être vu comme une matrice, et inversement, une matrice est un cas particulier de tenseur. Un tenseur peut avoir un nombre quelconque de dimensions. Une matrice est un tenseur de rang 2, un vecteur un tenseur de rang 1.

- Tenseur de rang 2 : Une image en niveaux de gris.
- Tenseur de rang 3 : Une image en couleur - empilement de chaque couleur
- Tenseur de rang 4 : Une vidéo en couleur

## Déploiement et architecture

### Architecture de Tensorflow

![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/tensorflow/architecture.png){: .align-center}

- **Couche basse** : TensorFlow s'adapte à de nombreuses architectures materielles, sur lesquelles la parallelisation des opérations est effectuée de manière transparente. Il s'execute aussi bien sur **CPU, GPU, iOS et Android**. La couche d'optimisation XLA (Accelerated Linear Algebra) améliore la vitesse, l'usage mémoire et la portabilité.
- **Client Tensorflow** : Tensorflow est conçu pour supporter de nombreux languages, la meilleure intégration actuelle est celle en Python. Le C++, Java et Go sont également supportés.
- **Couches superieures** : Parallelement aux clients classiques supportés, on trouve des bibliothèques d'abstraction utilisant le client python : Keras, Sonnet, TFLearn, qui masquent la complexité de Tensorflow et permettent d'automatiser de nombreuses tâches de conception.

### Déploiement


Pour travailler en environnement Jupyter Notebook, le plus simple est d'installer le package avec pip : ```pip install tensorflow```

Il suffira alors d'integrer la librairie dans les imports : ```import tensorflow as tf```

## Les bases de TensorFlow

### Premier script
```
import tensorflow as tf

# Définir deux constantes
x1 = tf.constant([1,2])
x2 = tf.constant([5,6])

# Multiplier
result = tf.multiply(x1, x2)

# Afficher les résultats
print(result)
```

Dans ce premier exemple on définit simplement deux constantes, et on déclare une opération sur ces constantes. **Ici, le print final ne donnera pas le résultat de cette multiplication**. En effet, c'est le principe de Tensorflow, comme évoqué en introduction : Ici c'est uniquement le **graph** de calcul qui est défini, aucun process de calcul n'est lancé.

Le moteur de calcul de Tensorflow se base sur un graphe, dans lequel circulent des tenseurs.. TensorFlow !

- Les noeuds sont des **opérations** mathématiques (multiplication, somme..)
- Les extremités sont des **données**, généralement des matrices multidimensionnelles / des tenseurs.

![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/tensorflow/graph.png){: .align-center}


Dans l'exemple suivant on démarre une **session** afin que les calculs qui nous interessent s'effectuent : ```tf.Session()```

```
x1 = tf.constant([1,2])
x2 = tf.constant([5,6])
result = tf.multiply(x1, x2)

# Initialiser une session
sess = tf.Session()
print(sess.run(result))

# Fermer la session
sess.close()
```

De manière plus compacte on peut appeler la session pour une opération spécifique :

```

x1 = tf.constant([1,2,3,4])
x2 = tf.constant([5,6,7,8])
result = tf.multiply(x1, x2)

with tf.Session() as sess:
  output = sess.run(result)
  print(output)
```




### Sources :

- [Datacamp - Tensorflow tutorial](https://www.datacamp.com/community/tutorials/tensorflow-tutorial)
- [Analytics Vidhya - Tensors and graphs](https://www.analyticsvidhya.com/blog/2017/03/tensorflow-understanding-tensors-and-graphs/)
- [Artificence - Tensorflow, les tenseurs](https://artificence.com/2017/08/14/rang-forme-et-type-de-tenseur-avec-tensorflow/)
- [Nishank Sharma - Tensorflow variables](https://medium.com/themlblog/getting-started-with-tensorflow-constants-variables-placeholders-and-sessions-80900727b489)
- [Tensorflow guide](https://www.tensorflow.org/guide)
