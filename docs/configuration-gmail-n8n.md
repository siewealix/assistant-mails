# Configuration Gmail dans n8n

## Objectif

Cette étape permet à n8n de se connecter à Gmail afin de récupérer les e-mails et d’envoyer des réponses.

## Compte utilisé

Un compte Gmail de test est recommandé pour éviter d’utiliser une boîte personnelle principale.

## Configuration Google Cloud

Étapes réalisées :

1. Création d’un projet Google Cloud.
2. Activation de Gmail API.
3. Configuration de l’écran de consentement OAuth.
4. Ajout du compte Gmail de test comme utilisateur de test.
5. Création d’un OAuth Client ID de type Web application.
6. Ajout de l’URL de redirection fournie par n8n.
7. Récupération du Client ID et du Client Secret.

## Configuration n8n

Dans n8n, un credential Gmail OAuth2 a été créé.

Nom du credential :

```text
Gmail Test Assistant Mails Stage