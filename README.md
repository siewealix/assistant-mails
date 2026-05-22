# Assistant intelligent de gestion des e-mails

## Description

Ce projet est une application web permettant de consulter, résumer et traiter les e-mails reçus dans la journée.

L’application permet de :

- récupérer les e-mails Gmail du jour ;
- afficher les informations importantes de chaque e-mail ;
- générer un résumé global avec Groq ;
- lire le contenu complet d’un e-mail ;
- générer une proposition de réponse avec l’intelligence artificielle ;
- envoyer une réponse manuelle via Gmail ;
- filtrer les mails selon leur statut ;
- sauvegarder les données dans un fichier JSON local.

Le projet utilise React pour l’interface utilisateur et n8n pour l’automatisation.

---

## Technologies utilisées

- React
- Vite
- CSS
- n8n
- Gmail API
- Google Cloud OAuth
- Groq
- JSON
- Git et GitHub

---

## Structure du projet

```text
assistant-mails-stage/
├── frontend/
├── data/
├── n8n/
├── rapport.md
├── README.md
└── .gitignore
````

### Dossier `frontend/`

Contient l’application React.

Principaux fichiers :

```text
frontend/
├── src/
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── .env
├── .env.example
├── package.json
└── vite.config.js
```

### Dossier `data/`

Contient le fichier JSON généré par n8n :

```text
data/mails-today.json
```

Ce fichier contient les e-mails du jour, le résumé global et les données structurées.

### Dossier `n8n/`

Contient les workflows n8n exportés :

```text
n8n/01-api-lire-mails-du-jour.json
n8n/02-api-envoyer-reponse-manuelle.json
n8n/03-api-generer-reponse-ia.json
```

---

## Fonctionnalités principales

### 1. Lecture des e-mails du jour

L’application récupère les e-mails reçus dans la journée depuis Gmail.

Chaque e-mail affiche :

* l’expéditeur ;
* l’objet ;
* la date de réception ;
* un résumé court ;
* le statut ;
* le contenu complet.

### 2. Résumé global avec Groq

Les e-mails du jour sont envoyés à Groq via n8n.

Groq génère un résumé global structuré avec :

* un résumé général ;
* les points importants ;
* les actions à faire.

### 3. Lecture complète d’un mail

Le bouton `Lire tout le mail` permet d’afficher le contenu complet d’un e-mail.

Une bulle d’aide indique à l’utilisateur que le contenu s’affiche plus bas dans la page.

### 4. Réponse manuelle

L’utilisateur peut écrire une réponse manuelle dans React.

La réponse est ensuite envoyée à Gmail grâce au workflow n8n.

### 5. Réponse IA

Le bouton `Réponse IA` permet de générer une proposition de réponse avec Groq.

La réponse générée est affichée dans le champ de réponse.

L’utilisateur peut la modifier avant de l’envoyer.

### 6. Filtres et recherche

L’application permet de :

* rechercher un mail ;
* afficher tous les mails ;
* afficher les mails non répondus ;
* afficher les mails répondus.

### 7. Actualisation des e-mails

Un bouton permet d’actualiser les e-mails sans recharger toute la page.

### 8. Sauvegarde JSON

Le workflow principal sauvegarde les données finales dans :

```text
data/mails-today.json
```

---

## Installation du projet

### 1. Cloner le dépôt

```powershell
git clone URL_DU_DEPOT
cd assistant-mails-stage
```

### 2. Installer les dépendances React

```powershell
cd frontend
npm install
```

### 3. Créer le fichier `.env`

Dans le dossier `frontend/`, créer un fichier :

```text
.env
```

Tu peux te baser sur le fichier :

```text
frontend/.env.example
```

Exemple :

```env
VITE_N8N_GET_MAILS_URL=http://localhost:5678/webhook/mails-today
VITE_N8N_REPLY_MANUAL_URL=http://localhost:5678/webhook/reply-manual
VITE_N8N_REPLY_AI_URL=http://localhost:5678/webhook/reply-ai
```

### 4. Lancer React

Depuis le dossier `frontend/` :

```powershell
npm run dev
```

L’application sera disponible ici :

```text
http://localhost:5173
```

---

## Installation et lancement de n8n

### 1. Installer n8n

```powershell
npm install n8n -g
```

### 2. Lancer n8n

```powershell
n8n
```

n8n sera disponible ici :

```text
http://localhost:5678
```

---

## Workflows n8n

Le projet utilise trois workflows principaux.

### 1. `01-api-lire-mails-du-jour`

Rôle :

* récupérer les e-mails Gmail du jour ;
* gérer le cas où aucun mail n’est reçu ;
* lire le détail complet de chaque mail ;
* nettoyer le contenu HTML ;
* structurer les données pour React ;
* générer un résumé global avec Groq ;
* sauvegarder le fichier `mails-today.json` ;
* renvoyer les données à React.

Webhook :

```text
GET /webhook/mails-today
```

### 2. `02-api-envoyer-reponse-manuelle`

Rôle :

* recevoir une réponse écrite depuis React ;
* vérifier les données reçues ;
* répondre au mail via Gmail ;
* renvoyer un message de confirmation à React.

Webhook :

```text
POST /webhook/reply-manual
```

### 3. `03-api-generer-reponse-ia`

Rôle :

* recevoir les informations d’un mail depuis React ;
* préparer une demande pour Groq ;
* générer une proposition de réponse ;
* renvoyer la réponse IA à React.

Webhook :

```text
POST /webhook/reply-ai
```

---

## Configuration Gmail

Pour connecter Gmail à n8n, un projet Google Cloud doit être configuré.

Étapes principales :

1. Créer un projet Google Cloud.
2. Activer Gmail API.
3. Configurer l’écran de consentement OAuth.
4. Créer un OAuth Client ID de type application web.
5. Ajouter l’URL de redirection donnée par n8n.
6. Créer le credential Gmail dans n8n.
7. Connecter le compte Gmail de test.

Un compte Gmail de test est recommandé.

---

## Configuration Groq

Groq est utilisé pour :

* générer le résumé global ;
* générer les réponses automatiques.

La clé API Groq doit être ajoutée dans n8n avec un credential :

```text
Groq account
```

La clé Groq ne doit jamais être placée dans le code React.

---

## Sécurité

Les éléments sensibles ne doivent pas être envoyés sur GitHub.

À ne jamais publier :

* clé API Groq ;
* Client Secret Google ;
* fichier `frontend/.env` ;
* credentials Gmail ;
* tokens OAuth.

Le fichier `.gitignore` doit contenir au minimum :

```text
node_modules/
dist/
.env
frontend/.env
```

Avant chaque commit important, il est conseillé de vérifier qu’aucune clé n’est présente dans le projet.

Recherches utiles dans VS Code :

```text
gsk_
client_secret
Bearer
```

---

## Rapport

Le rapport complet du projet se trouve dans :

```text
rapport.md
```

Il contient :

* l’introduction ;
* les objectifs ;
* les technologies utilisées ;
* l’architecture ;
* l’installation ;
* l’interface React ;
* les workflows n8n ;
* l’intégration Gmail ;
* l’intégration Groq ;
* les difficultés rencontrées ;
* les résultats obtenus ;
* les limites ;
* les améliorations possibles ;
* l’organisation du dépôt ;
* la conclusion.

---

## Commandes utiles

### Lancer React

```powershell
cd frontend
npm run dev
```

### Lancer n8n

```powershell
n8n
```

### Vérifier l’état Git

```powershell
git status
```

### Ajouter les fichiers

```powershell
git add .
```

### Faire un commit

```powershell
git commit -m "Message du commit"
```

### Envoyer sur GitHub

```powershell
git push
```

---

## Collaborateurs GitHub

Les collaborateurs demandés pour le projet sont :

```text
lilgar77
Holo795
```

Ils doivent être ajoutés depuis GitHub :

```text
Repository
Settings
Collaborators
Add people
```

---

## Limites connues

Le projet fonctionne actuellement en local.

Les principales limites sont :

* pas encore de base de données ;
* statut répondu conservé localement avec `localStorage` ;
* dépendance à n8n, Gmail et Groq ;
* nettoyage HTML parfois imparfait selon les e-mails ;
* pas encore d’authentification utilisateur ;
* chemin local du fichier JSON à adapter selon l’ordinateur.

---

## Améliorations possibles

Améliorations envisageables :

* ajouter une base de données ;
* héberger React en ligne ;
* déployer n8n sur un serveur ;
* ajouter une authentification ;
* conserver l’historique des réponses ;
* ajouter des statistiques ;
* améliorer la classification automatique des e-mails ;
* proposer plusieurs styles de réponses IA.

---

## Conclusion

Ce projet montre comment combiner React, n8n, Gmail et Groq pour créer un assistant intelligent de gestion des e-mails.

L’application permet de consulter les mails du jour, de les résumer, de générer des réponses et d’envoyer des réponses via Gmail depuis une interface simple et moderne.


