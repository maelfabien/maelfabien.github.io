---
published: true
title: "Réseau de neurones, Classification binaire"
excerpt: "Course 1 - Week 2"
classes: wide
comments: true
header:
  overlay_image: "assets/images/nn1/cover.jpg"
  teaser: "assets/images/nn1/cover.jpg"
categories: [nn, logreg]
---

<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

Il s'agit de classifier le contenu d'une image, il y a un chat (1) ou pas de chat (0).

On part de l'image d'entrée en dimension 64x64, qui est en réalité un ensemble de 3 matrices 64x64, pour les trois intensités couleurs Rouge, Vert, Bleu. Notre matrice de données en entrée est finalement une concaténation de toutes les intensités dans un grand vecteur vertical.

$$(x, y) x \in \mathbb{R}$$ m exemples d'entrainement $${(x^{(1)}, y^{(1)}), (x^{(2)}, y^{(2)}), ..., (x^{(n)}, y^{(n)})}$$

La matrice X d'entrainement est de dimension (Nx, m), avec Nx le nombre d'éléments dans un vecteur de données, et m le nombre d'exemples d'entrainement. $$X \in \mathbb{R}^{Nx . m}$$

En sortie, on a un vecteur de labels $$Y = [y^{(1)}, y^{(2)}, ..., y^{(n)}] \in \mathbb{R}^{1 \times m}$$

## Problème vu comme une Regression Logistique

La regression logistique est utilisée pour la classification binaire supervisée. Pour un vecteur d'entrée X (une image), on considère la prédiction et on l'appelle Y chapeau. Y chapeau, est la probabilité d'obtenir 1, sachant l'entrée X (Quelle est la chance d'avoir un chat sur l'image).

On pourrait tenter une approche de régression linéaire en estimant $$\hat y = w^{T} + b$$, mais cela ne donnerait pas une grandeur entre 0 et 1, on recherche une probabilité.

On va donc appliquer une fonction d'activation, la fonction sigmoïde, qui renvoie les valeurs dans l'intervalle [0, 1] : $$\hat y = \sigma(w^{T} + b)$$. La fonction sigmoïde s'exprime ainsi : $$\sigma(z) = \frac{1}{1+e^{-z}}$$

On revient finalement au problème d'estimation des paramètres w et b pour que $$\hat y$$ soit un bon estimateur de la probabilité que Y vale 1.
- W est un vecteur de taille $$n_{x}$$
- b est un réel

## Fonctions de perte et de coût associées à la régression logistique

Pour entrainer les paramètres W et b, il faut définir une fonction de perte. Pour un ensemble d'entrainement $${(x^{(1)}, y^{(1)}), (x^{(2)}, y^{(2)}), ..., (x^{(m)}, y^{(m)})}$$, on veut notre estimation $$\hat y^{i}$$ la plus proche $$y^{i}$$.

La **fonction de perte (Loss)** est définie par :

$$\mathfrak{L}(\hat y, y) = -(y\log \hat y+(1-y)\log(1-\hat y))$$

Cette fonction de Loss est adaptée car elle est convexe et la descente de gradient arrivera à trouver un minimum. La procédure d'apprentissage va consister à minimiser cette fonction, elle est en effet minimale pour $$\hat y^{i}$$ égal à $$y^{i}$$.

La **fonction de  coût (Cost)** est définie par l'application de la fonction de perte à chacun des exemples d'entrainement :

$$J(w, b)=\frac{1}{m}\sum_{1}^{m}\mathfrak{L}(\hat y^{(i)},y^{(i)})$$
