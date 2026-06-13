-- ===============================================
-- Base de données Chatbot IA - Vente d'Ebooks
-- ===============================================

-- Table des administrateurs
CREATE TABLE IF NOT EXISTS admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table des ebooks
CREATE TABLE IF NOT EXISTS ebooks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  price REAL NOT NULL,
  download_url TEXT,
  image_url TEXT,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table des visiteurs/sessions
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_agent TEXT,
  ip_address TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  is_converted BOOLEAN DEFAULT 0
);

-- Table des messages du chatbot
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
);

-- Table des prospects
CREATE TABLE IF NOT EXISTS prospects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  name TEXT,
  email TEXT NOT NULL,
  whatsapp TEXT,
  interested_ebooks TEXT,
  main_objection TEXT,
  qualification_score INTEGER DEFAULT 0,
  is_converted BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE,
  UNIQUE(email)
);

-- Table des ventes
CREATE TABLE IF NOT EXISTS sales (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  prospect_id INTEGER,
  ebook_id INTEGER,
  amount REAL NOT NULL,
  payment_method TEXT,
  transaction_id TEXT UNIQUE,
  status TEXT DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (prospect_id) REFERENCES prospects(id) ON DELETE SET NULL,
  FOREIGN KEY (ebook_id) REFERENCES ebooks(id) ON DELETE SET NULL
);

-- Table des objections et réponses
CREATE TABLE IF NOT EXISTS objections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  keyword TEXT NOT NULL UNIQUE,
  response TEXT NOT NULL,
  category TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table de configuration
CREATE TABLE IF NOT EXISTS config (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Index pour optimiser les requêtes
CREATE INDEX IF NOT EXISTS idx_sessions_created_at ON sessions(created_at);
CREATE INDEX IF NOT EXISTS idx_messages_session_id ON messages(session_id);
CREATE INDEX IF NOT EXISTS idx_prospects_session_id ON prospects(session_id);
CREATE INDEX IF NOT EXISTS idx_prospects_email ON prospects(email);
CREATE INDEX IF NOT EXISTS idx_sales_prospect_id ON sales(prospect_id);
CREATE INDEX IF NOT EXISTS idx_sales_status ON sales(status);
CREATE INDEX IF NOT EXISTS idx_sales_created_at ON sales(created_at);

-- Insertion des objections courantes en français
INSERT OR IGNORE INTO objections (keyword, response, category) VALUES
('prix', 'Je comprends que le prix est important. Considérez cet investissement comme un moyen d''augmenter vos revenus. Vous récupérerez votre investissement après les premières ventes. De plus, nous offrons une garantie satisfait ou remboursé.', 'prix'),
('trop cher', 'C''est un petit investissement pour des stratégies qui peuvent vous rapporter des centaines d''euros. Les clients qui ont acheté nos ebooks gagnent en moyenne 10x leur investissement.', 'prix'),
('confiance', 'Nous avons aidé plus de 5000 clients à augmenter leurs ventes. Toutes nos méthodes sont basées sur des résultats réels et testés. Vous avez une garantie 30 jours satisfait ou remboursé.', 'confiance'),
('résultats', 'Nos clients rapportent en moyenne une augmentation de 300% de leurs ventes en 3 mois. Vous recevrez des études de cas détaillées et des guides d''application.', 'résultats'),
('délai', 'Vous recevrez votre ebook immédiatement après l''achat. Vous pouvez commencer à appliquer les stratégies dès aujourd''hui. Les premiers résultats arrivent souvent en 7 jours.', 'délai'),
('garantie', 'Oui, nous offrons une garantie 30 jours 100% satisfait ou remboursé, sans questions posées. Vous n''avez aucun risque.', 'confiance'),
('contenu', 'Nos ebooks contiennent des stratégies éprouvées, des templates prêts à l''emploi, des études de cas détaillées et un accès à notre communauté exclusive.', 'résultats');

-- Insertion de la configuration par défaut
INSERT OR IGNORE INTO config (key, value) VALUES
('company_name', 'Votre Entreprise'),
('company_logo_url', ''),
('welcome_message', 'Bienvenue! Je suis votre assistant IA. Je suis ici pour vous aider à trouver l''ebook parfait pour vos besoins.'),
('business_hours_start', '09:00'),
('business_hours_end', '18:00'),
('timezone', 'Europe/Paris'),
('currency', 'EUR'),
('currency_symbol', '€');
