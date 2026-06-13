# Mondji IA - Chatbot de Vente d'Ebooks

🤖 **Une solution complète et prête à l'emploi pour vendre vos ebooks avec un chatbot IA intelligent.**

## 🚀 Caractéristiques Principales

✅ **Chatbot Intelligent** - Conversations naturelles avec gestion des objections
✅ **Qualification Automatique** - Capture des prospects avec un formulaire fluide
✅ **Gestion des Ebooks** - Interface admin pour gérer vos produits
✅ **Tableau de Bord** - Statistiques en temps réel (ventes, prospects, revenus)
✅ **Responsive Design** - Fonctionne sur tous les appareils
✅ **Base de Données SQLite** - Stockage local sécurisé
✅ **API REST** - Facile à intégrer et à étendre

## 📋 Architecture

```
mondji-ia/
├── server/                 # Backend Node.js/Express
│   ├── config/            # Configuration (DB, JWT)
│   ├── models/            # Modèles de données
│   ├── controllers/       # Logique métier
│   ├── routes/           # Endpoints API
│   ├── scripts/          # Scripts d'initialisation
│   └── index.js          # Point d'entrée
├── client/               # Frontend React
│   ├── src/
│   │   ├── components/   # Composants React
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   └── index.css
│   └── public/
├── database/             # Schéma SQLite
├── .env.example         # Variables d'environnement
└── README.md            # Ce fichier
```

## 🛠️ Installation

### Prérequis
- Node.js >= 16
- npm ou yarn
- SQLite3

### 1. Cloner le dépôt

```bash
git clone https://github.com/theodoradjim-create/mondji-ia.git
cd mondji-ia
```

### 2. Installer les dépendances

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 3. Configuration

```bash
# Copier le fichier .env
cp .env.example .env
```

**Éditer `.env` et configurer:**

```env
# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Database
DATABASE_PATH=./database/chatbot.db

# JWT
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRE=7d

# Admin (Première connexion)
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=AdminPassword123!
```

### 4. Initialiser la base de données

```bash
cd server
npm run init-db
```

### 5. Démarrer l'application

**Terminal 1 - Backend:**
```bash
cd server
npm start
# Le serveur démarre sur http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
# L'app React démarre sur http://localhost:3000
```

## 📱 Utilisation

### Pour les Visiteurs

1. Accédez à `http://localhost:3000`
2. Discutez avec le chatbot
3. Remplissez le formulaire de prospect
4. Recevez les ebooks

### Pour les Administrateurs

1. Allez sur `http://localhost:3000/admin/login`
2. Connectez-vous avec vos identifiants
3. Consultez le tableau de bord
4. Gérez les ebooks et les prospects

## 🔌 API Endpoints

### Authentification
- `POST /api/auth/login` - Connexion admin
- `POST /api/auth/init-admin` - Créer le premier admin
- `GET /api/auth/check-admin` - Vérifier l'existence d'un admin

### Chat
- `POST /api/chat/session` - Créer une session
- `POST /api/chat/message` - Envoyer un message
- `GET /api/chat/history/:sessionId` - Obtenir l'historique

### Prospects
- `POST /api/prospects` - Créer un prospect
- `GET /api/prospects` - Lister tous les prospects (protégé)
- `GET /api/prospects/:id` - Obtenir un prospect (protégé)
- `DELETE /api/prospects/:id` - Supprimer un prospect (protégé)

### Ebooks
- `GET /api/ebooks` - Lister tous les ebooks
- `GET /api/ebooks/:id` - Obtenir un ebook
- `POST /api/ebooks` - Créer un ebook (protégé)
- `PUT /api/ebooks/:id` - Modifier un ebook (protégé)
- `DELETE /api/ebooks/:id` - Supprimer un ebook (protégé)

### Statistiques
- `GET /api/stats` - Obtenir les statistiques (protégé)
- `GET /api/stats/sales/recent` - Obtenir les ventes récentes (protégé)

## 🗄️ Structure de la Base de Données

### Tables principales

**admins** - Administrateurs du système
**sessions** - Sessions de chat des visiteurs
**messages** - Historique des messages
**prospects** - Prospects convertis
**ebooks** - Produits à vendre
**sales** - Historique des ventes
**objections** - Réponses aux objections
**config** - Configuration système

## 🔐 Sécurité

✅ JWT pour l'authentification
✅ Hash bcrypt pour les mots de passe
✅ Validation des entrées
✅ CORS configuré
✅ Variables d'environnement sensibles

## 📦 Déploiement

### Heroku

```bash
heroku create mondji-ia
heroku config:set JWT_SECRET=your-strong-secret
git push heroku main
```

### Docker

```bash
docker build -t mondji-ia .
docker run -p 5000:5000 -p 3000:3000 mondji-ia
```

## 🤝 Contribution

Les contributions sont bienvenues! Pour proposer des améliorations:

1. Fork le projet
2. Créez une branche (`git checkout -b feature/amelioration`)
3. Commit vos changements (`git commit -m 'Ajout de la feature'`)
4. Push vers la branche (`git push origin feature/amelioration`)
5. Ouvrez une Pull Request

## 📄 Licence

MIT License - voir LICENSE.md

## 📞 Support

Pour toute question ou problème:
- 📧 Email: support@mondji.ai
- 🐛 Issues: https://github.com/theodoradjim-create/mondji-ia/issues

## 🎯 Roadmap

- [ ] Intégration Stripe pour les paiements
- [ ] WhatsApp API pour les notifications
- [ ] Analyse avancée des prospects
- [ ] Multi-langue
- [ ] SMS marketing
- [ ] CRM intégré

---

**Créé avec ❤️ par Theodora Djim**
