const Prospect = require('../models/Prospect');
 const Session = require('../models/Session');

// Créer un nouveau prospect
exports.createProspect = async (req, res) => {
  try {
    const { sessionId, name, email, whatsapp, interestedEbooks, mainObjection } = req.body;

    if (!sessionId || !email) {
      return res.status(400).json({ error: 'SessionID et email requis' });
    }

    // Vérifier si le prospect existe déjà
    const existing = await Prospect.getProspectByEmail(email);
    if (existing) {
      return res.status(400).json({ error: 'Un prospect avec cet email existe déjà' });
    }

    const prospectId = await Prospect.createProspect(sessionId, {
      name,
      email,
      whatsapp,
      interestedEbooks: interestedEbooks || [],
      mainObjection
    });

    // Marquer la session comme convertie
    await Session.markSessionConverted(sessionId);

    res.status(201).json({
      message: 'Prospect créé avec succès',
      prospectId
    });
  } catch (err) {
    console.error('Erreur:', err);
    res.status(500).json({ error: err.message });
  }
};

// Obtenir un prospect (Admin)
exports.getProspect = async (req, res) => {
  try {
    const { id } = req.params;
    const prospect = await Prospect.getProspect(id);

    if (!prospect) {
      return res.status(404).json({ error: 'Prospect non trouvé' });
    }

    res.json(prospect);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtenir tous les prospects (Admin)
exports.getAllProspects = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const offset = (page - 1) * limit;

    const prospects = await Prospect.getAllProspects(limit, offset);
    const total = await Prospect.countProspects();

    res.json({
      prospects,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Supprimer un prospect (Admin)
exports.deleteProspect = async (req, res) => {
  try {
    const { id } = req.params;
    await Prospect.deleteProspect(id);

    res.json({ message: 'Prospect supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
