const Admin = require('../models/Admin');

// Contrôleur de connexion
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe requis' });
    }

    const result = await Admin.authenticateAdmin(email, password);
    res.json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

// Contrôleur d'initialisation du premier admin
exports.initializeAdmin = async (req, res) => {
  try {
    const adminExists = await Admin.adminExists();
    if (adminExists) {
      return res.status(400).json({ error: 'Un administrateur existe déjà' });
    }

    const { email, password, name } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe requis' });
    }

    const admin = await Admin.createAdmin(email, password, name);
    res.status(201).json({ message: 'Administrateur créé avec succès', admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Vérifier si un admin existe
exports.checkAdmin = async (req, res) => {
  try {
    const exists = await Admin.adminExists();
    res.json({ adminExists: exists });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
