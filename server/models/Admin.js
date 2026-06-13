const bcrypt = require('bcryptjs');
const db = require('../config/database');
const { generateToken } = require('../config/jwt');

// Créer un nouvel administrateur
async function createAdmin(email, password, name = '') {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.run(
      'INSERT INTO admins (email, password, name) VALUES (?, ?, ?)',
      [email, hashedPassword, name]
    );
    return { id: result.id, email, name };
  } catch (err) {
    throw new Error('Erreur lors de la création de l\'administrateur: ' + err.message);
  }
}

// Authentifier un administrateur
async function authenticateAdmin(email, password) {
  try {
    const admin = await db.get(
      'SELECT * FROM admins WHERE email = ?',
      [email]
    );
    
    if (!admin) {
      throw new Error('Identifiants invalides');
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new Error('Identifiants invalides');
    }

    const token = generateToken({ id: admin.id, email: admin.email });
    return {
      token,
      admin: { id: admin.id, email: admin.email, name: admin.name }
    };
  } catch (err) {
    throw new Error(err.message);
  }
}

// Obtenir tous les administrateurs
async function getAllAdmins() {
  return await db.all('SELECT id, email, name, created_at FROM admins');
}

// Vérifier si un administrateur existe
async function adminExists() {
  const result = await db.get('SELECT COUNT(*) as count FROM admins');
  return result && result.count > 0;
}

module.exports = {
  createAdmin,
  authenticateAdmin,
  getAllAdmins,
  adminExists
};
