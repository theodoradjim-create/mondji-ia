const Session = require('../models/Session');
const Prospect = require('../models/Prospect');
const Objection = require('../models/Objection');
const Ebook = require('../models/Ebook');

// Contrôleur pour envoyer un message au chatbot
exports.sendMessage = async (req, res) => {
  try {
    const { sessionId, message, userType = 'visitor' } = req.body;

    if (!sessionId || !message) {
      return res.status(400).json({ error: 'SessionID et message requis' });
    }

    // Ajouter le message de l'utilisateur
    await Session.addMessage(sessionId, 'user', message);

    // Générer la réponse du chatbot
    let response = await generateChatbotResponse(message, sessionId);

    // Ajouter la réponse du chatbot
    await Session.addMessage(sessionId, 'assistant', response);

    res.json({ 
      response,
      sessionId 
    });
  } catch (err) {
    console.error('Erreur:', err);
    res.status(500).json({ error: 'Erreur du serveur' });
  }
};

// Contrôleur pour obtenir l'historique
exports.getHistory = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const messages = await Session.getMessageHistory(sessionId);
    res.json({ messages });
  } catch (err) {
    res.status(500).json({ error: 'Erreur du serveur' });
  }
};

// Créer une nouvelle session
exports.createSession = async (req, res) => {
  try {
    const userAgent = req.headers['user-agent'];
    const ipAddress = req.ip || req.connection.remoteAddress;

    const sessionId = await Session.createSession(userAgent, ipAddress);
    res.json({ sessionId });
  } catch (err) {
    res.status(500).json({ error: 'Erreur du serveur' });
  }
};

// Fonction pour générer les réponses du chatbot
async function generateChatbotResponse(userMessage, sessionId) {
  const messageLower = userMessage.toLowerCase();

  // Vérifier les intentions de l'utilisateur
  if (messageLower.includes('salut') || messageLower.includes('bonjour') || messageLower.includes('hi')) {
    return `Bienvenue! 👋 Je suis votre assistant IA. Je suis ici pour vous présenter nos ebooks extraordinaires qui peuvent transformer votre business. Quel est votre principal défi en ce moment ? (ventes, marketing, ou autre ?)`;
  }

  if (messageLower.includes('ebook') || messageLower.includes('livre')) {
    const ebooks = await Ebook.getAllEbooks();
    let response = `Nous avons ${ebooks.length} ebooks fantastiques :\n\n`;
    ebooks.forEach((eb, idx) => {
      response += `${idx + 1}. **${eb.name}** - ${eb.price}€\n`;
      response += `   ${eb.description}\n\n`;
    });
    response += `Lequel vous intéresse le plus ?`;
    return response;
  }

  // Vérifier les objections courantes
  const objection = await Objection.getObjectionResponse(userMessage);
  if (objection) {
    return objection.response;
  }

  // Questions de qualification
  if (messageLower.includes('vente') || messageLower.includes('vendre')) {
    return `Excellent! 🎯 Augmenter les ventes est un défi majeur pour beaucoup. Nos ebooks contiennent les stratégies éprouvées que utilisent les top entrepreneurs. Combien de ventes cherchez-vous à réaliser par mois ?`;
  }

  if (messageLower.includes('prix') || messageLower.includes('coût')) {
    return `Excellent question! 💰 Nos ebooks sont très abordables (à partir de 29.99€) et vous les récupérez immédiatement. C'est un petit investissement pour un ROI potentiel énorme. Avez-vous d'autres questions ?`;
  }

  if (messageLower.includes('marketing') || messageLower.includes('digital')) {
    return `Le marketing digital est essentiel! 📱 Notre ebook "Marketing Digital de A à Z" couvre tout ce que vous devez savoir. Il contient des stratégies concrètes que vous pouvez appliquer dès maintenant. Ça vous intéresse ?`;
  }

  // Réponse par défaut
  return `C'est intéressant! 🤔 Pouvez-vous m'en dire un peu plus ? Avez-vous des questions sur nos ebooks ou voulez-vous en savoir plus sur une stratégie particulière ?`;
}
