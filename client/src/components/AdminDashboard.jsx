import React, { useState, useEffect } from 'react';
import { BarChart3, Users, ShoppingCart, TrendingUp, LogOut } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalRevenue: 0,
    totalProspects: 0,
    conversionRate: 0
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('/api/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
    } catch (err) {
      console.error('Erreur:', err);
      if (err.response?.status === 401) {
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    navigate('/admin/login');
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">📊 Tableau de Bord Admin</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            <LogOut size={20} />
            Déconnexion
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Sales */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-semibold">VENTES TOTALES</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalSales}</p>
            </div>
            <ShoppingCart className="text-green-500" size={40} />
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-semibold">REVENUS TOTAUX</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalRevenue.toFixed(2)}€</p>
            </div>
            <TrendingUp className="text-blue-500" size={40} />
          </div>
        </div>

        {/* Prospects */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-semibold">PROSPECTS</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalProspects}</p>
            </div>
            <Users className="text-purple-500" size={40} />
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-semibold">TAUX CONVERSION</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.conversionRate}%</p>
            </div>
            <BarChart3 className="text-orange-500" size={40} />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Actions Rapides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
              👁️ Voir les Prospects
            </button>
            <button className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold">
              📚 Gérer les Ebooks
            </button>
            <button className="bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-semibold">
              ⚙️ Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
