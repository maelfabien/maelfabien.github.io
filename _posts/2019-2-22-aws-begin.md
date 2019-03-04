---
published: true
title: "AWS - Up & Running"
excerpt: "Principaux services"
classes: wide
comments: true
header:
  overlay_image: "assets/images/aws/cover.jpg"
  overlay_filter: 0.2
  teaser: "assets/images/aws/cover.jpg"
categories: [cloud, aws, basics]
---

AWS est une plateforme proposant de nombreux **services hébergés**, facturés à l'usage.

AWS propose plus de **100 services** différents, qui sont répartis dans les catégories suivantes :
- Serveurs virtuels privés, puissance de calcul
- Espace de stockage de fichiers
- Bases de données et solutions de gestion
- Solutions Réseau, Surveillance et Sécurité
- Environnements Big Data et solutions IA.
- [et bien d'autres encore](https://aws.amazon.com/fr/products/)

Les concurrents bien connus d'AWS sont *Google Cloud Platform* et *Microsoft Azure*. A l'heure actuelle, Amazon reste l'outil de choix en termes de taux d'adoption et de diversité de services. Les mécanismes sont similaires pour ses concurrents, bien que l'interface d'AWS soit moins friendly.

Voyons tout de suite quelques services souvent rencontrés :

### EC2 - Elastic cloud compute

Serveurs virtuels à usage général, possibilité de choisir la taille des ressources allouées.

Lancement en 5 étapes d'une instance dans la console AWS :
- Choix de l'**image** de base (AMI) parmi les nombreuses images existantes (Amazon Linux, Ubuntu, Custom : SAP, Tableau)
- Choix du **type** d'instance : grand choix de ressources pour tout les usages.
- **Configuration** de l'instance : Sous-réseau, roles des utilisateurs, espace de stockage supplémentaire.
- **Groupe de sécurité** : Ouverture de ports pour les flux entrant/sortant.
- Obtention de la **clé d'authentification**.

Lorsqu'une instance EC2 est créée, un stockage EBS (Elastic Block Storage) lui est attaché. C'est un stockage persistant, qui permet à l'instance d'être éteinte sans perte de données. Il faut faire attention à supprimer ces volumes de stockage après la suppression des instances car cela est facturé.

### S3 - Simple storage service

Service de **stockage de fichiers** divisés en espaces appelés **buckets**. Chaque bucket est identifié par un nom unique. Il existe plusieurs types de buckets pour différents besoin : il existe par exemple des bucket à moindre coût pour les fichiers qu'on souhaite uniquement stocker et non consulter. Les permissions permettent par exemple de créer un fichier en accès public, utile pour les ressources d'un site web.

Création d'un bucket depuis la console AWS :
- Choix d'un nom
- Configuration des permissions sur les données
- Ajout des données dans l'interface en ligne

### RDS - Relational data service

RDS propose la création simplifiée de **bases de données relationnelles**. Parmi les SGBD proposés on retrouve **Amazon Aurora, MySQL, PostGre, MariaDB, Oracle**. Ici encore la prise en main est facile et guidée à partir de la console en ligne AWS en quelques étapes :

- Choix de la solution SGBD
- Setup initial : Choix de l'instance d'execution, identifiants de connexion
- Paramètres avancés : Réseau, sécurité, supervision.

### IAM - Identity access management

IAM centralise la **gestion des profils utilisateurs** : leur rôles et autorisations. On trouve dans IAM des classes par défaut d'utilisateurs avec les autorisations pré-configurées (par exemple Developer ou AdminSys).

IAM est utile lorsque plusieurs personnes sont amenées à disposer d'un accès à un groupe de ressources :
- Permet de cloisonner les données, de définir des périmètres de travail.
- Permet d'autoriser ou non certaines actions à fort impact sur l'infrastructure (arrêt et suppression de machines).

### EMR - Elastic Map Reduce

EMR est une solution permettant de déployer facilement du **calcul distribué**, et de traiter efficacement de gros volumes de données. C'est une solution packagée qui utilise notamment les technologies **Hadoop, Spark**, ainsi que d'autres services AWS.

Le déploiement de EMR est proche de celui des instances EC2 :
- Choix des composants software (Hadoop, HBase, Presto, Spark)
- Choix de l'infrastructure de déploiement (nombre de noeuds, ressources individuelles)

Un cluster EMR est alors déployé, comportant un noeud master, et le reste comme des workers (slaves). La particularité du cluster EMR est qu'il ne peut pas être éteint, si on l'éteint, toutes les données sont perdues et on pourra uniquement démarrer un nouveau cluster comme une copie du précédent. Cela s'explique par le type de stockage utilisé : EMR utilise un stockage éphémère attaché à un cluster.


## Sources

- [Documentation AWS](https://docs.aws.amazon.com/index.html#lang/fr_fr)
