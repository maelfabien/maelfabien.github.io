---
published: true
title: "Docker 2 : Commandes et Dockerfile"
excerpt: "Anatomie du Dockerfile"
classes: wide
comments: true
header:
  overlay_image: "assets/images/docker/cover.jpg"
  teaser: "assets/images/docker/cover.jpg"
categories: [docker, containers]
---


Pour rappel :
- Un **container** est une image Docker mise en route. C'est un système d'exploitation minimaliste, qui contient une application spécifique.
- **L'image** Docker est créée au moment de la construction du container. Le container est créé à son lancement.
- Un container est construit comme un ensemble de **couches**, c'est le Dockerfile qui spécifie l'ordre d'ajout des couches.

Le **Dockerfile** est au coeur de Docker, c'est le plan de construction de  l'image qui servira à créer le container. C'est un fichier appelé *Dockerfile* sans extension, et doit se trouver dans le dossier courant lorsqu'on lance la commande ```docker build```, on peut ajouter un dockerfile situé ailleurs avec le flag ```-f```.

# Les instructions Dockerfile

- **FROM** : Dans quelle image aller chercher les fichiers.
- **LABEL**  : Metadonnées, par exemple mail de contact.
- **ENV** : Définition d'une variable d'environnement
- **RUN** : Execution une commande et création d'une couche de l'image. Par exemple pour installer des packages.
- **COPY** : Copier des fichiers ou dossiers dans le container.
- **ADD** : Similaire à **COPY**, gère aussi les archives .tar.
- **CMD** : Permet de fournir une commande et des arguments lors du lancement du container.
- **WORKDIR** : Définition du dossier courant pour la suite.
- **ARG** : Définition de variables à donner au moment du build.
- **ENTRYPOINT** : Permet de fournir une commande et des arguments lors de l'execution du container.
- **EXPOSE** : Ouvrir un port de connection.
- **VOLUME** : Créer un point d'attache pour stocker des données persistantes, et y accéder.

# Exemple Dockerfile (Application linux basique)

```
FROM ubuntu:15.04
COPY . /app
RUN make /app
CMD python /app/app.py
```

- **FROM** crée une couche à partir de l'image ```ubuntu:15.04```
- **COPY** ajoute les fichiers à l'image
- **RUN** execute la commande ```make``` pour construire l'application
- **CMD** donne la commande à exécuter dans le container.

## Sources

- [Documentation Docker](https://docs.docker.com)
- [Containers & Virtualization](https://www.smartfile.com/blog/what-is-containerization-and-has-it-killed-virtualization/)
- [Enough Docker to be useful](https://towardsdatascience.com/learn-enough-docker-to-be-useful-b7ba70caeb4b)
