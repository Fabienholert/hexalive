# HexaLive - Application de Gestion de Calendrier

## Description

HexaLive est une application web moderne permettant de gérer des demandes de rendez-vous et d'événements via un calendrier interactif. L'application offre une interface utilisateur intuitive avec des fonctionnalités de planification avancées.

## Prérequis

- Node.js (version 16.0.0 ou supérieure)
- npm (version 8.0.0 ou supérieure)
- Un navigateur web moderne (Chrome, Firefox, Safari, Edge)

## Installation

1. Clonez le dépôt :

```bash
git clone [URL_DU_REPO]
cd hexalive/frontend
```

2. Installez les dépendances :

```bash
npm install
```

3. Créez un fichier `.env` à la racine du projet frontend et ajoutez les variables d'environnement nécessaires :

```env
VITE_API_URL=http://localhost:3000
```

## Démarrage de l'application

1. Pour lancer l'application en mode développement :

```bash
npm run dev
```

L'application sera accessible à l'adresse : `http://localhost:5173`

2. Pour construire l'application pour la production :

```bash
npm run build
```

## Fonctionnalités principales

- Calendrier interactif avec sélection de dates
- Formulaire de demande de rendez-vous avec :
  - Sélection des participants
  - Choix du motif (report photo, interview, chronique album)
  - Gestion des informations de contact
- Interface responsive adaptée à tous les appareils
- Design moderne avec effets visuels (glassmorphism, animations)

## Structure du projet

```
frontend/
├── src/
│   ├── pages/
│   │   └── calendrier/
│   │       ├── calendrier.jsx
│   │       └── calendrier.scss
│   ├── components/
│   ├── assets/
│   └── variables.scss
├── public/
├── package.json
└── vite.config.js
```

## Technologies utilisées

- React.js
- Vite
- SASS/SCSS
- React DatePicker
- Autres dépendances (voir package.json)

## Personnalisation

Le fichier `src/variables.scss` contient les variables de style principales pour personnaliser l'apparence de l'application :

- Couleurs
- Bordures
- Ombres
- Transitions

## Résolution des problèmes courants

1. **Erreur de compilation SCSS**

   - Vérifiez que toutes les dépendances sont installées
   - Exécutez `npm install` à nouveau

2. **Problèmes d'affichage**
   - Assurez-vous d'utiliser un navigateur à jour
   - Videz le cache du navigateur

## Support

Pour toute question ou problème, veuillez :

1. Consulter la documentation
2. Vérifier les issues GitHub
3. Créer une nouvelle issue si nécessaire

## Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

## Licence

[Votre licence]
