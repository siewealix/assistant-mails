# Review — Exercice technique « Assistant intelligent de gestion des e-mails »

**Projet :** Développement Web & Automatisation avec n8n
**Date de la review :** 22/05/2026
**Niveau du candidat :** 1ʳᵉ année d'informatique

---

## En résumé

Bravo : le projet est **complet et fonctionnel**, les trois parties du sujet sont livrées
(interface web, workflow n8n, réponses manuelle et IA). Pour une première année
d'informatique, c'est un travail sérieux, soigné et qui va au bout des choses. On a pris
plaisir à le parcourir.

Ce document liste **ce qu'on a apprécié** puis quelques **pistes d'amélioration**. Aucune
n'est bloquante : ce sont des points de progression normaux à ton niveau, et c'est justement
en les travaillant qu'on devient meilleur. Le but n'est pas de pointer des « fautes » mais
de te donner des repères pour la suite.

---

## Ce qu'on a apprécié

- **Un projet qui fonctionne de bout en bout.** Lecture des mails du jour, résumé global,
  filtres, recherche, réponse manuelle, réponse IA, actualisation : tout marche. C'est le
  plus important, et c'est réussi.
- **Une gestion d'erreurs vraiment soignée.** `try / catch / finally` partout, conservation
  des anciennes données quand un rechargement échoue, protection contre le double-clic à
  l'envoi, vérification des variables d'environnement manquantes. Beaucoup de candidats plus
  avancés oublient ça — toi non.
- **La sécurité est bien gérée.** Le `.env` est ignoré par git, un `.env.example` est fourni,
  et **aucune clé secrète** ne traîne dans le code ni dans les exports n8n. C'est exactement
  ce que demandait le sujet.
- **L'interface est responsive.** Les breakpoints mobile sont bien présents, l'interface est
  claire et agréable à utiliser.
- **Une documentation impressionnante.** Le `README` et le `rapport.md` sont très détaillés :
  installation, architecture, difficultés, limites… On le dit franchement, c'est **peut-être
  même un peu trop** :) — mais c'est une « bonne surprise » : ça montre du sérieux et de
  l'investissement, et c'est bien plus agréable qu'un projet sans aucune explication.
- **Un découpage des commits cohérent.** 21 commits, chacun correspondant à une fonctionnalité
  claire. La progression du projet se lit bien dans l'historique.

---

## Pistes d'amélioration

### 1. Découper le code en composants (le point le plus important)

Aujourd'hui, presque toute l'application tient dans un seul fichier, `App.jsx`, d'environ
**1000 lignes**. C'est le principal point à travailler.

Le principe d'un framework comme React, c'est justement de **composer une interface à partir
de petits morceaux réutilisables** (les composants). Chaque composant a une responsabilité
unique, reçoit ce dont il a besoin via les `props`, et reste court et lisible.

Une piste de découpage concrète pour ton projet :

- `Hero` — l'en-tête de présentation
- `GlobalSummary` — la carte du résumé global
- `MailToolbar` / `Filters` — la barre de filtres et de recherche
- `MailList` qui affiche plusieurs `MailCard` — la liste et la carte d'un mail
- `ReplyPanel` — la zone de réponse
- `FullMailView` — la lecture complète d'un mail

Et pour aller plus loin, regrouper la logique d'appel à n8n dans un fichier à part
(par exemple `api.js`) et/ou un *hook* personnalisé `useMails`.

> **Pourquoi c'est important :** un fichier de 1000 lignes est difficile à relire, à corriger
> et à faire évoluer. Avec 15 `useState` au même endroit, on perd vite le fil. Découper rend
> le code plus simple à comprendre — pour toi comme pour les autres.

### 2. Alléger les commentaires

Le code est très commenté : il y a quasiment **un commentaire par ligne**, qui répète ce que
fait la ligne (par exemple `// Crée une variable…` juste au-dessus d'un `useState`).

L'intention est bonne (montrer que tu maîtrises ton code), mais un bon commentaire explique
le **« pourquoi »** d'un choix, pas le **« quoi »** — le « quoi », le code le dit déjà.

> **Pourquoi c'est important :** ces commentaires alourdissent fortement le fichier (sans eux
> et sans les lignes vides, `App.jsx` ferait environ 400 lignes au lieu de 1000). De plus, si
> tu modifies une ligne sans modifier son commentaire, le commentaire devient faux. Vise des
> commentaires plus rares, mais utiles : pour expliquer une décision non évidente.

### 3. Une relecture finale avant le rendu

Deux petits restes ont échappé à la relecture :

- La fonction `handleTestN8nConnection` (et la variable `VITE_N8N_TEST_URL`) est entièrement
  écrite mais **n'est utilisée nulle part** : c'est du « code mort ».
- Le bouton **« Générer un résumé IA »** est affiché mais n'a **aucune action** au clic.

> **Pourquoi c'est important :** un bouton qui ne fait rien donne une mauvaise impression à
> l'utilisateur. Le réflexe à prendre : avant de rendre un projet, faire un dernier tour pour
> supprimer le code inutilisé et vérifier que tout ce qui est affiché fonctionne.

### 4. Rendre le projet portable (chemin de fichier)

Dans le workflow n8n, le fichier JSON est enregistré à un chemin **écrit en dur** :
`D:/assistant_mails/data/mails-today.json`. Ton rapport le mentionne d'ailleurs comme une
limite.

> **Pourquoi c'est important :** ce chemin n'existe que sur ton ordinateur. Quelqu'un qui
> importe ton workflow ne peut pas l'exécuter sans le modifier. Le sujet insiste sur des
> solutions « robustes et réutilisables » : un chemin relatif ou configurable rend le projet
> utilisable partout.

### 5. Repenser un détail d'ergonomie

Quand on clique sur « Répondre » ou « Lire tout le mail », une bulle apparaît pour dire
*« la zone s'affiche plus bas, descendez »*, avec un défilement automatique.

C'est astucieux, mais cela **contourne** un souci de mise en page : l'action et son résultat
sont éloignés à l'écran. Une fenêtre (*modale*), un panneau latéral, ou un affichage juste
sous la carte cliquée éviterait d'avoir à guider l'utilisateur.

> Petit bonus : le badge d'accueil affiche « React + n8n + **OpenAI** », alors que le projet
> utilise **Groq**. Une incohérence d'affichage facile à corriger.

### 6. Adopter les *Conventional Commits*

Bonne nouvelle d'abord : le **découpage** de tes commits est déjà très correct. Il ne manque
que la **convention de nommage**. Les *Conventional Commits* préfixent chaque message par son
type :

```
feat: ajout du filtrage des mails par statut
fix: correction de l'envoi des réponses manuelles
docs: ajout du rapport du projet
```

> **Pourquoi c'est important :** c'est un standard très répandu en entreprise. Il rend
> l'historique plus lisible et permet même de générer automatiquement des notes de version.
> C'est une habitude simple à prendre et qui fait gagner des points.

---

## Une question pour toi

On aimerait beaucoup avoir **ton ressenti sur cet exercice** :

- Qu'est-ce qui t'a le plus intéressé ? Le plus posé de difficulté ?
- L'intégration entre React et n8n, la partie IA avec Groq : qu'en as-tu pensé ?
- Le sujet t'a-t-il semblé clair, trop long, trop court ?

Ton retour nous aide aussi à faire évoluer l'exercice.

---

## La suite

Encore une fois : pour une 1ʳᵉ année d'informatique, c'est un **bon travail**, complet et
soigné, et on est contents de ce que tu as produit. Les pistes ci-dessus sont des points de progression
classiques — personne ne les maîtrise dès la première année.

**Te sens-tu capable de tenir compte de ces améliorations pour la suite ?** Tu n'as pas
besoin de tout reprendre maintenant : ce qui nous intéresse, c'est de savoir si ces principes
(découpage en composants, code plus léger, portabilité, relecture finale) te parlent et si tu
te vois les appliquer sur tes prochains projets.

On reste disponibles pour en discuter et répondre à tes questions.

— L'équipe USTS
