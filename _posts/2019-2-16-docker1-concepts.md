---
published: true
title: "Docker 1 : Les concepts"
excerpt: "Container, Images, notions de base"
classes: wide
comments: true
header:
  overlay_image: "assets/images/docker/cover.jpg"
  teaser: "assets/images/docker/cover.jpg"
categories: [docker, containers]
---

# Le concept

Les containers sont utilisés pour améliorer la sécurité, la reproductibilité et la scalablité des développements en data science. Docker est une plateforme qui permet de déployer des applications dans des containers.

## Concepts importants de Docker

Qu'attend-t-on d'un container ?
- **Contenir des choses** : On veut pouvoir y mettre notre application.
- **Être portable** : Il peut être utilisé en local, reproduit sur la machine du collègue, ou même sur un service cloud.
- **Avoir des interfaces d'accès précises** : Un container Docker dispose de mécanismes pour interagir avec l'exterieur (ports, command line..)
- **Pouvoir l'obtenir à distance** : Docker permet d'enregistrer une image dans un registre global et permet de re-télécharger l'image du container autant de fois que nécessaire.

On peut comparer un container Docker comme **une chose vivante**, qui existe sous une forme unique, qui a une durée de vie. Un container Docker est une image Docker à qui on a donné vie.

Un container Docker est finalement un logiciel, dans lequel des programmes s'exécutent. Il peut y en avoir plusieurs en parallèle sur une unique machine, qui peuvent individuellement être exécutés, inspectés, stoppés, supprimés.

### Machine virtuelle
Les machines virtuelles sont les ancêtres des containers Docker. Les machines virtuelles, elles aussi, isolent une application et ses dépendances (ce dont elle a besoin pour s'executer).

Les containers sont supérieurs car ils utilisent beaucoup moins de ressources, sont portables, et sont rapidement deployables. On le voit bien sur ce schema :

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/docker/VM-containers.png" alt="" class="center" width="500">


### Docker image
On peut comparer les images Docker à des emporte pièces, ou des moules en patisserie. Une image est le modèle sur lequel on construit un nouveau container identique.

**L'image Docker contient dans un package : le Dockerfile, les librairies, et le code de l'application.**

### Dockerfile
C'est le fichier qui indique à Docker comment construire notre image :
- Elle fait référence à une image de base, les plus populaires étant python, ubuntu, alpine.
- Une image intermédiaire par dessus l'image de base. Pour une application machine learning, typiquement charger Numpy, Pandas, et SciKit learn.

### Lancement et enregistrement
Une image docker, associée à la commande ```docker run image_name``` démarre un container avec l'image demandée.

Pour distribuer cette image, il existe le [Docker Hub](https://hub.docker.com/) qui recense toutes les images que l'on peut obtenir avec ```docker run *```


## Résumé
Le Dockerfile contient les instructions pour construire l'image finale. Il utilise les différents composants qui sont des couches logicielles successives.

- La couche de fondation (ex. Ubuntu) qui est pré-chargée et ne sera pas modifiable.
- Chargement des librairies externes (ex.Sci-Kit)
- Chargement du code de l'application.


## Termes utiles


- **Engine** : *Docker Engine*, c'est la technologie qui permet de containériser des applications.
- **Client** : L'interface qui reçoit des commandes comme ```docker build``` et les transmet à Docker pour être exécuté.
- **Daemon** : Le serveur qui reçoit et execute les commandes.
- **Volumes** : C'est un mécanisme proposé par Docker pour la gestion du stockage. C'est un système de fichier interne à l'application Docker, totalement géré par lui et facilement accessible par tout containers, ou bien par l'interface utilisateur.
- **Registry** : Une librairie proposant des images Docker.
- **Docker Hub** : C'est le *registry* officiel de Docker, qui permet de stocker facilement des images custom.
- **Repository** : Dans un *registry* on trouve un repository pour chaque image (ubuntu, alpine, python..), chacun de ces repositories contiennent les différentes versions de l'image.

Pour faire travailler plusieurs images docker et les relier on utilise :

- **Networking** : Les containers Docker sont capables de communiquer entre eux, ou bien avec des applications tierces.
- **Compose** : Outil pour créer des applications Docker avec plusieurs containers. A partir d'un fichier de configuration YAML, on définit les services de l'application.
- **Swarm** : On utilise Swarm pour déployer des containers sur un ensemble de machines (cluster). La solution *Kubernetes* est habituellement préférée pour ce type de tâche.
- **Services** : Pour un déploiement multi-machine, différents aspects de l'application seront désignés comme des Services.


## Sources

- [Documentation Docker](https://docs.docker.com)
- [Containers & Virtualization](https://www.smartfile.com/blog/what-is-containerization-and-has-it-killed-virtualization/)
- [Enough Docker to be useful](https://towardsdatascience.com/learn-enough-docker-to-be-useful-b7ba70caeb4b)
