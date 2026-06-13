#!/bin/bash

# Script d'installation rapide pour Mondji IA

echo "🚀 Installation de Mondji IA..."

# Créer les dossiers nécessaires
mkdir -p database
mkdir -p server/node_modules
mkdir -p client/node_modules

# Backend
echo "📦 Installation des dépendances backend..."
cd server
npm install
echo "✅ Backend installé"

# Frontend
echo "📦 Installation des dépendances frontend..."
cd ../client
npm install
echo "✅ Frontend installé"

cd ..

# Configuration
echo "⚙️ Configuration..."
if [ ! -f .env ]; then
  cp .env.example .env
  echo "✅ Fichier .env créé"
else
  echo "ℹ️ Fichier .env existant conservé"
fi

echo ""
echo "✅ Installation terminée!"
echo ""
echo "Prochaines étapes:"
echo "1. Éditer le fichier .env avec vos paramètres"
echo "2. Exécuter: npm run init-db"
echo "3. Démarrer avec: npm run dev"
echo ""
