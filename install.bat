@echo off
REM Script d'installation pour Windows

echo 🚀 Installation de Mondji IA...

REM Créer les dossiers nécessaires
if not exist database mkdir database
if not exist server\node_modules mkdir server\node_modules
if not exist client\node_modules mkdir client\node_modules

REM Backend
echo 📦 Installation des dépendances backend...
cd server
call npm install
echo ✅ Backend installé

REM Frontend
echo 📦 Installation des dépendances frontend...
cd ..
cd client
call npm install
echo ✅ Frontend installé

cd ..

REM Configuration
echo ⚙️ Configuration...
if not exist .env (
  copy .env.example .env
  echo ✅ Fichier .env créé
) else (
  echo ℹ️ Fichier .env existant conservé
)

echo.
echo ✅ Installation terminée!
echo.
echo Prochaines étapes:
echo 1. Éditer le fichier .env avec vos paramètres
echo 2. Exécuter: npm run init-db
echo 3. Démarrer avec: npm run dev
echo.
pause
