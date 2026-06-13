const Config = require('../models/Config');

// Obtenir toute la configuration
exports.getConfig = async (req, res) => {
  try {
    const config = await Config.getAllConfig();
    res.json(config);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mettre à jour la configuration (Admin)
exports.updateConfig = async (req, res) => {
  try {
    const updates = req.body;

    for (const [key, value] of Object.entries(updates)) {
      await Config.updateConfig(key, value);
    }

    res.json({ message: 'Configuration mise à jour avec succès' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
