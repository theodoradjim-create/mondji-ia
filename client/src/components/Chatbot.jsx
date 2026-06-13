import React, { useState, useEffect, useRef } from 'react';
import { Send, Menu, X, LogOut } from 'lucide-react';
import axios from 'axios';

const Chatbot = () => {
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'Bienvenue! 👋 Je suis votre assistant IA. Je suis ici pour vous aider à trouver l\'ebook parfait pour vos besoins.'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showProspectForm, setShowProspectForm] = useState(false);
  const [prospectData, setProspectData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    interestedEbooks: [],
    mainObjection: ''
  });
  const messagesEndRef = useRef(null);

  // Initialiser la session au montage
  useEffect(() => {
    initializeSession();
  }, []);

  // Scroller vers le bas du chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const initializeSession = async () => {
    try {
      const response = await axios.post('/api/chat/session');
      setSessionId(response.data.sessionId);
      localStorage.setItem('chatSessionId', response.data.sessionId);
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || !sessionId || loading) return;

    // Ajouter le message de l'utilisateur
    const userMessage = {
      id: messages.length + 1,
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('/api/chat/message', {
        sessionId,
        message: input
      });

      // Ajouter la réponse du chatbot
      const assistantMessage = {
        id: messages.length + 2,
        role: 'assistant',
        content: response.data.response
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Afficher le formulaire après quelques messages
      if (messages.length > 6 && !showProspectForm) {
        setTimeout(() => setShowProspectForm(true), 2000);
      }
    } catch (err) {
      const errorMessage = {
        id: messages.length + 2,
        role: 'assistant',
        content: 'Désolé, une erreur est survenue. Pouvez-vous réessayer ?'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleProspectSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/prospects', {
        sessionId,
        ...prospectData
      });

      setShowProspectForm(false);
      const successMessage = {
        id: messages.length + 1,
        role: 'assistant',
        content: `Merci ${prospectData.name}! 🎉 Vos informations ont été enregistrées. Nous vous contacterons très bientôt sur WhatsApp pour conclure votre achat. Cliquez sur le bouton ci-dessous pour accéder à nos ebooks!`
      };
      setMessages(prev => [...prev, successMessage]);
    } catch (err) {
      alert('Erreur lors de l\'enregistrement. Veuillez réessayer.');
    }
  };

  const handleEbookInterest = (ebookName) => {
    setProspectData(prev => ({
      ...prev,
      interestedEbooks: [...new Set([...prev.interestedEbooks, ebookName])]
    }));
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">📚 Chatbot Vente d'Ebooks</h1>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-blue-700 rounded-lg transition">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto max-w-4xl mx-auto w-full p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-lg whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-white text-gray-800 rounded-bl-none shadow-md'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 px-4 py-3 rounded-lg rounded-bl-none shadow-md">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Prospect Form Modal */}
      {showProspectForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Intéressé? 🎯</h2>
              <button
                onClick={() => setShowProspectForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleProspectSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Votre nom"
                value={prospectData.name}
                onChange={(e) => setProspectData({ ...prospectData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <input
                type="email"
                placeholder="Votre email"
                value={prospectData.email}
                onChange={(e) => setProspectData({ ...prospectData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <input
                type="tel"
                placeholder="Numéro WhatsApp"
                value={prospectData.whatsapp}
                onChange={(e) => setProspectData({ ...prospectData, whatsapp: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition transform hover:scale-105"
              >
                Recevoir l'Offre Spéciale 🎁
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Input Form */}
      <div className="bg-white border-t border-gray-200 p-4 shadow-lg">
        <form onSubmit={sendMessage} className="max-w-4xl mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez vos questions..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 flex items-center gap-2"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
