# Guide de Démarrage Rapide

## 🚀 Installation en 5 minutes

### Étape 1: Cloner le dépôt
```bash
git clone https://github.com/theodoradjim-create/mondji-ia.git
cd mondji-ia
```

### Étape 2: Exécuter l'installation

**Linux/Mac:**
```bash
chmod +x install.sh
./install.sh
```

**Windows:**
```bash
install.bat
```

### Étape 3: Configurer
```bash
# Éditer le fichier .env
nano .env  # ou ouvrir avec votre éditeur
```

### Étape 4: Initialiser la base de données
```bash
cd server
npm run init-db
cd ..
```

### Étape 5: Démarrer
```bash
npm run dev
```

## 🌐 Accès

- 🤖 Chatbot: http://localhost:3000
- 🔐 Admin: http://localhost:3000/admin/login
- 📡 API: http://localhost:5000/api

## 🔑 Connexion Admin

Utilisez les identifiants du fichier `.env`:
- Email: `admin@example.com` (par défaut)
- Mot de passe: `AdminPassword123!` (par défaut)

⚠️ Changez-les immédiatement après la première connexion!

## 📊 Premiers pas

1. **Testez le chatbot** - Discutez avec l'IA sur la page d'accueil
2. **Connectez-vous** - Accédez au tableau de bord admin
3. **Ajoutez des ebooks** - Créez vos premiers produits
4. **Personnalisez** - Modifiez les réponses du chatbot

## 🐛 Dépannage

### Port déjà utilisé
```bash
# Changer le port dans .env
PORT=5001
```

### Erreur de base de données
```bash
# Réinitialiser la base de données
rm database/chatbot.db
npm run init-db
```

### Problèmes de module
```bash
# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install
```

## 📚 Documentation Complète

Voir [README.md](../README.md) pour la documentation complète.

## 🎯 Prochaines Étapes

- Intégrer Stripe pour les paiements
- Configurer WhatsApp API
- Déployer en production
- Ajouter des ebooks
- Personnaliser les réponses

---

**Besoin d'aide?** Ouvrez une issue sur GitHub!
