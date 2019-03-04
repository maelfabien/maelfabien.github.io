---
published: true
title: "Docker 3 : Déployer une application Python"
excerpt: "Création d'un container custom"
classes: wide
comments: true
header:
  overlay_image: "assets/images/docker/cover.jpg"
  teaser: "assets/images/docker/cover.jpg"
categories: [docker, python]
---

## Pré-requis
- Connaitre les concepts de base de Docker.
- Disposer d'une appli python prête à déployer avec ```python3 main.py```
- Avoir installé Docker sur son environnement de travail

## Dossier de travail

Nous allons créer un dossier de travail contenant tout les fichiers de notre application, ils seront ensuite intégrés à notre container. Appellons ce dossier **docker-app**, ce sera notre point de départ.

Ce dossier **docker-app** contient à présent uniquement les fichiers de notre application.

## Dépendances

Dans notre dossier **docker-app** nous allons créer le fichier **requirements.txt**. C'est ici que nous allons définir les librairies nécessaires à notre application, car notre container sera créé à partir d'une image Ubuntu nue.

On liste donc dans **requirements.txt** chacune des librairies nécessaires : numpy, pandas... une par ligne.

```bash
numpy
pandas
Flask
...
```

## Construction de l'image

Passons à l'écriture de la recette pour construire l'image Docker. Pour rappel : l'image Docker est une sorte d'emporte-pièce, qui permet de créer de nouveaux containers avec une configuration précise. Notre application s'executera alors dans chacun des containers.

Pour créer notre image docker, on se sert du **Dockerfile** : c'est un enchainement de commandes permettant d'automatiser des opérations lors de la création de l'image.

Voici les différentes étapes que l'on spécifie dans un fichier appelé *Dockerfile* (sans extension), dans notre répertoire **docker-app**.

```bash
# Spécification de l'image de base utilisée pour notre nouvelle image
FROM ubuntu:latest

# Optionnel : Information dur l'auteur
MAINTAINER Alexandre

# Mises à jour de l'image et installation des packages spécifiques
RUN apt-get update -y
RUN apt-get install -y python3-pip python3-dev build-essential

# Copie de tout les fichiers dans un nouveau sous-dossier
COPY . /app
# Définir app comme le dossier de travail
WORKDIR /app

# Installer toutes les dépendances avec pip3
RUN pip3 install -r requirements.txt

# Lancement de l'appli
ENTRYPOINT ["python3"]
CMD ["main.py"]
```

Le sous-dossier **app** n'est pas créé dans votre dossier de travail, l'instruction **COPY** permet d'inclure tout nos fichiers dans le container pour qu'il puisse les utiliser : par exemple utiliser le fichier requirements.txt pour connaitre les librairies à importer.

## Lancement des opérations Docker

Maintenant que le Dockerfile est prêt, on peut commencer à manipuler quelques commandes Docker pour créer une image et lancer un container.

On se place dans notre dossier **docker-app** et on commence par créer l'image avec :

```bash
docker build -t python-sample:latest .
```

- docker build est l'instruction qui crée une image
- -t est l'option pour spécifier un tag à l'image crée, ici "python-sample" avec la précision que l'on crée la version "latest" la plus récente.

Cette commande construit une image Docker à partir des fichiers présents dans le répertoire, elle va interpréter séquentiellement les instructions dans le fichier Dockerfile.

À la fin des instructions, **une image docker est créée**. On peut visualiser avec la commande ```docker images```, qui recense les images dont Docker dispose. On y retrouve l'image de base Ubuntu appelée dans le Dockerfile avec ```ubuntu:latest```, car Docker optimise les téléchargements en conservant les images utilisées.

```bash
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
python-sample    latest              5d42a9f98d6e        11 minutes ago      1.4GB
ubuntu              latest              47b19964fb50        3 weeks ago         88.1MB
```

On dispose maintenant d'une image docker, mais pour l'instant, rien ne s'execute. On va utiliser la commande ```docker run``` pour créer un container à partir d'une image :

```bash
docker run -d -p 5000:5000 python-sample
```

Explications :
- ```docker run python-sample``` est la commande de base pour lancer un container selon une image.
- ```-d``` permet de lancer le container en mode détaché, et de récupérer l'identifiant du container lors de son lancement.
- ```-p 5000:5000``` permet d'exposer un port du container, ici par exemple le port 5000 pour les applis flask.

```bash
[Alex@workplace ~/docker-app]$ docker run -d -p 5000:5000 flask-sample-one
4f5a138b9d11c0066491ed25972a06d2daf070b4a6181eb7d0e0627c00188c35
```

On récupère donc l'identifiant du container dans lequel s'execute notre application, et on peut y accéder à l'adresse 0.0.0.0:5000 !

## Quelques commandes pour gérer les images et containers

Containers :
- ```docker ps``` : Voir les containers en cours d'execution.
- ```docker ps -a``` : Voir tous les containers (également ceux arrêtés).
- ```docker logs 5d42a9f98d6e``` : Accéder aux logs du container avec son ID.

Images :
- ```docker images``` : Lister les images disponibles.
- ```docker pull ubuntu``` : Charger une image dans la librairie Docker, ici Ubuntu, la version la plus récente est téélchargée.

Faire le ménage :
- ```docker stop $(docker ps -aq)``` : Arrêter tous les containers en cours d'execution.
- ```docker rm $(docker ps -aq)``` : Supprimer tous les containers (impossible de supprimer l'image correspondante d'un container, même arrêté).
- ```docker rmi $(docker images -q)``` : Supprimer toutes les images en mémoire (utile après plusieurs builds de test).

## Sources

- [Documentation Docker](https://docs.docker.com)
