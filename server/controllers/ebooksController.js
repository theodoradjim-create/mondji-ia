const Ebook = require('../models/Ebook');

// Obtenir tous les ebooks
exports.getAllEbooks = async (req, res) => {
  try {
    const ebooks = await Ebook.getAllEbooks();
    res.json(ebooks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtenir un ebook
exports.getEbook = async (req, res) => {
  try {
    const { id } = req.params;
    const ebook = await Ebook.getEbook(id);

    if (!ebook) {
      return res.status(404).json({ error: 'Ebook non trouvé' });
    }

    res.json(ebook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Créer un ebook (Admin)
exports.createEbook = async (req, res) => {
  try {
    const { name, description, price, downloadUrl, imageUrl } = req.body;

    if (!name || !price) {
      return res.status(400).json({ error: 'Nom et prix requis' });
    }

    const id = await Ebook.createEbook({
      name,
      description,
      price,
      downloadUrl,
      imageUrl
    });

    res.status(201).json({ message: 'Ebook créé avec succès', id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mettre à jour un ebook (Admin)
exports.updateEbook = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    await Ebook.updateEbook(id, data);
    res.json({ message: 'Ebook mise à jour avec succès' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Supprimer un ebook (Admin)
exports.deleteEbook = async (req, res) => {
  try {
    const { id } = req.params;
    await Ebook.deleteEbook(id);

    res.json({ message: 'Ebook supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
