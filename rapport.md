# Rapport de projet : Assistant intelligent de gestion des e-mails

## Sommaire

1. [Introduction](#1-introduction)

2. [Objectifs du projet](#2-objectifs-du-projet)

3. [Technologies utilisées](#3-technologies-utilisées)

4. [Architecture générale de la solution](#4-architecture-générale-de-la-solution)

5. [Installation et configuration du projet](#5-installation-et-configuration-du-projet)

6. [Développement de l’interface React](#6-développement-de-linterface-react)

7. [Automatisation avec n8n](#7-automatisation-avec-n8n)

8. [Intégration de Gmail](#8-intégration-de-gmail)

9. [Intégration de Groq pour l’intelligence artificielle](#9-intégration-de-groq-pour-lintelligence-artificielle)

10. [Gestion des réponses aux e-mails](#10-gestion-des-réponses-aux-e-mails)

11. [Sauvegarde locale des données JSON](#11-sauvegarde-locale-des-données-json)

12. [Sécurité des clés et identifiants](#12-sécurité-des-clés-et-identifiants)

13. [Difficultés rencontrées et solutions apportées](#13-difficultés-rencontrées-et-solutions-apportées)

14. [Résultats obtenus](#14-résultats-obtenus)

15. [Limites du projet](#15-limites-du-projet)

16. [Améliorations possibles](#16-améliorations-possibles)

17. [Organisation du dépôt GitHub](#17-organisation-du-dépôt-github)

18. [Conclusion](#18-conclusion)

## 1. Introduction

Ce projet consiste à développer une application web permettant de consulter, résumer et traiter les e-mails reçus dans la journée. Il combine deux parties principales : une interface web développée avec React et une automatisation réalisée avec n8n.

L’objectif général est de proposer un outil simple et pratique qui aide l’utilisateur à gagner du temps dans la gestion de ses e-mails. L’application permet d’afficher les messages reçus, de consulter leur contenu, d’obtenir un résumé global généré par intelligence artificielle et de répondre aux e-mails directement depuis l’interface.

Le projet s’inscrit dans un contexte de développement web et d’automatisation. Il vise à montrer la capacité à construire une solution complète, claire, ergonomique et connectée à des services externes comme Gmail et Groq.

Dans cette solution, React est utilisé pour la partie visible par l’utilisateur, tandis que n8n sert d’intermédiaire entre l’interface web, Gmail et Groq. Cette organisation permet de ne pas exposer les clés API ou les identifiants sensibles dans le code frontend.

## 2. Objectifs du projet

- Le premier objectif du projet est de développer une interface web responsive permettant à l’utilisateur de consulter les e-mails reçus dans la journée. L’interface doit être claire, lisible et utilisable aussi bien sur ordinateur que sur téléphone.

- Le deuxième objectif est de mettre en place un workflow n8n capable de se connecter à une boîte Gmail, de récupérer les e-mails du jour, puis d’extraire les informations importantes de chaque message : l’expéditeur, l’objet, la date de réception et le contenu du mail.

- Le troisième objectif est d’utiliser une intelligence artificielle pour générer un résumé global des e-mails reçus. Dans ce projet, Groq est utilisé pour générer ce résumé automatiquement à partir des données extraites par n8n.

- Le quatrième objectif est de permettre à l’utilisateur de répondre aux e-mails depuis l’interface. Deux possibilités sont prévues : écrire une réponse manuellement ou demander à l’intelligence artificielle de proposer une réponse automatique que l’utilisateur peut ensuite modifier avant l’envoi.

- Le cinquième objectif est de sauvegarder les données traitées dans un fichier JSON local nommé `mails-today.json`. Ce fichier permet de garder une trace structurée des e-mails récupérés et du résumé généré.

- Enfin, le projet doit être organisé proprement dans un dépôt GitHub contenant le code de l’application web, les exports des workflows n8n et le présent rapport rédigé en Markdown.

## 3. Technologies utilisées

Pour réaliser ce projet, plusieurs technologies ont été utilisées. Chaque technologie a un rôle précis dans l’architecture générale de l’application.

### 3.1 React

React a été utilisé pour développer l’interface web de l’application. Il permet de créer une interface dynamique, interactive et organisée en composants.

Dans ce projet, React sert à afficher les e-mails récupérés depuis n8n, à présenter le résumé global généré par l’intelligence artificielle, à afficher le contenu complet d’un mail, à rédiger une réponse manuelle et à demander une réponse automatique.

React a été choisi parce qu’il permet de construire rapidement une interface moderne, fluide et responsive.

### 3.2 CSS

Le CSS a été utilisé pour améliorer l’apparence de l’application. Il permet de définir les couleurs, les espacements, les boutons, les cartes d’e-mails, la mise en page et l’adaptation aux écrans mobiles.

L’objectif était d’avoir une interface agréable, claire et facile à utiliser. L’interface a donc été pensée avec des cartes, des boutons visibles, des couleurs modernes, des messages d’état et une disposition responsive.

### 3.3 n8n

n8n est utilisé comme outil d’automatisation. Il joue le rôle d’intermédiaire entre l’interface React, Gmail et Groq.

Dans ce projet, n8n permet de récupérer les e-mails du jour depuis Gmail, d’extraire les informations importantes, de générer un résumé global, d’envoyer des réponses et de sauvegarder les données dans un fichier JSON local.

L’utilisation de n8n permet aussi d’éviter de placer les identifiants Gmail ou la clé API Groq directement dans le code React.

### 3.4 Gmail

Gmail est utilisé comme service de messagerie. Un compte Gmail de test a été configuré afin de récupérer les e-mails reçus dans la journée et d’envoyer des réponses depuis l’application.

La connexion à Gmail se fait dans n8n à l’aide d’une configuration OAuth via Google Cloud. Cela permet à n8n d’accéder à la boîte mail de façon contrôlée.

### 3.5 Groq

Groq est utilisé pour la partie intelligence artificielle du projet. Il permet de générer automatiquement un résumé global des e-mails reçus et de proposer une réponse automatique à un mail sélectionné.

Dans ce projet, Groq est appelé depuis n8n. La clé API Groq est donc stockée dans les credentials n8n et n’est pas exposée dans le code frontend.

### 3.6 JSON

Le format JSON est utilisé pour structurer les données échangées entre n8n et React.

Les e-mails sont transformés sous forme d’objets JSON contenant notamment l’expéditeur, l’objet, la date de réception, le résumé, le contenu et le statut du mail.

Un fichier local nommé `mails-today.json` est également généré pour conserver une trace des e-mails traités dans la journée.

### 3.7 Git et GitHub

Git est utilisé pour versionner progressivement le projet. Chaque grande étape du développement a été enregistrée avec un commit clair.

GitHub est utilisé pour héberger le dépôt du projet. Le dépôt contient le code de l’application React, les workflows n8n exportés, le fichier JSON local, la documentation et le rapport Markdown.

### 3.8 Google Cloud

Google Cloud a été utilisé pour configurer l’accès OAuth à Gmail. Cette configuration est nécessaire pour permettre à n8n de se connecter au compte Gmail de test.

Elle permet notamment de créer un projet Google Cloud, d’activer Gmail API, de configurer l’écran de consentement OAuth et de créer les identifiants nécessaires à la connexion.


## 4. Architecture générale de la solution

L’application est organisée autour de deux grandes parties : le frontend React et les workflows n8n.

React représente la partie visible par l’utilisateur. C’est dans cette interface que l’utilisateur consulte les e-mails, lit les résumés, écrit une réponse, génère une réponse avec l’intelligence artificielle et actualise les données.

n8n représente la partie automatisation. Il reçoit les demandes envoyées par React, se connecte à Gmail pour récupérer ou envoyer des e-mails, appelle Groq pour générer du texte avec l’intelligence artificielle, puis renvoie les résultats à React sous forme de données JSON.

L’architecture générale peut être représentée simplement ainsi :

```text
Utilisateur
↓
Interface React
↓
Webhook n8n
↓
Gmail
↓
Groq
↓
Fichier JSON local
↓
Retour vers React
````

### 4.1 Rôle de React

React est utilisé pour afficher les données et permettre les interactions avec l’utilisateur.

Dans l’application, React permet notamment de :

* afficher la liste des e-mails reçus dans la journée ;
* afficher le résumé global généré par l’intelligence artificielle ;
* rechercher un e-mail ;
* filtrer les e-mails selon leur statut ;
* lire le contenu complet d’un e-mail ;
* écrire une réponse manuelle ;
* demander une proposition de réponse automatique ;
* envoyer une réponse via n8n ;
* actualiser la liste des e-mails.

React ne se connecte pas directement à Gmail ni à Groq. Il communique uniquement avec n8n à travers des webhooks.

### 4.2 Rôle de n8n

n8n sert d’intermédiaire entre React et les services externes.

Il permet de centraliser toute la logique sensible du projet, notamment :

* la connexion à Gmail ;
* la récupération des e-mails du jour ;
* l’extraction des informations importantes ;
* le nettoyage du contenu HTML des e-mails ;
* l’appel à Groq pour générer un résumé global ;
* l’appel à Groq pour générer une réponse automatique ;
* l’envoi d’une réponse via Gmail ;
* la sauvegarde des données dans un fichier JSON local.

Cette organisation permet de protéger les clés API et les identifiants, car ils restent configurés dans n8n et ne sont pas exposés dans le code React.

### 4.3 Communication entre React et n8n

La communication entre React et n8n se fait à travers des webhooks.

Un webhook est une URL spéciale fournie par n8n. Lorsque React appelle cette URL, le workflow correspondant démarre automatiquement.

Dans ce projet, plusieurs webhooks ont été créés :

```text
GET  /webhook/mails-today
POST /webhook/reply-manual
POST /webhook/reply-ai
```

Le webhook `mails-today` permet à React de récupérer les e-mails du jour.

Le webhook `reply-manual` permet à React d’envoyer une réponse manuelle à Gmail via n8n.

Le webhook `reply-ai` permet à React de demander à Groq une proposition de réponse automatique.

### 4.4 Flux de récupération des e-mails

Lorsque l’utilisateur ouvre l’application ou clique sur le bouton d’actualisation, React appelle le webhook `mails-today`.

Le workflow n8n réalise ensuite les actions suivantes :

```text
React appelle n8n
↓
n8n cherche les e-mails reçus aujourd’hui dans Gmail
↓
n8n récupère les détails de chaque e-mail
↓
n8n extrait l’expéditeur, l’objet, la date et le contenu
↓
n8n nettoie le contenu des e-mails
↓
n8n demande à Groq de générer un résumé global
↓
n8n sauvegarde les données dans mails-today.json
↓
n8n renvoie le JSON final à React
```

Le résultat renvoyé à React contient une structure proche de celle-ci :

```json
{
  "date": "2026-05-20",
  "resumeGlobal": "Résumé généré par l'intelligence artificielle.",
  "mails": [
    {
      "id": 1,
      "messageId": "identifiant-gmail",
      "threadId": "identifiant-conversation",
      "expediteur": "exemple@gmail.com",
      "objet": "Objet du message",
      "dateReception": "20/05/2026 14:30:00",
      "resume": "Résumé court du message",
      "contenu": "Contenu complet du message",
      "statut": "non répondu"
    }
  ]
}
```

### 4.5 Flux d’envoi d’une réponse manuelle

Lorsqu’un utilisateur écrit une réponse et clique sur le bouton d’envoi, React envoie les informations nécessaires au webhook `reply-manual`.

Le workflow n8n reçoit :

```text
messageId
message
```

Le `messageId` permet de savoir à quel e-mail Gmail il faut répondre. Le champ `message` contient la réponse écrite par l’utilisateur.

Le flux est le suivant :

```text
Utilisateur écrit une réponse
↓
React envoie la réponse à n8n
↓
n8n vérifie les données reçues
↓
n8n envoie la réponse avec Gmail
↓
n8n confirme le succès à React
↓
React affiche un message de confirmation
```

Après l’envoi, React met le statut du mail à `répondu` dans l’interface.

### 4.6 Flux de génération d’une réponse IA

Lorsqu’un utilisateur clique sur le bouton `Réponse IA`, React envoie les informations du mail sélectionné à n8n.

Le workflow n8n reçoit :

```text
expediteur
objet
contenu
```

n8n prépare ensuite une consigne claire pour Groq, puis Groq génère une proposition de réponse.

Le flux est le suivant :

```text
Utilisateur clique sur Réponse IA
↓
React envoie le mail sélectionné à n8n
↓
n8n prépare une demande pour Groq
↓
Groq génère une proposition de réponse
↓
n8n renvoie la réponse générée à React
↓
React affiche la réponse dans la zone de texte
↓
L’utilisateur peut modifier puis envoyer la réponse
```

Cette approche est plus sûre, car l’intelligence artificielle ne répond jamais directement sans validation humaine.

### 4.7 Sauvegarde locale des données

Le workflow principal sauvegarde aussi les données finales dans un fichier local :

```text
data/mails-today.json
```

Ce fichier contient les e-mails récupérés, le résumé global et les informations structurées utilisées par React.

La sauvegarde locale permet de garder une trace des données traitées par n8n. Elle peut aussi servir pour le test, la vérification ou la documentation du projet.

### 4.8 Séparation des responsabilités

L’architecture du projet repose sur une séparation claire des responsabilités.

React s’occupe de l’affichage et des interactions utilisateur.

n8n s’occupe de l’automatisation, des appels à Gmail, des appels à Groq et de la sauvegarde des données.

Gmail s’occupe de la messagerie.

Groq s’occupe de la génération de texte par intelligence artificielle.

Cette séparation rend le projet plus clair, plus sécurisé et plus facile à maintenir.


## 5. Installation et configuration du projet

Cette partie présente les principales étapes réalisées pour installer et configurer l’environnement de développement du projet.

Le projet a été développé sous Windows. L’environnement utilisé comprend Node.js, React, n8n, Git, GitHub, Google Cloud, Gmail et Groq.

### 5.1 Création du dossier du projet

Un dossier principal a été créé pour contenir tous les fichiers du projet.

Le dossier principal du projet est nommé :

```text
assistant-mails-stage
````

Il contient plusieurs sous-dossiers importants :

```text
assistant-mails-stage/
├── frontend/
├── data/
├── n8n/
├── docs/
├── rapport.md
└── README.md
```

Le dossier `frontend/` contient l’application React.

Le dossier `data/` contient le fichier JSON local `mails-today.json`.

Le dossier `n8n/` contient les workflows n8n exportés.

Le dossier `docs/` contient les documents techniques du projet.

Le fichier `rapport.md` contient le rapport final du projet.

### 5.2 Initialisation du dépôt Git

Le projet a été versionné avec Git dès le début du développement.

L’objectif était de suivre progressivement les modifications apportées au projet et de garder une trace claire de chaque étape.

Les commandes principales utilisées sont :

```powershell
git init
git add .
git commit -m "Initialisation du projet"
```

Le projet a ensuite été relié à un dépôt GitHub afin de sauvegarder le travail en ligne et de faciliter le suivi du développement.

### 5.3 Création de l’application React

L’interface web a été créée avec React.

La commande utilisée pour créer le frontend est :

```powershell
npm create vite@latest frontend
```

Le framework choisi est React.

Après la création du projet, les dépendances ont été installées avec :

```powershell
cd frontend
npm install
```

Le serveur de développement React est lancé avec :

```powershell
npm run dev
```

L’application React est ensuite accessible dans le navigateur à l’adresse :

```text
http://localhost:5173
```

### 5.4 Installation de n8n

n8n a été installé localement sur Windows avec npm.

La commande utilisée est :

```powershell
npm install n8n -g
```

Après l’installation, n8n peut être lancé avec :

```powershell
n8n
```

L’interface n8n est ensuite accessible dans le navigateur à l’adresse :

```text
http://localhost:5678
```

n8n est utilisé pour automatiser les traitements liés aux e-mails, à Gmail, à Groq et à la sauvegarde locale des données.

### 5.5 Configuration du fichier `.env`

Un fichier `.env` a été créé dans le dossier `frontend/`.

Ce fichier contient les URLs des webhooks n8n utilisés par React.

Exemple :

```env
VITE_N8N_GET_MAILS_URL=http://localhost:5678/webhook/mails-today
VITE_N8N_REPLY_MANUAL_URL=http://localhost:5678/webhook/reply-manual
VITE_N8N_REPLY_AI_URL=http://localhost:5678/webhook/reply-ai
```

Ce fichier ne doit pas être envoyé sur GitHub, car il peut contenir des informations propres à l’environnement local.

Pour cela, il est ignoré avec le fichier `.gitignore`.

Un fichier `.env.example` a aussi été créé pour montrer les variables nécessaires sans exposer de données sensibles.

### 5.6 Configuration de Gmail

Pour connecter Gmail à n8n, un projet Google Cloud a été créé.

Les étapes principales ont été les suivantes :

1. Création d’un projet Google Cloud.
2. Activation de Gmail API.
3. Configuration de l’écran de consentement OAuth.
4. Ajout du compte Gmail de test comme utilisateur de test.
5. Création d’un identifiant OAuth de type application web.
6. Ajout de l’URL de redirection fournie par n8n.
7. Connexion du compte Gmail dans les credentials n8n.

Un compte Gmail de test a été utilisé afin d’éviter d’exposer ou de manipuler une boîte personnelle principale.

### 5.7 Configuration de Groq

Groq a été utilisé pour générer le résumé global des e-mails et les réponses automatiques.

Une clé API Groq a été créée dans la console Groq.

Cette clé a ensuite été enregistrée dans n8n à travers un credential de type `Groq account`.

La clé Groq n’a pas été placée dans React ni dans le dépôt GitHub.

Cela permet de garder la clé API protégée dans n8n.

### 5.8 Création des workflows n8n

Plusieurs workflows n8n ont été créés pour séparer les responsabilités.

Les principaux workflows sont :

```text
01-api-lire-mails-du-jour
02-api-envoyer-reponse-manuelle
03-api-generer-reponse-ia
```

Le workflow `01-api-lire-mails-du-jour` récupère les e-mails Gmail du jour, structure les données, génère le résumé global avec Groq, sauvegarde le fichier JSON et renvoie les données à React.

Le workflow `02-api-envoyer-reponse-manuelle` permet d’envoyer une réponse écrite par l’utilisateur depuis React.

Le workflow `03-api-generer-reponse-ia` permet de générer une proposition de réponse automatique avec Groq.

### 5.9 Création du fichier JSON local

Un dossier `data/` a été créé à la racine du projet.

Ce dossier contient le fichier :

```text
data/mails-today.json
```

Ce fichier est généré automatiquement par n8n.

Il contient les e-mails du jour, le résumé global et les informations structurées utilisées par l’interface React.

### 5.10 Lancement du projet

Pour utiliser le projet en local, il faut lancer n8n et React.

Dans un premier terminal, n8n est lancé avec :

```powershell
n8n
```

Dans un deuxième terminal, React est lancé avec :

```powershell
cd frontend
npm run dev
```

Ensuite, l’application est disponible à l’adresse :

```text
http://localhost:5173
```

n8n doit aussi être actif à l’adresse :

```text
http://localhost:5678
```

Les deux services doivent fonctionner en même temps pour que React puisse communiquer avec les workflows n8n.


## 6. Développement de l’interface React

L’interface React représente la partie visible de l’application. Elle permet à l’utilisateur de consulter les e-mails du jour, de lire leur contenu, d’obtenir un résumé global, de générer une réponse automatique et d’envoyer une réponse manuelle.

L’objectif était de créer une interface simple, moderne, claire et agréable à utiliser. L’application a donc été organisée avec des cartes, des boutons visibles, des couleurs douces et une disposition responsive.

### 6.1 Structure générale de l’interface

L’interface est organisée en plusieurs sections.

La première section est la zone de présentation. Elle contient le titre de l’application, une courte description du projet et les boutons principaux.

La deuxième section affiche le résumé global des e-mails reçus dans la journée. Ce résumé est généré par Groq à partir des e-mails récupérés par n8n.

La troisième section affiche la liste des e-mails sous forme de cartes. Chaque carte contient les informations principales du mail : l’expéditeur, l’objet, la date de réception, le résumé court et le statut.

Enfin, des sections supplémentaires apparaissent lorsque l’utilisateur clique sur certains boutons. Par exemple, la lecture complète d’un mail ou la zone de réponse s’affiche plus bas dans la page.

### 6.2 Affichage des e-mails

Les e-mails sont affichés sous forme de cartes pour faciliter la lecture.

Chaque carte contient :

```text
- l’expéditeur du mail ;
- l’objet du mail ;
- la date de réception ;
- un résumé court ;
- le statut du mail ;
- les boutons d’action.
````

Les boutons disponibles sur chaque mail sont :

```text
Lire tout le mail
Répondre
Réponse IA
```

Le bouton `Lire tout le mail` permet d’afficher le contenu complet du message.

Le bouton `Répondre` ouvre une zone de réponse manuelle.

Le bouton `Réponse IA` demande à Groq de générer une proposition de réponse.

### 6.3 Lecture complète d’un mail

Pour éviter de rendre les cartes trop longues, seul un résumé court est affiché directement dans la liste.

Lorsqu’un utilisateur souhaite consulter le message entier, il peut cliquer sur le bouton `Lire tout le mail`.

Une section dédiée s’affiche alors plus bas dans la page avec :

```text
- l’objet complet du mail ;
- l’expéditeur ;
- la date ;
- le statut ;
- le contenu complet du message.
```

Une bulle d’information a été ajoutée pour indiquer à l’utilisateur que le contenu s’affiche plus bas. Cela améliore l’ergonomie, car l’utilisateur comprend immédiatement qu’il doit descendre dans la page.

### 6.4 Résumé global des e-mails

Le résumé global est affiché dans une carte spéciale située au-dessus de la liste des mails.

Ce résumé est généré automatiquement par Groq à partir des messages reçus dans la journée.

Pour améliorer la lisibilité, le résumé est organisé avec des parties comme :

```text
Résumé général
Points importants
Actions à faire
```

Cela permet à l’utilisateur de comprendre rapidement les informations essentielles sans devoir lire tous les e-mails un par un.

### 6.5 Recherche des e-mails

Un champ de recherche a été ajouté afin de permettre à l’utilisateur de retrouver rapidement un e-mail.

La recherche fonctionne sur plusieurs informations :

```text
- l’expéditeur ;
- l’objet ;
- le résumé du mail.
```

Lorsque l’utilisateur saisit un mot, la liste des e-mails est automatiquement filtrée.

### 6.6 Filtrage par statut

L’interface permet aussi de filtrer les e-mails selon leur statut.

Trois filtres sont disponibles :

```text
Tous
Non répondus
Répondus
```

Le filtre `Tous` affiche l’ensemble des e-mails.

Le filtre `Non répondus` affiche uniquement les mails qui n’ont pas encore reçu de réponse.

Le filtre `Répondus` affiche uniquement les mails auxquels l’utilisateur a déjà répondu depuis l’interface.

Cette fonctionnalité permet de mieux suivre les messages déjà traités.

### 6.7 Réponse manuelle

L’utilisateur peut répondre manuellement à un mail en cliquant sur le bouton `Répondre`.

Une zone de réponse s’affiche alors plus bas dans la page. Elle contient les informations du mail sélectionné et un champ de texte dans lequel l’utilisateur peut écrire sa réponse.

Lorsque l’utilisateur clique sur `Envoyer la réponse`, React envoie les données à n8n. n8n utilise ensuite Gmail pour envoyer la réponse.

Après l’envoi, React affiche un message de confirmation et change le statut du mail en `répondu`.

### 6.8 Réponse automatique avec IA

Le bouton `Réponse IA` permet de demander à Groq de générer une proposition de réponse.

Le fonctionnement est le suivant :

```text
React envoie les informations du mail à n8n.
n8n prépare une consigne pour Groq.
Groq génère une proposition de réponse.
n8n renvoie cette réponse à React.
React place la réponse dans le champ de texte.
```

L’utilisateur peut ensuite modifier la réponse avant de l’envoyer.

Cette approche est importante, car l’intelligence artificielle ne doit pas envoyer automatiquement un e-mail sans validation humaine.

### 6.9 Actualisation des e-mails

Un bouton `Actualiser les e-mails` a été ajouté pour permettre à l’utilisateur de recharger les données sans rafraîchir toute la page.

Quand ce bouton est utilisé, React appelle le webhook n8n chargé de récupérer les e-mails du jour.

Après l’actualisation, l’application met à jour :

```text
- la liste des e-mails ;
- le résumé global ;
- les compteurs ;
- les filtres.
```

Un message de confirmation est affiché lorsque l’actualisation réussit.

### 6.10 Gestion des états de chargement

Pour rendre l’application plus claire, plusieurs états de chargement ont été ajoutés.

Par exemple :

```text
- pendant la récupération des e-mails, le bouton affiche Actualisation ;
- pendant la génération d’une réponse IA, le bouton affiche Génération ;
- pendant l’envoi d’une réponse, le bouton affiche Envoi.
```

Les boutons concernés sont désactivés pendant l’action en cours. Cela évite les doubles clics et les actions répétées accidentellement.

### 6.11 Gestion du cas aucun mail

L’interface gère aussi le cas où aucun e-mail n’a été reçu dans la journée.

Dans ce cas, React affiche un message clair indiquant qu’aucun e-mail ne correspond à l’affichage actuel.

Le résumé global indique aussi qu’aucun e-mail n’a été reçu et qu’aucune action n’est nécessaire pour le moment.

### 6.12 Responsive design

L’interface a été pensée pour être utilisable sur ordinateur et sur téléphone.

Les cartes, les boutons et les zones de texte s’adaptent à la taille de l’écran.

Sur mobile, les boutons peuvent passer à la ligne ou prendre toute la largeur disponible afin de rester faciles à utiliser.

### 6.13 Gestion locale du statut répondu

Dans la version actuelle, lorsqu’une réponse est envoyée avec succès, React met immédiatement le mail au statut `répondu`.

Pour éviter que ce statut soit perdu après une actualisation, les identifiants des mails répondus sont conservés localement dans le navigateur avec `localStorage`.

Ainsi, lorsqu’un utilisateur actualise les e-mails, React peut reconnaître les mails déjà répondus sur le même navigateur et leur réappliquer le statut `répondu`.


## 7. Automatisation avec n8n

n8n est utilisé comme moteur d’automatisation du projet. Il permet de relier l’interface React à Gmail, à Groq et au système de fichiers local.

L’utilisation de n8n permet de séparer la partie interface de la partie automatisation. Ainsi, React ne contient pas directement les identifiants Gmail ni la clé API Groq. Ces informations sensibles sont configurées dans les credentials de n8n.

L’énoncé demande de mettre en place un workflow n8n local capable de se connecter à Gmail, de récupérer les e-mails du jour, d’extraire les données importantes, de sauvegarder les données dans un fichier JSON, de générer un résumé global et de gérer l’envoi de réponses. :contentReference[oaicite:0]{index=0}

### 7.1 Organisation des workflows

Pour garder une architecture claire, plusieurs workflows n8n ont été créés.

Les principaux workflows sont :

```text
01-api-lire-mails-du-jour
02-api-envoyer-reponse-manuelle
03-api-generer-reponse-ia
````

Chaque workflow a une responsabilité précise.

Le workflow `01-api-lire-mails-du-jour` s’occupe de récupérer les e-mails Gmail reçus dans la journée, de les nettoyer, de générer un résumé global avec Groq, de sauvegarder les données dans un fichier JSON local et de renvoyer les données à React.

Le workflow `02-api-envoyer-reponse-manuelle` s’occupe d’envoyer une réponse écrite par l’utilisateur depuis l’interface React.

Le workflow `03-api-generer-reponse-ia` s’occupe de générer une proposition de réponse automatique avec Groq.

Cette séparation rend les workflows plus lisibles et plus faciles à maintenir.

### 7.2 Workflow 01 : lecture des mails du jour

Le workflow principal est :

```text
01-api-lire-mails-du-jour
```

Son rôle est de fournir à React les e-mails reçus dans la journée.

Il est déclenché par le webhook suivant :

```text
GET /webhook/mails-today
```

Ce workflow réalise plusieurs actions successives :

```text
Webhook
↓
Préparer la recherche du jour
↓
Récupérer les mails du jour
↓
Vérifier s’il y a des mails
↓
Y a-t-il des mails ?
├── False : Réponse aucun mail
└── True : Préparer les IDs des mails
↓
Lire le détail de chaque mail
↓
Structurer les données pour React
↓
Préparer la demande Groq
↓
Générer le résumé global
↓
Ajouter le résumé Groq au JSON
↓
Préparer le fichier JSON
↓
Sauvegarder mails-today.json
↓
Retourner le JSON final
↓
Respond to Webhook
```

Ce workflow est le plus important du projet, car il regroupe la récupération des e-mails, la transformation des données et la génération du résumé global.

### 7.3 Préparation de la recherche Gmail

Un premier nœud `Code in JavaScript` prépare la recherche Gmail du jour.

L’objectif est de récupérer uniquement les e-mails reçus entre le début et la fin de la journée.

La recherche Gmail produite ressemble à ceci :

```text
in:inbox after:2026/05/20 before:2026/05/21
```

Cette recherche permet d’éviter de récupérer tous les e-mails de la boîte Gmail. Elle limite le résultat aux messages reçus dans la journée.

### 7.4 Récupération des e-mails avec Gmail

Le nœud Gmail `Get many messages` récupère d’abord les messages correspondant à la recherche du jour.

Ensuite, un autre nœud Gmail `Get a message` récupère le détail complet de chaque e-mail.

Cette étape est nécessaire parce que la récupération de plusieurs messages ne fournit pas toujours tous les détails nécessaires. Il faut donc lire chaque mail individuellement pour obtenir les informations complètes.

Les informations utiles récupérées sont :

```text
- l’identifiant Gmail du message ;
- l’identifiant de conversation ;
- l’expéditeur ;
- l’objet ;
- la date de réception ;
- le résumé court ;
- le contenu complet ;
- les données techniques du mail.
```

### 7.5 Gestion du cas aucun mail

Un problème important a été traité : le cas où aucun e-mail n’est reçu dans la journée.

Sans cette vérification, le workflow pouvait continuer vers le nœud de lecture détaillée Gmail alors qu’aucun identifiant de mail n’était disponible. Cela provoquait une erreur de type `Invalid id value`.

Pour résoudre ce problème, un nœud vérifie le nombre de mails trouvés avec une valeur `mailCount`.

La logique utilisée est :

```text
Si mailCount > 0
→ continuer vers la lecture détaillée des mails

Si mailCount = 0
→ retourner directement une réponse vide à React
```

Quand aucun mail n’est reçu, le workflow renvoie une réponse de ce type :

```json
{
  "date": "2026-05-20",
  "resumeGlobal": "Aucun e-mail reçu aujourd’hui. Vous n’avez aucune action à traiter pour le moment.",
  "mails": []
}
```

Cette gestion permet d’éviter les erreurs et d’améliorer la robustesse du projet.

### 7.6 Structuration des données pour React

Après la récupération des e-mails, un nœud `Code in JavaScript` transforme les données Gmail en un format simple à utiliser dans React.

Gmail renvoie parfois les mails dans des formats complexes, surtout lorsque les messages sont en HTML. Certains messages contiennent des balises HTML, des caractères invisibles ou des entités comme `&zwnj;`.

Le nœud de structuration nettoie les données et produit un objet JSON simple.

Chaque mail est transformé dans ce format :

```json
{
  "id": 1,
  "messageId": "identifiant-gmail",
  "threadId": "identifiant-conversation",
  "expediteur": "Nom <adresse@email.com>",
  "objet": "Objet du message",
  "dateReception": "20/05/2026 14:03:09",
  "resume": "Résumé court du message",
  "contenu": "Contenu complet du message",
  "statut": "non répondu"
}
```

Cette étape est essentielle, car elle permet à React de travailler avec des données simples et propres.

### 7.7 Nettoyage du contenu HTML

Certains e-mails Gmail sont reçus sous forme de contenu HTML. Cela signifie qu’ils contiennent des balises comme :

```html
<table>
<div>
<p>
<a>
```

Le workflow nettoie ce contenu pour extraire un texte lisible.

Le nettoyage permet notamment de :

```text
- supprimer les balises HTML ;
- supprimer les styles et scripts ;
- décoder les entités HTML ;
- enlever les caractères invisibles ;
- retirer les répétitions inutiles ;
- conserver le texte important du message.
```

Ce nettoyage a été nécessaire, car certains messages automatiques contenaient beaucoup de contenu technique avant d’arriver au vrai texte lisible.

### 7.8 Génération du résumé global avec Groq

Après la structuration des mails, n8n prépare une demande destinée à Groq.

Cette demande contient les informations principales de tous les e-mails récupérés.

Groq reçoit une consigne demandant de produire un résumé global clair, structuré et en français.

Le résumé demandé suit une structure simple :

```text
Résumé général :
...

Points importants :
- ...

Actions à faire :
- ...
```

Cette structure facilite l’affichage dans React et rend le résumé plus lisible pour l’utilisateur.

### 7.9 Sauvegarde du fichier JSON local

Après la génération du résumé global, n8n sauvegarde les données finales dans un fichier local :

```text
data/mails-today.json
```

Le fichier contient :

```text
- la date ;
- le résumé global ;
- la liste des e-mails structurés.
```
 

### 7.10 Workflow 02 : envoi d’une réponse manuelle

Le deuxième workflow est :

```text
02-api-envoyer-reponse-manuelle
```

Il est déclenché par le webhook suivant :

```text
POST /webhook/reply-manual
```

Ce workflow reçoit depuis React :

```text
messageId
message
```

Le `messageId` identifie l’e-mail Gmail auquel il faut répondre.

Le champ `message` contient la réponse écrite par l’utilisateur.

Le workflow vérifie d’abord que ces données sont présentes, puis utilise le nœud Gmail pour envoyer la réponse.

Le flux est le suivant :

```text
Webhook
↓
Vérifier les données reçues
↓
Envoyer la réponse Gmail
↓
Préparer la réponse finale
↓
Respond to Webhook
```

Après l’envoi, n8n renvoie à React une réponse de confirmation :

```json
{
  "success": true,
  "message": "Réponse envoyée avec succès par Gmail.",
  "statut": "répondu"
}
```

React utilise ensuite cette information pour mettre à jour l’interface.

### 7.11 Workflow 03 : génération d’une réponse IA

Le troisième workflow est :

```text
03-api-generer-reponse-ia
```

Il est déclenché par le webhook suivant :

```text
POST /webhook/reply-ai
```

Ce workflow reçoit depuis React :

```text
expediteur
objet
contenu
```

n8n utilise ces informations pour préparer une consigne destinée à Groq.

Groq génère ensuite une proposition de réponse.

Le flux est le suivant :

```text
Webhook
↓
Vérifier les données reçues
↓
Préparer la demande Groq
↓
Générer la réponse IA
↓
Préparer la réponse finale
↓
Respond to Webhook
```

Le résultat renvoyé à React contient une réponse proposée :

```json
{
  "success": true,
  "reply": "Bonjour, merci pour votre message...",
  "message": "Réponse IA générée avec succès."
}
```

React place ensuite cette réponse dans le champ de texte. L’utilisateur peut la modifier avant de l’envoyer.

### 7.12 Publication des workflows

Dans la version utilisée de n8n, les workflows ne sont pas simplement activés avec un bouton `Active`. Ils sont publiés avec l’option :

```text
Publish workflow
```

À chaque grande modification, une nouvelle version a été publiée avec un nom clair.

Exemples de noms de publication :

```text
Ajout du résumé global avec Groq
Gestion du cas aucun mail reçu
Ajout de l’envoi des réponses manuelles
Génération de réponse IA avec Groq
Sauvegarde locale des mails du jour
```

Cette méthode permet de garder un historique des évolutions du workflow.

### 7.13 Export des workflows

Les workflows ont été exportés au format `.json` et placés dans le dossier :

```text
n8n/
```

Les fichiers principaux sont :

```text
n8n/01-api-lire-mails-du-jour.json
n8n/02-api-envoyer-reponse-manuelle.json
n8n/03-api-generer-reponse-ia.json
```


## 8. Intégration de Gmail

Gmail est le service de messagerie utilisé dans ce projet. Il permet à l’application de récupérer les e-mails reçus dans la journée et d’envoyer des réponses depuis l’interface React.

L’intégration de Gmail est réalisée dans n8n. React ne se connecte donc jamais directement à Gmail. Cette organisation est importante pour éviter d’exposer les identifiants ou les autorisations Gmail dans le code frontend.

L’énoncé demande que le workflow n8n soit capable de se connecter à une boîte Gmail, de récupérer les e-mails du jour, d’extraire l’expéditeur, l’objet, le contenu et la date de réception, puis de gérer l’envoi de réponses. :contentReference[oaicite:0]{index=0}

### 8.1 Utilisation d’un compte Gmail de test

Pour réaliser le projet, un compte Gmail de test a été utilisé.

Ce choix permet d’éviter de manipuler une boîte Gmail personnelle principale. Il permet aussi de faire des essais plus librement, comme envoyer des messages de test, générer des réponses ou vérifier les workflows n8n.

L’utilisation d’un compte Gmail de test est également recommandée dans l’énoncé du projet. :contentReference[oaicite:1]{index=1}

### 8.2 Configuration de Google Cloud

Pour permettre à n8n de se connecter à Gmail, une configuration OAuth a été réalisée dans Google Cloud.

Les étapes principales ont été les suivantes :

```text
1. Création d’un projet Google Cloud.
2. Activation de Gmail API.
3. Configuration de l’écran de consentement OAuth.
4. Ajout du compte Gmail de test comme utilisateur de test.
5. Création d’un OAuth Client ID de type application web.
6. Ajout de l’URL de redirection fournie par n8n.
7. Récupération du Client ID et du Client Secret.
````

Cette configuration permet à n8n de demander l’autorisation d’accéder au compte Gmail de test.

### 8.3 Création du credential Gmail dans n8n

Après la configuration Google Cloud, un credential Gmail a été créé dans n8n.

Ce credential contient les informations nécessaires pour connecter n8n au compte Gmail de test.

Il permet aux nœuds Gmail de n8n de réaliser plusieurs actions :

```text
- récupérer les messages ;
- lire le détail d’un message ;
- répondre à un message ;
- envoyer une réponse via Gmail.
```

Les informations sensibles comme le Client ID, le Client Secret et les autorisations OAuth sont conservées dans n8n. Elles ne sont pas écrites dans le code React.

### 8.4 Récupération des e-mails du jour

La récupération des e-mails est faite dans le workflow :

```text
01-api-lire-mails-du-jour
```

Le workflow prépare une recherche Gmail basée sur la date du jour.

Exemple de recherche :

```text
in:inbox after:2026/05/20 before:2026/05/21
```

Cette recherche signifie que Gmail doit retourner les messages présents dans la boîte de réception et reçus pendant la journée concernée.

Cette étape permet de ne pas récupérer toute la boîte mail, mais seulement les e-mails utiles pour l’application.

### 8.5 Récupération des détails de chaque e-mail

Dans n8n, la récupération initiale des e-mails ne donne pas toujours toutes les informations nécessaires.

Pour cette raison, le workflow utilise deux étapes :

```text
Get many messages
↓
Get a message
```

Le premier nœud récupère la liste des e-mails du jour.

Le deuxième nœud lit le détail complet de chaque message à partir de son identifiant Gmail.

Cette étape a été importante, car certaines informations comme l’expéditeur, le contenu complet ou les en-têtes du message ne sont pas toujours disponibles dans la première récupération.

### 8.6 Extraction des informations importantes

Après la récupération des détails, n8n extrait les informations nécessaires pour React.

Les informations extraites sont :

```text
- l’identifiant du message Gmail ;
- l’identifiant de conversation ;
- l’expéditeur ;
- l’objet ;
- la date de réception ;
- le résumé court ;
- le contenu complet ;
- le statut du mail.
```

Le résultat final est structuré sous forme de JSON afin d’être facilement exploitable par React.

Exemple de structure :

```json
{
  "id": 1,
  "messageId": "19e457ba27d6dd92",
  "threadId": "19e457ba27d6dd92",
  "expediteur": "Google <no-reply@google.com>",
  "objet": "Alerte de sécurité",
  "dateReception": "20/05/2026 14:03:09",
  "resume": "Résumé court du message",
  "contenu": "Contenu complet du message",
  "statut": "non répondu"
}
```

### 8.7 Nettoyage des contenus Gmail

Un point important du projet a été le nettoyage des contenus Gmail.

Certains e-mails ne sont pas envoyés sous forme de texte simple. Ils sont souvent envoyés en HTML avec beaucoup de balises techniques comme :

```html
<table>
<div>
<p>
<a>
<style>
```

Le workflow n8n contient donc un script chargé de transformer ces contenus HTML en texte lisible.

Ce nettoyage permet de :

```text
- supprimer les balises HTML ;
- retirer les styles et scripts ;
- décoder les entités HTML ;
- supprimer les caractères invisibles ;
- enlever les répétitions inutiles ;
- conserver uniquement le contenu utile.
```

Ce travail était nécessaire, car certains messages Gmail contenaient beaucoup d’éléments invisibles ou techniques, par exemple des entités comme `&zwnj;`, qui rendaient le texte difficile à lire.

### 8.8 Gestion du cas où aucun e-mail n’est reçu

Le workflow gère aussi le cas où aucun e-mail n’est reçu dans la journée.

Sans cette vérification, n8n pouvait essayer de lire le détail d’un message alors qu’aucun identifiant Gmail n’existait. Cela provoquait une erreur.

La solution mise en place consiste à compter le nombre de mails trouvés avec une valeur appelée `mailCount`.

La logique est la suivante :

```text
Si mailCount > 0 :
le workflow continue vers la lecture détaillée des mails.

Si mailCount = 0 :
le workflow renvoie directement une réponse vide à React.
```

Dans ce cas, React reçoit un JSON de ce type :

```json
{
  "date": "2026-05-20",
  "resumeGlobal": "Aucun e-mail reçu aujourd’hui. Vous n’avez aucune action à traiter pour le moment.",
  "mails": []
}
```

Cette gestion rend l’application plus robuste et évite les erreurs lors des journées sans nouveaux messages.

### 8.9 Envoi d’une réponse avec Gmail

L’envoi des réponses est géré dans le workflow :

```text
02-api-envoyer-reponse-manuelle
```

Lorsque l’utilisateur écrit une réponse dans React et clique sur le bouton d’envoi, React transmet à n8n :

```text
messageId
message
```

Le `messageId` permet à Gmail de savoir à quel e-mail il faut répondre.

Le champ `message` contient la réponse écrite par l’utilisateur.

n8n utilise ensuite un nœud Gmail pour répondre au message.

Le flux est le suivant :

```text
React envoie la réponse
↓
n8n vérifie les données reçues
↓
n8n utilise Gmail pour répondre au message
↓
n8n renvoie une confirmation à React
```

Après l’envoi, React affiche un message de succès et change le statut du mail en `répondu`.

### 8.10 Sécurité de l’intégration Gmail

L’intégration Gmail a été faite de manière à éviter l’exposition des informations sensibles.

Les éléments sensibles comme les credentials Gmail, le Client ID, le Client Secret et les autorisations OAuth sont configurés dans n8n.

Ils ne sont pas placés dans :

```text
- le code React ;
- le fichier README ;
- le fichier rapport.md ;
- le dépôt GitHub ;
- le fichier .env.example.
```

Cette organisation respecte l’exigence de sécurité de l’énoncé, qui demande de ne pas stocker les identifiants en clair dans le code. 


## 9. Intégration de Groq pour l’intelligence artificielle

Groq est utilisé dans ce projet pour ajouter des fonctionnalités d’intelligence artificielle. Il intervient principalement à deux niveaux : la génération du résumé global des e-mails du jour et la génération d’une proposition de réponse automatique.

L’énoncé recommande l’utilisation d’un modèle IA gratuit via Groq ou un équivalent pour les réponses automatiques. :contentReference[oaicite:0]{index=0}

### 9.1 Rôle de Groq dans le projet

Groq permet de transformer les données extraites depuis Gmail en texte utile pour l’utilisateur.

Dans ce projet, Groq est utilisé pour :

```text
- générer un résumé global des e-mails reçus dans la journée ;
- identifier les points importants ;
- indiquer les actions à faire ;
- proposer une réponse automatique à un e-mail sélectionné.
````

L’objectif n’est pas de remplacer totalement l’utilisateur, mais de l’aider à comprendre rapidement ses e-mails et à préparer des réponses plus vite.

### 9.2 Configuration du compte Groq

Un compte Groq a été créé afin d’obtenir une clé API.

Cette clé API a été enregistrée dans n8n avec un credential de type :

```text
Groq account
```

La clé n’a pas été placée dans React, ni dans le fichier `.env`, ni dans le dépôt GitHub.

Cette organisation permet de protéger la clé API et de centraliser les appels à Groq dans n8n.

### 9.3 Utilisation de Groq dans n8n

Groq est utilisé dans n8n à travers un nœud de modèle de discussion.

Le workflow utilise principalement :

```text
Basic LLM Chain
+
Groq Chat Model
```

Le nœud `Basic LLM Chain` reçoit une consigne, appelée prompt, puis transmet cette consigne au modèle Groq.

Le nœud `Groq Chat Model` contient le modèle IA utilisé pour générer le texte.

Cette organisation permet à n8n de préparer les données, de les envoyer à Groq, puis de récupérer la réponse générée.

### 9.4 Génération du résumé global des e-mails

Le résumé global est généré dans le workflow :

```text
01-api-lire-mails-du-jour
```

Après la récupération et la structuration des e-mails, n8n prépare une consigne pour Groq.

Cette consigne contient les informations importantes de chaque e-mail :

```text
- l’expéditeur ;
- l’objet ;
- la date de réception ;
- le résumé court ;
- le contenu du message.
```

Groq reçoit ensuite ces informations et produit un résumé global en français.

Le résumé est demandé avec une structure claire :

```text
Résumé général :
...

Points importants :
- ...

Actions à faire :
- ...
```

Cette structure permet à React d’afficher le résumé de manière plus lisible.

### 9.5 Préparation du prompt pour le résumé global

Le prompt envoyé à Groq est préparé dans un nœud `Code in JavaScript`.

L’objectif du prompt est de donner à l’IA des consignes précises afin d’éviter une réponse trop longue ou mal structurée.

Les consignes données à Groq sont notamment :

```text
- répondre uniquement en français ;
- utiliser un langage simple et professionnel ;
- résumer les informations importantes ;
- mentionner les actions à faire ;
- signaler les éléments importants ou urgents ;
- éviter de répéter tous les détails inutiles ;
- ne pas produire de code.
```

Cette étape est importante, car la qualité du résumé dépend beaucoup de la clarté du prompt.

### 9.6 Intégration du résumé dans le JSON final

Après la génération du résumé, n8n récupère la réponse de Groq et l’ajoute au JSON final envoyé à React.

Le JSON final contient alors :

```json
{
  "date": "2026-05-20",
  "resumeGlobal": "Résumé généré par Groq.",
  "mails": []
}
```

Le champ `resumeGlobal` est donc remplacé par un texte généré par l’intelligence artificielle.

React affiche ensuite ce résumé dans la section `Résumé global de la journée`.

### 9.7 Génération d’une réponse automatique

Groq est aussi utilisé dans le workflow :

```text
03-api-generer-reponse-ia
```

Ce workflow est appelé lorsque l’utilisateur clique sur le bouton :

```text
Réponse IA
```

React envoie alors à n8n les informations du mail sélectionné :

```text
- l’expéditeur ;
- l’objet ;
- le contenu du mail.
```

n8n prépare ensuite une consigne pour Groq afin de générer une proposition de réponse.

### 9.8 Principe de validation humaine

La réponse générée par Groq n’est pas envoyée automatiquement.

Elle est d’abord affichée dans la zone de réponse de React. L’utilisateur peut la lire, la corriger, la compléter ou la supprimer avant de l’envoyer.

Ce choix est important pour éviter qu’une réponse incorrecte soit envoyée sans contrôle.

Le fonctionnement est donc :

```text
Groq propose une réponse
↓
React affiche la réponse
↓
L’utilisateur vérifie et modifie si nécessaire
↓
L’utilisateur clique sur Envoyer la réponse
↓
n8n envoie le mail via Gmail
```

Cette approche rend l’utilisation de l’intelligence artificielle plus sûre.

### 9.9 Sécurité de la clé Groq

La clé API Groq est stockée uniquement dans les credentials n8n.

Elle n’est pas présente dans :

```text
- le code React ;
- le dépôt GitHub ;
- le fichier rapport.md ;
- le fichier README.md ;
- le fichier .env.example.
```

Cette règle respecte l’exigence de sécurité du projet, qui demande de ne pas stocker les identifiants en clair dans le code. 

### 9.10 Limites de l’utilisation de Groq

L’utilisation de Groq présente quelques limites.

La qualité du résumé ou de la réponse dépend de la qualité du contenu extrait depuis Gmail. Si un e-mail contient beaucoup de texte inutile ou mal formaté, l’IA peut produire un résumé moins précis.

De plus, une réponse générée automatiquement peut parfois manquer de contexte. C’est pour cela que l’utilisateur doit toujours relire la réponse avant de l’envoyer.

Enfin, le fonctionnement dépend aussi de la disponibilité du service Groq et de la validité de la clé API utilisée.


## 10. Gestion des réponses aux e-mails

La gestion des réponses aux e-mails est une fonctionnalité centrale du projet. L’application permet à l’utilisateur de répondre à un message directement depuis l’interface React, sans ouvrir Gmail manuellement.

Deux modes de réponse ont été mis en place :

```text
- la réponse manuelle ;
- la réponse générée par intelligence artificielle.
````

L’énoncé demande que l’utilisateur puisse répondre aux e-mails depuis l’interface, soit manuellement, soit à l’aide d’une réponse automatique proposée par l’intelligence artificielle. 

### 10.1 Réponse manuelle

La réponse manuelle permet à l’utilisateur d’écrire lui-même le contenu du message à envoyer.

Dans l’interface React, chaque carte d’e-mail contient un bouton :

```text
Répondre
```

Lorsque l’utilisateur clique sur ce bouton, une zone de réponse s’affiche plus bas dans la page. Cette zone contient :

```text
- les informations du mail sélectionné ;
- le contenu du message reçu ;
- un champ de texte pour écrire la réponse ;
- un bouton pour envoyer la réponse.
```

L’utilisateur peut donc lire le message reçu, rédiger sa réponse, puis l’envoyer directement depuis l’application.

### 10.2 Envoi de la réponse avec n8n

L’envoi réel de la réponse n’est pas fait directement par React.

React envoie les données au workflow n8n :

```text
02-api-envoyer-reponse-manuelle
```

Ce workflow est déclenché par le webhook :

```text
POST /webhook/reply-manual
```

React envoie deux informations principales :

```text
messageId
message
```

Le champ `messageId` correspond à l’identifiant Gmail du message original.

Le champ `message` correspond au texte écrit par l’utilisateur.

Le workflow n8n vérifie d’abord que ces informations sont présentes. Ensuite, il utilise Gmail pour répondre au message original.

Le flux est le suivant :

```text
Utilisateur écrit une réponse
↓
React envoie la réponse à n8n
↓
n8n vérifie les données reçues
↓
n8n utilise Gmail pour répondre au message
↓
n8n renvoie une confirmation à React
↓
React affiche le succès de l’envoi
```

### 10.3 Réponse générée par intelligence artificielle

La deuxième possibilité est la génération d’une réponse automatique avec Groq.

Dans l’interface, chaque mail contient un bouton :

```text
Réponse IA
```

Lorsque l’utilisateur clique sur ce bouton, React envoie les informations du mail sélectionné au workflow n8n :

```text
03-api-generer-reponse-ia
```

Ce workflow est déclenché par le webhook :

```text
POST /webhook/reply-ai
```

React envoie à n8n :

```text
- l’expéditeur ;
- l’objet ;
- le contenu du mail.
```

n8n prépare ensuite une consigne claire pour Groq afin de générer une proposition de réponse adaptée au mail reçu.

### 10.4 Validation avant envoi

La réponse générée par Groq n’est pas envoyée automatiquement.

Elle est d’abord affichée dans la zone de réponse de React. L’utilisateur peut alors :

```text
- lire la réponse proposée ;
- la modifier ;
- la compléter ;
- la supprimer ;
- l’envoyer seulement s’il est satisfait.
```

Cette validation humaine est importante, car une intelligence artificielle peut parfois produire une réponse incomplète ou mal adaptée au contexte.

Le principe retenu est donc :

```text
L’IA propose.
L’utilisateur vérifie.
L’utilisateur décide d’envoyer.
```

### 10.5 Statut des e-mails

Chaque e-mail possède un statut affiché dans l’interface.

Au chargement initial, les mails sont considérés comme :

```text
non répondu
```

Lorsqu’une réponse est envoyée avec succès, React met immédiatement le statut du mail à :

```text
répondu
```

Cela permet à l’utilisateur de distinguer rapidement les mails déjà traités des mails restant à traiter.

Pour conserver ce statut même après une actualisation de l’interface, les identifiants des mails répondus sont conservés localement dans le navigateur avec `localStorage`.

Ainsi, lorsqu’un utilisateur actualise les e-mails, React peut reconnaître les messages déjà répondus sur le même navigateur et leur réappliquer le statut `répondu`.

### 10.6 Filtres liés aux réponses

L’interface contient aussi des filtres permettant d’afficher les mails selon leur statut.

Les filtres disponibles sont :

```text
Tous
Non répondus
Répondus
```

Le filtre `Tous` affiche tous les e-mails.

Le filtre `Non répondus` affiche uniquement les mails qui n’ont pas encore reçu de réponse.

Le filtre `Répondus` affiche uniquement les mails auxquels l’utilisateur a déjà répondu.

Cette fonctionnalité rend le suivi des réponses plus simple et plus lisible.

### 10.7 États de chargement pendant les actions

Pour éviter les doubles clics et rendre l’interface plus claire, des états de chargement ont été ajoutés.

Pendant la génération d’une réponse IA, le bouton affiche :

```text
Génération...
```

Pendant l’envoi d’une réponse, le bouton affiche :

```text
Envoi...
```

Les boutons sont désactivés pendant ces traitements. Cela évite que l’utilisateur lance plusieurs fois la même action.

### 10.8 Messages de retour utilisateur

Après chaque action, React affiche un message clair à l’utilisateur.

Exemples :

```text
Réponse IA générée avec succès.
Réponse envoyée avec succès par Gmail.
Impossible de générer une réponse IA pour le moment.
Impossible d’envoyer la réponse pour le moment.
```

Ces messages permettent à l’utilisateur de comprendre ce qui se passe dans l’application.

### 10.9 Sécurité de l’envoi

L’envoi des réponses passe toujours par n8n.

React ne possède pas directement les identifiants Gmail. Il envoie seulement les informations nécessaires au webhook n8n.

Cette organisation permet de protéger les accès Gmail et d’éviter d’exposer les credentials dans le frontend.

### 10.10 Limite de la gestion actuelle des statuts

Dans la version actuelle, le statut `répondu` est conservé localement dans le navigateur avec `localStorage`.

Cela signifie que le statut est conservé sur le même navigateur et le même ordinateur.

Cependant, si l’utilisateur change de navigateur ou d’ordinateur, ce statut local ne sera pas disponible.

Une amélioration possible serait d’enregistrer ce statut dans une base de données ou d’utiliser un label Gmail pour marquer durablement les mails déjà répondus.


## 11. Sauvegarde locale des données JSON

La sauvegarde locale des données fait partie des exigences du projet. L’énoncé demande que les e-mails traités soient sauvegardés dans un fichier JSON local nommé `mails-today.json`. :contentReference[oaicite:0]{index=0}

Dans ce projet, cette sauvegarde est réalisée directement dans le workflow n8n principal :

```text
01-api-lire-mails-du-jour
````

### 11.1 Objectif de la sauvegarde JSON

L’objectif de cette sauvegarde est de conserver une trace structurée des e-mails récupérés dans la journée.

Le fichier JSON contient :

```text
- la date du traitement ;
- le résumé global généré par Groq ;
- la liste des e-mails récupérés ;
- les informations importantes de chaque e-mail.
```

Cette sauvegarde permet aussi de vérifier plus facilement les données produites par n8n, même sans passer par l’interface React.

### 11.2 Emplacement du fichier

Le fichier est sauvegardé dans le dossier :

```text
data/
```

Le chemin du fichier est :

```text
data/mails-today.json
```

La structure du projet contient donc :

```text
assistant-mails-stage/
├── data/
│   └── mails-today.json
├── frontend/
├── n8n/
├── docs/
└── rapport.md
```

### 11.3 Contenu du fichier JSON

Le fichier `mails-today.json` contient les données finales après récupération, nettoyage et résumé.

Sa structure générale est la suivante :

```json
{
  "date": "2026-05-20",
  "resumeGlobal": "Résumé global généré par l'intelligence artificielle.",
  "mails": [
    {
      "id": 1,
      "messageId": "identifiant-gmail",
      "threadId": "identifiant-conversation",
      "expediteur": "Nom <adresse@email.com>",
      "objet": "Objet du message",
      "dateReception": "20/05/2026 14:03:09",
      "resume": "Résumé court du message",
      "contenu": "Contenu complet du message",
      "statut": "non répondu"
    }
  ]
}
```

Chaque e-mail est donc représenté par un objet JSON simple et lisible.

### 11.4 Génération du fichier dans n8n

La sauvegarde est faite à la fin du workflow de lecture des e-mails.

Après la génération du résumé global avec Groq, n8n prépare le JSON final.

Ensuite, le workflow réalise les étapes suivantes :

```text
Préparer le fichier JSON
↓
Convertir en fichier JSON
↓
Sauvegarder mails-today.json
↓
Retourner le JSON final
↓
Respond to Webhook
```

Le nœud `Préparer le fichier JSON` transforme les données finales en texte JSON bien formaté.

Le nœud `Convertir en fichier JSON` convertit ce texte en fichier.

Le nœud `Sauvegarder mails-today.json` écrit le fichier sur le disque local.

### 11.5 Remplacement du fichier à chaque actualisation

Le fichier `mails-today.json` est remplacé à chaque nouvelle actualisation.

Cela signifie que le fichier contient toujours les dernières données récupérées pour la journée.

Ce choix évite d’accumuler plusieurs versions inutiles du même fichier.

La logique retenue est donc :

```text
Nouvelle récupération des mails
↓
Nouveau résumé global
↓
Nouveau fichier mails-today.json
↓
Ancien fichier remplacé
```

### 11.6 Cas où aucun e-mail n’est reçu

La sauvegarde fonctionne aussi lorsqu’aucun e-mail n’est reçu dans la journée.

Dans ce cas, le fichier contient une liste vide :

```json
{
  "date": "2026-05-20",
  "resumeGlobal": "Aucun e-mail reçu aujourd’hui. Vous n’avez aucune action à traiter pour le moment.",
  "mails": []
}
```

Cette gestion permet d’éviter les erreurs et garantit que le fichier JSON est toujours généré, même lorsqu’il n’y a aucun message.

### 11.7 Utilité du fichier JSON

Le fichier JSON local est utile pour plusieurs raisons.

Il permet d’abord de vérifier les données produites par n8n. En ouvrant le fichier, on peut voir directement si les e-mails sont bien récupérés, nettoyés et structurés.

Il peut aussi servir de trace locale du traitement effectué dans la journée.

Enfin, il montre que le workflow n8n ne se limite pas à envoyer les données à React, mais qu’il produit aussi un fichier exploitable séparément.

### 11.8 Limite de la sauvegarde locale

La sauvegarde locale fonctionne correctement dans le contexte du projet, car n8n est exécuté localement sur l’ordinateur.

Cependant, cette solution dépend du chemin local du fichier. Si le projet est déplacé sur un autre ordinateur, il faut adapter le chemin utilisé dans le nœud d’écriture du fichier.

Dans une version plus avancée, il serait possible de sauvegarder ces données dans une base de données ou dans un stockage distant.


## 12. Sécurité des clés et identifiants

La sécurité des clés et des identifiants est un point important du projet. L’application utilise plusieurs services externes, notamment Gmail et Groq. Ces services nécessitent des identifiants, des clés API ou des autorisations OAuth.

L’objectif est d’éviter que ces informations sensibles soient visibles dans le code source ou envoyées sur GitHub.

L’énoncé demande de ne pas stocker les identifiants en clair dans le code. Cette exigence a donc été prise en compte dans l’architecture du projet.

### 12.1 Séparation entre React et les services sensibles

React est uniquement utilisé pour l’interface utilisateur.

Il ne se connecte pas directement à Gmail.

Il ne se connecte pas directement à Groq.

Il communique seulement avec n8n à travers des URLs de webhooks.

Cette organisation permet d’éviter de placer les clés API ou les identifiants Gmail dans le frontend.

La logique est donc la suivante :

```text
React
↓
n8n
↓
Gmail / Groq
````

React envoie une demande à n8n, puis n8n se charge d’appeler les services externes.

### 12.2 Protection des credentials Gmail

La connexion à Gmail est configurée directement dans n8n.

Les informations sensibles liées à Gmail sont notamment :

```text
- le Client ID Google ;
- le Client Secret Google ;
- les autorisations OAuth ;
- le compte Gmail connecté.
```

Ces informations sont stockées dans les credentials n8n.

Elles ne sont pas écrites dans :

```text
- le code React ;
- le fichier rapport.md ;
- le fichier README.md ;
- le fichier .env.example ;
- les fichiers exportés du projet.
```

Cette méthode protège l’accès au compte Gmail utilisé pour le projet.

### 12.3 Protection de la clé API Groq

La clé API Groq est également stockée dans n8n.

Elle est configurée dans un credential de type :

```text
Groq account
```

La clé n’est jamais placée directement dans le code React.

Elle n’est pas non plus écrite dans le dépôt GitHub.

Cela permet à n8n d’utiliser Groq sans exposer la clé API dans l’application frontend.

### 12.4 Utilisation du fichier `.env`

Le fichier `.env` est utilisé dans le dossier `frontend/`.

Il contient seulement les URLs locales des webhooks n8n.

Exemple :

```env
VITE_N8N_GET_MAILS_URL=http://localhost:5678/webhook/mails-today
VITE_N8N_REPLY_MANUAL_URL=http://localhost:5678/webhook/reply-manual
VITE_N8N_REPLY_AI_URL=http://localhost:5678/webhook/reply-ai
```

Même si ces URLs ne sont pas aussi sensibles qu’une clé API, elles dépendent de l’environnement local. Pour cette raison, le fichier `.env` n’est pas envoyé sur GitHub.

Un fichier `.env.example` est utilisé pour montrer les variables nécessaires sans fournir de vraies valeurs sensibles.

### 12.5 Rôle du fichier `.gitignore`

Le fichier `.gitignore` permet d’empêcher certains fichiers d’être envoyés sur GitHub.

Il doit contenir notamment :

```text
.env
node_modules/
dist/
```

Le dossier `node_modules/` n’est pas envoyé sur GitHub, car il contient les dépendances installées localement.

Le fichier `.env` n’est pas envoyé, car il contient la configuration locale du projet.

Le dossier `dist/` n’est pas envoyé, car il peut être régénéré à partir du code source.

### 12.6 Vérification avant les commits

Avant chaque commit important, une vérification est faite avec la commande :

```powershell
git status
```

Cette commande permet de voir les fichiers qui vont être ajoutés au dépôt.

Avant d’envoyer le projet sur GitHub, il est important de vérifier que les fichiers sensibles ne sont pas présents dans la liste.

Il est aussi utile de faire une recherche dans VS Code pour vérifier qu’aucune clé API n’est visible.

Exemples de recherches :

```text
gsk_
client_secret
Bearer
```

Si une vraie clé apparaît dans le projet, elle doit être supprimée avant le commit.

### 12.7 Sécurité des exports n8n

Les workflows n8n sont exportés dans le dossier :

```text
n8n/
```

Ces fichiers servent à livrer les workflows du projet.

Avant de les envoyer sur GitHub, il faut vérifier qu’ils ne contiennent pas de vraie clé API ou de secret Google.

Normalement, n8n exporte les références aux credentials et non les secrets eux-mêmes. Cependant, une vérification manuelle reste nécessaire.

### 12.8 Limites de la sécurité actuelle

La sécurité mise en place est adaptée à un projet local de stage.

Cependant, l’application fonctionne en local et ne possède pas encore un système complet d’authentification utilisateur.

Dans une version professionnelle, il faudrait ajouter :

```text
- une authentification utilisateur ;
- une gestion des rôles ;
- un serveur backend sécurisé ;
- une base de données ;
- une gestion plus avancée des permissions ;
- un hébergement sécurisé de n8n.
```

Malgré ces limites, les principales clés et identifiants sensibles sont protégés dans cette version du projet.


## 13. Difficultés rencontrées et solutions apportées

Pendant la réalisation du projet, plusieurs difficultés ont été rencontrées. Ces difficultés concernaient principalement la récupération des e-mails Gmail, le nettoyage des contenus, la communication entre React et n8n, la génération du résumé avec Groq et la gestion des cas particuliers.

Cette partie présente les principaux problèmes rencontrés et les solutions mises en place.

### 13.1 Connexion entre React et n8n

Au début du projet, il fallait vérifier que l’interface React pouvait bien communiquer avec n8n.

Le problème était de s’assurer que React pouvait appeler un webhook n8n et recevoir une réponse JSON.

Pour résoudre cela, un workflow de test a été créé avec un webhook simple. Ce workflow renvoyait une réponse comme :

```json
{
  "success": true,
  "message": "Connexion réussie entre React et n8n"
}
````

Cette étape a permis de valider la communication avant d’ajouter Gmail et Groq.

### 13.2 Différence entre URL de test et URL de production

Une difficulté a été rencontrée avec les URLs des webhooks n8n.

n8n fournit souvent deux types d’URLs :

```text
Test URL
Production URL
```

La Test URL fonctionne seulement lorsque le workflow est exécuté en mode test.

La Production URL fonctionne lorsque le workflow est publié.

Dans le projet, React doit utiliser uniquement l’URL de production, par exemple :

```text
http://localhost:5678/webhook/mails-today
```

La solution a donc été de publier les workflows avec `Publish workflow` et de placer les URLs de production dans le fichier `.env` de React.

### 13.3 Récupération incomplète des e-mails Gmail

Une difficulté importante a été la récupération des données Gmail.

Au départ, le nœud Gmail `Get many messages` ne renvoyait pas toutes les informations nécessaires. Il retournait surtout les identifiants des messages, mais pas toujours l’expéditeur, l’objet, la date ou le contenu complet.

Le résultat contenait parfois seulement :

```json
{
  "id": "19e457ba27d6dd92",
  "threadId": "19e457ba27d6dd92"
}
```

Cela ne suffisait pas pour afficher correctement les mails dans React.

La solution a été d’ajouter un deuxième nœud Gmail :

```text
Get many messages
↓
Get a message
```

Le premier nœud récupère la liste des messages du jour.

Le deuxième nœud récupère le détail complet de chaque message à partir de son identifiant Gmail.

Grâce à cette solution, n8n a pu récupérer les informations nécessaires pour React.

### 13.4 Problème d’identifiant Gmail invalide

Une erreur est apparue dans le nœud de lecture détaillée des mails :

```text
Invalid id value
```

Cette erreur apparaissait lorsque Gmail recevait un identifiant vide ou incorrect.

Le problème venait du fait que, dans certains cas, aucun mail n’était trouvé ou que l’identifiant n’était pas préparé correctement avant d’être envoyé au nœud `Get a message`.

La solution a été d’ajouter un nœud intermédiaire pour préparer proprement les identifiants des mails.

Ce nœud transforme chaque message en objet simple :

```json
{
  "messageId": "19e457ba27d6dd92"
}
```

Ainsi, le nœud Gmail reçoit toujours un identifiant clair et valide.

### 13.5 Gestion du cas aucun mail reçu

Un autre problème important concernait le cas où aucun e-mail n’était reçu dans la journée.

Sans gestion spéciale, le workflow continuait vers la lecture détaillée des messages, même s’il n’y avait aucun message à lire. Cela provoquait une erreur Gmail.

La solution a été d’ajouter une vérification avec un compteur :

```text
mailCount
```

La règle utilisée est simple :

```text
Si mailCount > 0 :
continuer vers la lecture détaillée des mails.

Si mailCount = 0 :
retourner directement une réponse vide à React.
```

Dans le cas où aucun mail n’est reçu, n8n renvoie maintenant :

```json
{
  "date": "2026-05-20",
  "resumeGlobal": "Aucun e-mail reçu aujourd’hui. Vous n’avez aucune action à traiter pour le moment.",
  "mails": []
}
```

Cette correction rend le workflow plus robuste.

### 13.6 Problème avec l’option Always Output Data

Une autre difficulté est venue de l’option `Always Output Data` dans certains nœuds n8n.

Cette option peut forcer un nœud à produire un item vide, même lorsqu’aucune donnée réelle n’existe. Dans le cas du nœud IF, cela pouvait envoyer un item vide vers la mauvaise branche du workflow.

Le workflow essayait alors de lire le détail d’un mail inexistant.

La solution a été de désactiver `Always Output Data` sur le nœud IF et de garder cette option seulement là où elle était vraiment nécessaire, notamment après la récupération Gmail pour permettre la gestion du cas sans mail.

### 13.7 Expéditeur affiché comme inconnu

Au début, certains mails s’affichaient avec :

```text
Expéditeur inconnu
```

Le problème venait du fait que l’expéditeur n’était pas toujours présent dans un champ simple comme `from`.

Selon le format Gmail, l’expéditeur pouvait se trouver dans :

```text
from
headers
payload.headers
Sender
Reply-To
```

La solution a été de rendre le script de structuration plus robuste. Le code cherche maintenant l’expéditeur dans plusieurs emplacements possibles.

Cela a permis d’obtenir des valeurs comme :

```text
Google <no-reply@google.com>
```

au lieu de :

```text
Expéditeur inconnu
```

### 13.8 Contenu des e-mails coupé ou incomplet

Une difficulté importante concernait le contenu des e-mails.

Au départ, le contenu affiché correspondait souvent au champ `snippet`. Or `snippet` est seulement un aperçu court du message, pas le contenu complet.

La solution a été de lire le vrai contenu depuis le `payload` Gmail et ses différentes parties.

Le script n8n parcourt maintenant les parties du mail et récupère :

```text
text/plain
text/html
payload.body.data
payload.parts
```

Cela permet d’obtenir un contenu beaucoup plus complet.

### 13.9 Nettoyage du contenu HTML

Certains e-mails contenaient beaucoup de HTML, avec des balises et des caractères invisibles.

Exemples :

```text
<table>
<div>
<style>
&zwnj;
&nbsp;
```

Ces éléments rendaient le contenu difficile à lire dans React.

La solution a été d’ajouter un nettoyage dans le script n8n.

Le nettoyage permet de :

```text
- supprimer les balises HTML ;
- supprimer les scripts ;
- supprimer les styles ;
- décoder les entités HTML ;
- retirer les caractères invisibles ;
- garder uniquement le texte utile.
```

Cette étape a fortement amélioré la lisibilité des messages.

### 13.10 Résumé Groq mal formaté

Au début, le résumé global généré par Groq pouvait être affiché sous forme de bloc peu lisible.

Il contenait parfois du Markdown, des astérisques ou une structure irrégulière.

La solution a été d’améliorer le prompt envoyé à Groq.

Le prompt demande maintenant une structure claire :

```text
Résumé général :
...

Points importants :
- ...

Actions à faire :
- ...
```

Ensuite, React formate ce résumé pour l’afficher plus proprement dans l’interface.

### 13.11 Données qui disparaissaient dans React

Un autre problème est apparu dans React : les données pouvaient s’afficher puis disparaître avec le message :

```text
Les e-mails ne peuvent pas être chargés pour le moment.
```

Ce problème pouvait venir d’un double appel en développement ou d’une deuxième requête échouée.

La solution a été de mieux gérer les erreurs dans React.

Désormais, si des données sont déjà affichées et qu’une nouvelle requête échoue, React évite de supprimer immédiatement les anciennes données.

Une autre correction a été d’ajouter un paramètre dans l’appel fetch pour éviter le cache :

```javascript
fetch(`${mailsUrl}?time=${Date.now()}`)
```

### 13.12 Statut répondu perdu après actualisation

Dans la version simple du projet, chaque mail arrive depuis n8n avec le statut :

```text
non répondu
```

Après l’envoi d’une réponse, React change le statut en :

```text
répondu
```

Mais lors de l’actualisation des e-mails, les données sont rechargées depuis n8n, ce qui pouvait remettre tous les mails au statut `non répondu`.

La solution retenue a été d’utiliser `localStorage` dans le navigateur.

Quand un mail reçoit une réponse, son `messageId` est enregistré localement. Lors d’une actualisation, React vérifie cette liste et remet automatiquement le statut `répondu` aux mails déjà traités.

Cette solution est simple et adaptée au projet.

### 13.13 Manque d’indication après certains clics

Lorsque l’utilisateur cliquait sur les boutons :

```text
Lire tout le mail
Répondre
Réponse IA
```

le contenu concerné s’affichait plus bas dans la page. Mais l’utilisateur ne comprenait pas toujours qu’il devait descendre.

La solution a été d’ajouter une bulle d’information.

Cette bulle indique par exemple :

```text
Le contenu s’affiche plus bas. Descendez pour le consulter.
```

Un bouton permet aussi de descendre automatiquement dans la page.

Cette amélioration rend l’interface plus intuitive.

### 13.14 Sécurisation des clés API

Le projet utilise des accès sensibles, notamment Gmail et Groq.

Le risque était de placer accidentellement une clé API ou un secret dans le code ou sur GitHub.

La solution a été de centraliser les informations sensibles dans n8n et dans les credentials.

Les clés et secrets ne sont pas placés dans :

```text
- React ;
- GitHub ;
- rapport.md ;
- README.md ;
- .env.example.
```

Le fichier `.env` est également ignoré par Git.

### 13.15 Sauvegarde locale du fichier JSON

La sauvegarde locale du fichier `mails-today.json` a nécessité une attention particulière, car n8n doit écrire dans un chemin local précis.

Le problème possible était d’utiliser un chemin incorrect.

La solution a été d’utiliser un chemin absolu vers le fichier :

```text
data/mails-today.json
```

Le workflow prépare le JSON, le convertit en fichier, puis l’écrit sur le disque local.

### 13.16 Bilan des solutions apportées

Les difficultés rencontrées ont permis d’améliorer progressivement le projet.

Les principales corrections ont porté sur :

```text
- la récupération complète des mails Gmail ;
- la gestion du cas aucun mail ;
- le nettoyage du contenu HTML ;
- la mise en forme du résumé IA ;
- la stabilité de l’interface React ;
- la sécurité des clés ;
- la sauvegarde locale des données ;
- l’amélioration de l’expérience utilisateur.
```

Grâce à ces corrections, l’application est devenue plus stable, plus claire et plus proche des objectifs attendus.


## 14. Résultats obtenus

À la fin du développement, l’application permet de réaliser les principales fonctionnalités demandées dans l’énoncé. Elle combine une interface React moderne avec des workflows n8n capables de communiquer avec Gmail et Groq.

Cette partie présente les résultats obtenus après la mise en place complète du projet.

### 14.1 Affichage des e-mails du jour

L’application permet d’afficher les e-mails reçus dans la journée.

Les e-mails sont récupérés depuis Gmail par n8n, puis envoyés à React sous forme de données JSON.

Chaque e-mail affiché contient les informations suivantes :

```text
- l’expéditeur ;
- l’objet ;
- la date de réception ;
- un résumé court ;
- le contenu complet ;
- le statut du mail.
````

Les mails sont présentés sous forme de cartes afin de rendre l’interface plus lisible.

### 14.2 Résumé global généré par intelligence artificielle

Un résumé global des e-mails du jour est généré automatiquement avec Groq.

Ce résumé permet à l’utilisateur de comprendre rapidement les informations importantes sans lire tous les messages un par un.

Le résumé est organisé de manière lisible avec une structure du type :

```text
Résumé général :
...

Points importants :
- ...

Actions à faire :
- ...
```

Ce résultat répond à l’objectif de synthèse automatique demandé dans le projet.

### 14.3 Lecture complète d’un e-mail

L’utilisateur peut lire le contenu complet d’un e-mail grâce au bouton :

```text
Lire tout le mail
```

Lorsqu’il clique sur ce bouton, une section détaillée s’affiche plus bas dans la page.

Cette section contient :

```text
- l’objet du mail ;
- l’expéditeur ;
- la date ;
- le statut ;
- le contenu complet du message.
```

Une bulle d’aide indique à l’utilisateur de descendre dans la page pour consulter le contenu affiché.

### 14.4 Recherche des e-mails

Un champ de recherche permet de retrouver rapidement un e-mail.

La recherche se fait sur :

```text
- l’expéditeur ;
- l’objet ;
- le résumé.
```

Cela permet à l’utilisateur de filtrer rapidement les messages affichés lorsqu’il y a plusieurs e-mails dans la journée.

### 14.5 Filtrage par statut

L’application permet de filtrer les e-mails selon leur statut.

Trois filtres sont disponibles :

```text
Tous
Non répondus
Répondus
```

Ce système permet de distinguer les mails déjà traités des mails qui nécessitent encore une réponse.

### 14.6 Réponse manuelle aux e-mails

L’utilisateur peut écrire une réponse manuelle depuis l’interface React.

Après avoir sélectionné un mail, il peut rédiger son message dans une zone de texte, puis cliquer sur :

```text
Envoyer la réponse
```

React envoie alors la réponse à n8n, qui utilise Gmail pour répondre au message original.

Après l’envoi, un message de confirmation est affiché et le statut du mail passe à :

```text
répondu
```

### 14.7 Génération d’une réponse automatique

L’application permet aussi de générer une proposition de réponse avec Groq.

L’utilisateur clique sur :

```text
Réponse IA
```

Le contenu du mail est envoyé à n8n, qui prépare une demande pour Groq.

Groq génère ensuite une réponse professionnelle et simple.

Cette réponse n’est pas envoyée automatiquement. Elle est placée dans le champ de réponse afin que l’utilisateur puisse la relire, la modifier ou la supprimer avant l’envoi.

### 14.8 Actualisation manuelle des e-mails

Un bouton permet d’actualiser les e-mails sans recharger toute la page.

Le bouton :

```text
Actualiser les e-mails
```

appelle le workflow n8n chargé de récupérer les derniers e-mails du jour.

Après l’actualisation, la liste des mails, le résumé global et les compteurs sont mis à jour.

### 14.9 Gestion du cas aucun e-mail

L’application gère correctement le cas où aucun e-mail n’a été reçu dans la journée.

Dans ce cas, n8n renvoie une réponse propre avec une liste vide :

```json
{
  "date": "2026-05-20",
  "resumeGlobal": "Aucun e-mail reçu aujourd’hui. Vous n’avez aucune action à traiter pour le moment.",
  "mails": []
}
```

React affiche alors un message indiquant qu’aucun e-mail n’est disponible.

Cette gestion évite les erreurs dans le workflow n8n.

### 14.10 Sauvegarde locale des données

Les données finales sont sauvegardées dans le fichier :

```text
data/mails-today.json
```

Ce fichier contient :

```text
- la date ;
- le résumé global ;
- la liste des e-mails structurés.
```

Cette sauvegarde répond à l’exigence du projet concernant la génération d’un fichier JSON local.

### 14.11 Sécurisation des accès sensibles

Les clés et identifiants sensibles ne sont pas exposés dans React.

Les credentials Gmail et Groq sont configurés dans n8n.

Le fichier `.env` est ignoré par Git et n’est pas envoyé sur GitHub.

Cette organisation permet de protéger les accès aux services externes.

### 14.12 Export des workflows n8n

Les workflows n8n ont été exportés au format JSON dans le dossier :

```text
n8n/
```

Les principaux fichiers exportés sont :

```text
01-api-lire-mails-du-jour.json
02-api-envoyer-reponse-manuelle.json
03-api-generer-reponse-ia.json
```

Ces exports permettent de livrer les automatisations avec le projet.

### 14.13 Résultat global

Le résultat obtenu est une application fonctionnelle permettant de gérer les e-mails du jour depuis une interface web.

L’utilisateur peut :

```text
- consulter les e-mails reçus ;
- lire le contenu complet d’un message ;
- obtenir un résumé global généré par IA ;
- rechercher et filtrer les mails ;
- générer une réponse automatique ;
- envoyer une réponse manuelle ;
- actualiser les données ;
- conserver localement le statut des mails répondus ;
- sauvegarder les données dans un fichier JSON.
```

Le projet répond donc aux objectifs principaux fixés dans l’énoncé : interface web, récupération Gmail, automatisation n8n, résumé IA, réponse aux e-mails, sauvegarde JSON et export des workflows.


## 15. Limites du projet

Même si l’application répond aux objectifs principaux du projet, elle présente encore certaines limites. Ces limites sont normales dans le cadre d’un projet de stage réalisé progressivement et en environnement local.

### 15.1 Fonctionnement principalement local

Le projet fonctionne actuellement en local sur l’ordinateur de développement.

React est lancé avec :

```text
npm run dev
````

n8n est également lancé localement avec :

```text
n8n
```

Cela signifie que l’application dépend de l’ordinateur sur lequel elle est installée. Pour l’utiliser ailleurs, il faut aussi installer et configurer React, n8n, Gmail, Groq et les variables d’environnement.

Dans une version plus avancée, l’application pourrait être hébergée en ligne et n8n pourrait être déployé sur un serveur.

### 15.2 Dépendance à n8n

L’application React dépend fortement de n8n.

Si n8n n’est pas lancé, React ne peut pas :

```text
- récupérer les e-mails ;
- générer le résumé global ;
- envoyer une réponse manuelle ;
- générer une réponse IA ;
- sauvegarder le fichier JSON.
```

Cela signifie que les workflows n8n doivent être actifs et correctement publiés pour que l’application fonctionne.

### 15.3 Dépendance à Gmail

Le projet dépend aussi du bon fonctionnement de Gmail et de l’autorisation OAuth configurée dans Google Cloud.

Si le compte Gmail est déconnecté, si le credential expire ou si l’autorisation est retirée, n8n ne pourra plus lire ni envoyer les e-mails.

Il faut donc vérifier régulièrement que le credential Gmail dans n8n est toujours valide.

### 15.4 Dépendance à Groq

Groq est utilisé pour générer le résumé global et les réponses automatiques.

Si le service Groq est indisponible, si la clé API est invalide ou si une limite d’utilisation est atteinte, les fonctionnalités d’intelligence artificielle ne fonctionneront plus correctement.

Dans ce cas, l’application peut toujours récupérer et afficher les e-mails, mais elle ne pourra pas générer de résumé intelligent ni de réponse IA.

### 15.5 Qualité variable des réponses IA

Les réponses générées par Groq peuvent être utiles, mais elles ne sont pas toujours parfaites.

Une réponse IA peut parfois :

```text
- manquer de contexte ;
- être trop générale ;
- oublier une information importante ;
- proposer une formulation qui doit être corrigée ;
- mal interpréter un message complexe.
```

C’est pour cela que la réponse générée n’est jamais envoyée automatiquement. L’utilisateur doit toujours la relire, la modifier si nécessaire, puis décider lui-même de l’envoyer.

### 15.6 Nettoyage imparfait de certains e-mails HTML

Certains e-mails sont très complexes, surtout les messages automatiques envoyés par des services comme Google, les banques, les plateformes en ligne ou les newsletters.

Ces messages contiennent parfois beaucoup de HTML, de tableaux, de liens, d’images invisibles ou de caractères spéciaux.

Le workflow n8n nettoie ces messages pour obtenir un texte lisible, mais le résultat peut parfois contenir encore quelques éléments inutiles ou perdre une partie de la mise en forme originale.

### 15.7 Statut répondu stocké localement

Dans la version actuelle, le statut `répondu` est conservé avec `localStorage` dans le navigateur.

Cela fonctionne bien sur le même ordinateur et le même navigateur.

Cependant, cette solution a une limite importante :

```text
Si l’utilisateur change de navigateur ou d’ordinateur, les statuts répondus ne seront pas conservés.
```

Une solution plus solide serait d’utiliser une base de données ou un label Gmail pour enregistrer durablement les mails déjà traités.

### 15.8 Absence de base de données

Le projet ne possède pas encore de base de données.

Les données sont soit récupérées depuis Gmail, soit sauvegardées dans un fichier JSON local.

Cette solution est suffisante pour le projet, mais elle limite certaines possibilités comme :

```text
- conserver un historique complet ;
- gérer plusieurs utilisateurs ;
- retrouver les anciennes réponses envoyées ;
- suivre les actions dans le temps ;
- produire des statistiques.
```

Dans une version professionnelle, une base de données serait utile.

### 15.9 Gestion limitée des utilisateurs

L’application ne possède pas encore de système d’authentification propre.

Elle est pensée pour être utilisée localement avec un compte Gmail de test.

Il n’y a donc pas encore :

```text
- création de compte utilisateur ;
- connexion utilisateur ;
- gestion des rôles ;
- séparation entre plusieurs boîtes Gmail ;
- tableau de bord multi-utilisateur.
```

Cette limite est acceptable pour un projet local, mais elle devrait être corrigée dans une version destinée à plusieurs utilisateurs.

### 15.10 Chemin local du fichier JSON

La sauvegarde du fichier `mails-today.json` dépend d’un chemin local configuré dans n8n.

Si le projet est déplacé sur un autre ordinateur, ce chemin devra être modifié.

Cela peut provoquer une erreur si n8n essaie d’écrire le fichier dans un dossier qui n’existe pas.

Une amélioration possible serait de rendre ce chemin configurable plus facilement ou de sauvegarder les données dans une base de données.

### 15.11 Limite de sécurité en environnement local

Les clés sensibles ne sont pas exposées dans React, ce qui est une bonne pratique.

Cependant, le projet reste une application locale de démonstration. Il ne possède pas encore toute la sécurité nécessaire pour une mise en production.

Dans une version professionnelle, il faudrait ajouter :

```text
- une authentification solide ;
- une gestion des permissions ;
- un serveur sécurisé ;
- un hébergement HTTPS ;
- une surveillance des erreurs ;
- une meilleure gestion des accès aux services externes.
```

### 15.12 Limite de performance

Le workflow n8n récupère les e-mails du jour, lit le détail de chaque message, nettoie le contenu, génère un résumé avec Groq et sauvegarde le JSON.

Si la boîte Gmail reçoit beaucoup d’e-mails dans une journée, le traitement peut devenir plus lent.

Pour cette raison, une limite de récupération a été utilisée afin d’éviter de traiter un nombre trop important de messages à la fois.

Dans une version plus avancée, il serait possible d’ajouter une pagination ou un traitement par lots.

### 15.13 Bilan des limites

Les principales limites du projet sont donc :

```text
- fonctionnement local ;
- dépendance à n8n, Gmail et Groq ;
- absence de base de données ;
- statut répondu stocké localement ;
- nettoyage HTML parfois imparfait ;
- absence d’authentification utilisateur ;
- chemin local du fichier JSON à adapter selon l’ordinateur.
```

Malgré ces limites, le projet reste fonctionnel et répond aux objectifs essentiels demandés. Ces limites ouvrent aussi la voie à plusieurs améliorations possibles.


## 16. Améliorations possibles

Même si le projet répond aux objectifs principaux, plusieurs améliorations peuvent être envisagées pour rendre l’application plus complète, plus robuste et plus proche d’une solution professionnelle.

### 16.1 Ajouter une base de données

Actuellement, les données sont principalement récupérées depuis Gmail, sauvegardées dans un fichier JSON local et partiellement conservées dans le navigateur avec `localStorage`.

Une amélioration importante serait d’ajouter une base de données.

Cette base de données pourrait permettre de stocker :

```text
- les e-mails récupérés ;
- les résumés générés ;
- les réponses envoyées ;
- les statuts des e-mails ;
- l’historique des actions ;
- les erreurs rencontrées.
````

Cela permettrait de mieux suivre les e-mails traités dans le temps.

### 16.2 Améliorer la gestion du statut répondu

Dans la version actuelle, le statut `répondu` est conservé localement dans le navigateur grâce à `localStorage`.

Cette solution est simple, mais elle dépend du navigateur utilisé.

Une amélioration possible serait de rendre ce statut plus durable.

Par exemple, on pourrait :

```text
- enregistrer le statut dans une base de données ;
- ajouter un label Gmail au mail répondu ;
- créer un historique des réponses envoyées ;
- synchroniser le statut entre plusieurs appareils.
```

Ainsi, même après un changement de navigateur ou d’ordinateur, le statut des e-mails resterait correct.

### 16.3 Ajouter une authentification utilisateur

L’application ne possède pas encore de système d’authentification propre.

Une amélioration serait d’ajouter une connexion utilisateur.

Cela permettrait de gérer :

```text
- plusieurs utilisateurs ;
- plusieurs comptes Gmail ;
- des permissions différentes ;
- un espace personnel pour chaque utilisateur.
```

Cette amélioration serait importante si l’application devait être utilisée par plusieurs personnes.

### 16.4 Héberger l’application en ligne

Le projet fonctionne actuellement en local.

Une amélioration serait d’héberger l’application React sur une plateforme en ligne.

Par exemple :

```text
- Vercel ;
- Netlify ;
- Render ;
- un serveur personnel.
```

Cela permettrait d’accéder à l’application depuis un navigateur sans devoir lancer React manuellement sur l’ordinateur.

### 16.5 Déployer n8n sur un serveur

n8n fonctionne actuellement localement.

Une amélioration serait de le déployer sur un serveur afin que les workflows restent disponibles en permanence.

Cela permettrait :

```text
- d’utiliser les webhooks à tout moment ;
- d’éviter de lancer n8n manuellement ;
- de mieux gérer les automatisations ;
- de rendre l’application plus stable.
```

Dans ce cas, il faudrait aussi sécuriser l’accès à n8n.

### 16.6 Améliorer les résumés générés par IA

Les résumés générés par Groq sont utiles, mais ils pourraient être améliorés.

On pourrait par exemple demander à l’IA de produire :

```text
- un niveau d’urgence ;
- une liste d’actions prioritaires ;
- une classification des e-mails ;
- une estimation du temps nécessaire pour répondre ;
- un résumé encore plus court pour les mails simples.
```

Cela rendrait l’application plus intelligente et plus pratique.

### 16.7 Classer automatiquement les e-mails

Une autre amélioration serait de classer automatiquement les e-mails selon leur type.

Par exemple :

```text
- administratif ;
- professionnel ;
- personnel ;
- urgent ;
- information simple ;
- demande de réponse ;
- publicité ou newsletter.
```

Cette classification pourrait être faite avec Groq.

Elle permettrait à l’utilisateur de mieux organiser ses e-mails.

### 16.8 Ajouter un niveau de priorité

L’application pourrait attribuer une priorité à chaque e-mail.

Par exemple :

```text
Priorité haute
Priorité moyenne
Priorité basse
```

Un mail demandant une action rapide pourrait être marqué comme prioritaire.

Cela aiderait l’utilisateur à traiter d’abord les messages les plus importants.

### 16.9 Améliorer la génération de réponses automatiques

La réponse IA actuelle propose un texte simple que l’utilisateur peut modifier.

Une amélioration serait de proposer plusieurs styles de réponse.

Par exemple :

```text
- réponse courte ;
- réponse professionnelle ;
- réponse chaleureuse ;
- réponse très formelle ;
- réponse avec demande de précision.
```

L’utilisateur pourrait choisir le style le plus adapté avant de générer la réponse.

### 16.10 Ajouter un historique des réponses envoyées

Actuellement, l’application envoie la réponse via Gmail, mais elle ne garde pas un historique complet dans l’interface.

Une amélioration serait d’ajouter une page ou une section contenant :

```text
- le mail reçu ;
- la réponse envoyée ;
- la date d’envoi ;
- le statut ;
- l’utilisateur ayant envoyé la réponse.
```

Cela serait utile pour suivre les échanges.

### 16.11 Ajouter des statistiques

L’application pourrait afficher des statistiques simples.

Par exemple :

```text
- nombre de mails reçus aujourd’hui ;
- nombre de mails répondus ;
- nombre de mails non répondus ;
- nombre de réponses générées par IA ;
- temps estimé gagné.
```

Ces statistiques rendraient l’application plus complète et plus utile.

### 16.12 Améliorer la sauvegarde JSON

Le fichier `mails-today.json` est actuellement remplacé à chaque actualisation.

Une amélioration serait de conserver plusieurs fichiers par date.

Par exemple :

```text
data/
├── mails-2026-05-20.json
├── mails-2026-05-21.json
└── mails-2026-05-22.json
```

Cela permettrait de garder un historique quotidien.

### 16.13 Ajouter une meilleure gestion des erreurs

L’application gère déjà certaines erreurs, mais cette gestion pourrait être améliorée.

Par exemple, on pourrait afficher des messages différents selon le problème :

```text
- n8n indisponible ;
- Gmail déconnecté ;
- Groq indisponible ;
- clé API invalide ;
- aucun mail reçu ;
- problème d’envoi de réponse.
```

Cela aiderait l’utilisateur à comprendre plus rapidement la source du problème.

### 16.14 Améliorer le nettoyage des e-mails HTML

Certains e-mails HTML complexes peuvent encore contenir des éléments inutiles après nettoyage.

Une amélioration serait de renforcer le script de nettoyage ou d’utiliser une bibliothèque spécialisée pour extraire plus proprement le texte des e-mails.

Cela permettrait d’obtenir un contenu plus lisible avant de l’envoyer à Groq ou de l’afficher dans React.

### 16.15 Ajouter des notifications

L’application pourrait ajouter un système de notifications.

Par exemple :

```text
- notification lorsqu’un nouveau mail arrive ;
- notification lorsqu’une réponse est envoyée ;
- notification lorsqu’un mail urgent est détecté ;
- notification en cas d’erreur.
```

Cela rendrait l’application plus interactive.

### 16.16 Ajouter un tableau de bord

Une amélioration plus avancée serait d’ajouter un tableau de bord.

Ce tableau de bord pourrait afficher :

```text
- les mails du jour ;
- les mails urgents ;
- les réponses envoyées ;
- les statistiques ;
- les erreurs récentes ;
- les actions restantes.
```

Cela donnerait une vue plus complète de la gestion des e-mails.

### 16.17 Passer à une architecture de production

Pour une version professionnelle, il faudrait adapter l’architecture.

Cela pourrait inclure :

```text
- un backend sécurisé ;
- une base de données ;
- une authentification ;
- un hébergement HTTPS ;
- un n8n déployé sur serveur ;
- une meilleure gestion des secrets ;
- une surveillance des erreurs.
```

Cette évolution permettrait de transformer le projet local en véritable application utilisable en production.

### 16.18 Bilan des améliorations possibles

Les améliorations les plus importantes seraient :

```text
- ajouter une base de données ;
- rendre le statut répondu durable ;
- héberger React et n8n ;
- améliorer la classification des mails ;
- proposer plusieurs styles de réponses IA ;
- ajouter un historique ;
- renforcer la sécurité.
```

Ces améliorations permettraient de rendre l’application plus complète, plus fiable et plus proche d’un outil professionnel.


## 17. Organisation du dépôt GitHub

Le projet est organisé dans un dépôt GitHub afin de faciliter le suivi du développement, la sauvegarde du code et la livraison finale.

L’énoncé demande que le dépôt contienne le site web, les exports JSON des workflows n8n et un rapport Markdown. Il demande aussi d’ajouter les collaborateurs `lilgar77` et `Holo795` au dépôt.

### 17.1 Structure générale du projet

Le dépôt GitHub est organisé de manière à séparer clairement les différentes parties du projet.

La structure générale retenue est la suivante :

```text
assistant-mails-stage/
├── frontend/
├── data/
├── n8n/
├── rapport.md
├── README.md
└── .gitignore
````

Chaque élément a un rôle précis dans le projet.

Le dossier `frontend/` contient l’application React.

Le dossier `data/` contient le fichier JSON local généré par n8n.

Le dossier `n8n/` contient les workflows n8n exportés.

Le fichier `rapport.md` contient le rapport complet du projet.

Le fichier `README.md` présente rapidement le projet, son installation et son utilisation.

Le fichier `.gitignore` permet d’éviter d’envoyer sur GitHub les fichiers inutiles ou sensibles.

### 17.2 Dossier `frontend/`

Le dossier `frontend/` contient l’application React.

Il contient notamment :

```text
frontend/
├── src/
├── public/
├── package.json
├── vite.config.js
├── .env
└── .env.example
```

Le dossier `src/` contient les principaux fichiers de l’interface :

```text
App.jsx
App.css
main.jsx
```

C’est dans cette partie que sont développées les fonctionnalités visibles par l’utilisateur :

```text
- affichage des e-mails ;
- résumé global ;
- lecture complète d’un mail ;
- réponse manuelle ;
- réponse IA ;
- recherche ;
- filtres ;
- actualisation des e-mails ;
- messages d’aide et états de chargement.
```

Le fichier `.env` contient les URLs locales des webhooks n8n utilisées par React.

Le fichier `.env.example` sert d’exemple pour montrer les variables nécessaires sans exposer de configuration personnelle sensible.

Le fichier `.env` ne doit pas être envoyé sur GitHub.

### 17.3 Dossier `data/`

Le dossier `data/` contient le fichier JSON généré par n8n.

Le fichier principal est :

```text
data/mails-today.json
```

Ce fichier contient les données structurées des e-mails du jour :

```text
- la date ;
- le résumé global ;
- la liste des e-mails ;
- l’expéditeur ;
- l’objet ;
- la date de réception ;
- le résumé court ;
- le contenu complet ;
- le statut du mail.
```

Ce fichier est généré ou remplacé automatiquement par le workflow n8n principal.

### 17.4 Dossier `n8n/`

Le dossier `n8n/` contient les workflows n8n exportés au format JSON.

Les principaux fichiers sont :

```text
n8n/01-api-lire-mails-du-jour.json
n8n/02-api-envoyer-reponse-manuelle.json
n8n/03-api-generer-reponse-ia.json
```

Le fichier `01-api-lire-mails-du-jour.json` correspond au workflow principal. Il récupère les e-mails Gmail du jour, structure les données, génère le résumé global avec Groq, sauvegarde le fichier JSON local et renvoie les données à React.

Le fichier `02-api-envoyer-reponse-manuelle.json` correspond au workflow qui permet d’envoyer une réponse écrite par l’utilisateur via Gmail.

Le fichier `03-api-generer-reponse-ia.json` correspond au workflow qui génère une proposition de réponse automatique avec Groq.

Ces exports permettent de réimporter les workflows dans une autre instance n8n si nécessaire.

### 17.5 Fichier `rapport.md`

Le fichier `rapport.md` contient le rapport complet du projet.

Il documente :

```text
- le contexte du projet ;
- les objectifs ;
- les technologies utilisées ;
- l’architecture générale ;
- l’installation et la configuration ;
- l’interface React ;
- les workflows n8n ;
- l’intégration Gmail ;
- l’intégration Groq ;
- la gestion des réponses ;
- la sauvegarde JSON ;
- la sécurité ;
- les difficultés rencontrées ;
- les résultats obtenus ;
- les limites ;
- les améliorations possibles ;
- l’organisation du dépôt GitHub.
```

Ce fichier correspond au rapport Markdown demandé dans l’énoncé.

### 17.6 Fichier `README.md`

Le fichier `README.md` sert de page d’accueil du dépôt GitHub.

Il présente rapidement :

```text
- le nom du projet ;
- une courte description ;
- les technologies utilisées ;
- les étapes rapides d’installation ;
- les commandes principales ;
- les variables d’environnement nécessaires ;
- les workflows n8n disponibles ;
- les consignes de sécurité.
```

Le `README.md` permet à une autre personne de comprendre rapidement le projet sans lire immédiatement tout le rapport.

### 17.7 Fichier `frontend/.env.example`

Le fichier `.env.example` est placé uniquement dans le dossier `frontend/`.

Il sert d’exemple pour les variables d’environnement nécessaires à l’application React.

Il peut contenir :

```env
VITE_N8N_GET_MAILS_URL=http://localhost:5678/webhook/mails-today
VITE_N8N_REPLY_MANUAL_URL=http://localhost:5678/webhook/reply-manual
VITE_N8N_REPLY_AI_URL=http://localhost:5678/webhook/reply-ai
```

Ce fichier ne contient pas de clé API ni de secret.

Il permet simplement de montrer à une autre personne quelles variables créer dans son propre fichier `.env`.

### 17.8 Fichier `.gitignore`

Le fichier `.gitignore` indique à Git les fichiers ou dossiers à ne pas envoyer sur GitHub.

Il doit notamment contenir :

```text
node_modules/
dist/
.env
frontend/.env
```

Le dossier `node_modules/` n’est pas envoyé sur GitHub, car il peut être réinstallé avec :

```powershell
npm install
```

Le dossier `dist/` n’est pas envoyé, car il peut être régénéré.

Le fichier `frontend/.env` n’est pas envoyé pour éviter de publier la configuration locale du projet.

### 17.9 Commits Git

Le projet a été versionné progressivement avec Git.

Chaque grande étape a été enregistrée avec un commit clair.

Exemples de commits :

```text
Initialisation du projet
Création de l’interface React
Ajout de la connexion React n8n
Récupération des vrais mails Gmail
Ajout du résumé global avec Groq
Ajout de l’envoi des réponses manuelles
Ajout de la génération de réponse IA avec Groq
Gestion du cas aucun mail reçu
Ajout de la sauvegarde locale des mails du jour
Ajout du filtrage des mails par statut
```

Cette méthode permet de suivre l’évolution du projet étape par étape.

### 17.10 Vérification avant livraison

Avant la livraison du projet, plusieurs vérifications sont nécessaires.

Il faut vérifier que :

```text
- le dossier `frontend/` est présent ;
- le dossier `data/` est présent ;
- le dossier `n8n/` contient les workflows exportés ;
- le fichier `rapport.md` est présent ;
- le fichier `README.md` est présent ;
- le fichier `frontend/.env.example` est présent ;
- le fichier `frontend/.env` n’est pas envoyé sur GitHub ;
- aucune clé Groq n’est visible dans le dépôt ;
- aucun secret Google n’est visible dans le dépôt ;
- les workflows n8n sont bien exportés ;
- les commits Git sont propres.
```

Il est aussi conseillé de faire une recherche dans le projet avec :

```text
gsk_
client_secret
Bearer
```

Cela permet de vérifier qu’aucune information sensible n’a été envoyée accidentellement.

### 17.11 Collaborateurs GitHub

L’énoncé demande d’ajouter les collaborateurs suivants au dépôt GitHub :

```text
lilgar77
Holo795
```

Cette étape se fait depuis GitHub :

```text
Repository
↓
Settings
↓
Collaborators
↓
Add people
↓
Ajouter lilgar77 et Holo795
```

Ces collaborateurs doivent être ajoutés avant la livraison finale du projet.

### 17.12 Bilan de l’organisation

L’organisation du dépôt permet de retrouver facilement chaque partie du projet.

Le code React est dans `frontend/`.

Les données JSON sont dans `data/`.

Les workflows n8n sont dans `n8n/`.

Le rapport final est dans `rapport.md`.

Le fichier d’exemple des variables d’environnement est dans `frontend/.env.example`.

Cette organisation rend le projet clair, lisible et facile à évaluer.



## 18. Conclusion

Ce projet a permis de mettre en place une application web complète pour la gestion intelligente des e-mails reçus dans la journée.

L’objectif principal était de créer une solution capable de récupérer les e-mails Gmail, d’en extraire les informations importantes, de générer un résumé global avec l’intelligence artificielle, puis de permettre à l’utilisateur de répondre aux messages depuis une interface simple et agréable.

Pour atteindre cet objectif, l’application a été organisée autour de deux parties principales.

La première partie est l’interface React. Elle permet à l’utilisateur de consulter les e-mails, de lire leur contenu complet, de rechercher un message, de filtrer les mails selon leur statut, de générer une réponse IA, d’écrire une réponse manuelle et d’actualiser les données.

La deuxième partie est l’automatisation avec n8n. Les workflows n8n permettent de se connecter à Gmail, de récupérer les e-mails du jour, de nettoyer les contenus, de structurer les données, d’appeler Groq pour générer un résumé ou une réponse automatique, d’envoyer des réponses via Gmail et de sauvegarder les données dans un fichier JSON local.

Le projet a également permis de comprendre l’importance de la sécurité dans une application connectée à des services externes. Les clés API et les identifiants sensibles ne sont pas placés dans le code React. Ils sont configurés dans n8n, ce qui permet de mieux protéger l’accès à Gmail et à Groq.

Plusieurs difficultés ont été rencontrées pendant le développement, notamment la récupération complète des messages Gmail, le nettoyage des contenus HTML, la gestion du cas où aucun mail n’est reçu, le formatage du résumé généré par l’IA et la conservation locale du statut des mails répondus. Ces difficultés ont été progressivement corrigées, ce qui a permis d’obtenir une application plus stable et plus claire.

À la fin du projet, les principales fonctionnalités attendues sont opérationnelles :

```text
- affichage des e-mails du jour ;
- extraction de l’expéditeur, de l’objet, de la date et du contenu ;
- génération d’un résumé global avec Groq ;
- lecture complète d’un e-mail ;
- réponse manuelle via Gmail ;
- génération d’une réponse automatique avec Groq ;
- actualisation des e-mails ;
- filtrage des mails par statut ;
- sauvegarde des données dans data/mails-today.json ;
- export des workflows n8n ;
- documentation du projet dans un rapport Markdown.
````

Le projet reste perfectible. Certaines améliorations pourraient être ajoutées plus tard, comme une base de données, une authentification utilisateur, un hébergement en ligne, une gestion plus durable des statuts ou encore un historique complet des réponses envoyées.

Malgré ces limites, le résultat obtenu répond aux objectifs principaux du projet. L’application montre comment combiner React, n8n, Gmail et Groq pour construire un assistant intelligent capable d’aider l’utilisateur à lire, comprendre et traiter ses e-mails plus rapidement.

































