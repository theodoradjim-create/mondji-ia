const db = require('./config/database');
const Admin = require('./models/Admin');
require('dotenv').config();

async function initializeDatabase() {
  try {
    console.log('🚀 Initialisation de la base de données...');
    
    await db.initialize();
    
    const adminExists = await Admin.adminExists();
    
    if (!adminExists) {
      console.log('📝 Création du premier administrateur...');
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
      const adminPassword = process.env.ADMIN_PASSWORD || 'AdminPassword123!';
      const adminName = 'Administrateur';
      
      await Admin.createAdmin(adminEmail, adminPassword, adminName);
      console.log(`✅ Administrateur créé:`);
      console.log(`   Email: ${adminEmail}`);
      console.log(`   Mot de passe: ${adminPassword}`);
      console.log(`\n⚠️  Changez le mot de passe lors de la première connexion!`);
    } else {
      console.log('✅ L\'administrateur existe déjà');
    }
    
    console.log('\n✅ Base de données initialisée avec succès!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Erreur lors de l\'initialisation:', err);
    process.exit(1);
  }
}

initializeDatabase();
