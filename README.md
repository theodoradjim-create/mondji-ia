# 🤖 Chatbot IA - Vente d'Ebooks Numériques

Application complète de chatbot IA pour accueillir vos visiteurs, comprendre leurs besoins, présenter vos ebooks et collecter les informations des prospects.

## ✅ Fonctionnalités

✅ Chatbot IA conversationnel en français
✅ Qualification des prospects par questions intelligentes
✅ Présentation persuasive des ebooks
✅ Réponse aux objections (prix, confiance, résultats, délai)
✅ Collecte de données (nom, email, WhatsApp)
✅ Interface moderne et responsive (React + Tailwind)
✅ Tableau de bord administrateur
✅ Statistiques (visiteurs, prospects, ventes)
✅ Base de données SQLite intégrée
✅ Authentification administrateur sécurisée
✅ Historique des conversations
✅ Configuration flexible des ebooks et prix

## 📚 Ebooks

1. **Marketing Digital de A à Z** - €29.99
2. **Faire plus de 100 ventes en moins d'un mois** - €39.99

## 🛠️ Technologies

- **Frontend**: React 18, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js, SQLite3
- **Authentification**: JWT, bcryptjs
- **Base de données**: SQLite
- **Langue**: Français (par défaut)

## 📁 Structure du Projet

```
mondji-ia/
├── client/                    # Frontend React
│   ├── public/
│   ├── src/
│   │   ├── components/        # Composants React
│   │   ├── pages/             # Pages de l'application
│   │   ├── styles/            # Styles Tailwind
│   │   ├── utils/             # Fonctions utilitaires
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── package.json
│   └── tailwind.config.js
├── server/                    # Backend Express
│   ├── routes/                # Routes API
│   ├── controllers/           # Logique métier
│   ├── models/                # Modèles de données
│   ├── middleware/            # Middlewares
│   ├── config/                # Configuration
│   ├── database.js            # Initialisation BD
│   └── index.js               # Point d'entrée
├── database/
│   └── schema.sql             # Schéma SQLite
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 🚀 Installation

### Prérequis
- Node.js v14+
- npm ou yarn

### Étapes

1. **Cloner le repository**
```bash
git clone https://github.com/theodoradjim-create/mondji-ia.git
cd mondji-ia
```

2. **Installer les dépendances**
```bash
npm run install:all
```

3. **Configurer les variables d'environnement**
```bash
cp .env.example .env
# Éditer .env avec vos paramètres
```

4. **Initialiser la base de données**
```bash
node server/scripts/init-db.js
```

5. **Démarrer l'application**

Mode développement (avec auto-reload):
```bash
npm run dev
```

Mode production:
```bash
npm start
```

## 📝 Configuration

### Variables d'environnement (.env)

```
# Backend
PORT=5000
NODE_ENV=development

# JWT Secret
JWT_SECRET=votre_secret_jwt_très_sécurisé
JWT_EXPIRE=7d

# Base de données
DATABASE_PATH=./database/chatbot.db

# Admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=MotDePasseSécurisé123

# Emails (optionnel)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre_email@gmail.com
SMTP_PASS=votre_mot_de_passe_app

# Liens de paiement
PAYPAL_CLIENT_ID=votre_paypal_id
STRIPE_SECRET_KEY=votre_stripe_key
```

## 🎮 Utilisation

### Pour les visiteurs
1. Accédez à http://localhost:3000
2. Interagissez avec le chatbot
3. Entrez vos informations
4. Cliquez sur le bouton d'achat

### Pour les administrateurs
1. Accédez à http://localhost:3000/admin
2. Connectez-vous avec vos identifiants
3. Consultez les statistiques
4. Gérez les ebooks et les prix
5. Visualisez les prospects collectés

## 📊 API Endpoints

### Chatbot
- `POST /api/chat/message` - Envoyer un message
- `GET /api/chat/history/:sessionId` - Historique de conversation

### Prospects
- `POST /api/prospects` - Créer un prospect
- `GET /api/prospects` - Lister les prospects (Admin)
- `GET /api/prospects/:id` - Détails d'un prospect
- `DELETE /api/prospects/:id` - Supprimer un prospect

### Ebooks
- `GET /api/ebooks` - Lister les ebooks
- `POST /api/ebooks` - Créer un ebook (Admin)
- `PUT /api/ebooks/:id` - Modifier un ebook (Admin)
- `DELETE /api/ebooks/:id` - Supprimer un ebook (Admin)

### Admin
- `POST /api/auth/login` - Connexion
- `GET /api/stats` - Statistiques
- `GET /api/stats/daily` - Statistiques journalières

## 📱 Responsive Design

L'application est fully responsive :
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 🖥️ Desktop (1024px+)

## 🔐 Sécurité

✅ Authentification JWT sécurisée
✅ Mots de passe hachés (bcryptjs)
✅ CORS configuré
✅ Protection contre les injections SQL
✅ Validation des données côté serveur
✅ Tokens JWT avec expiration

## 📈 Statistiques Disponibles

- Nombre total de visiteurs
- Nombre de prospects collectés
- Taux de conversion
- Ebook le plus demandé
- Objections les plus fréquentes
- Graphiques de tendances

## 🚀 Déploiement

### Vercel (Frontend)
```bash
cd client
npm run build
vercel deploy
```

### Heroku (Backend)
```bash
heroku create votre-app-name
git push heroku main
```

## 🎉 Commencez maintenant

```bash
npm run install:all
npm run dev
```

Accédez à http://localhost:3000 et commencez à vendre vos ebooks ! 🚀
