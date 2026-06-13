# Architecture Technique

## Stack Technologique

### Backend
- **Runtime**: Node.js 16+
- **Framework**: Express.js
- **Database**: SQLite3
- **Authentication**: JWT + bcrypt
- **Validation**: Custom middleware

### Frontend
- **Framework**: React 18
- **Router**: React Router v6
- **HTTP Client**: Axios
- **UI**: Tailwind CSS + Lucide Icons
- **Build Tool**: Create React App

## Flux de Données

```
┌─────────────────────────────────────────────────────┐
│                  Frontend (React)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │   Chatbot    │  │ Admin Login  │  │ Dashboard │ │
│  └──────────────┘  └──────────────┘  └───────────┘ │
└────────────┬────────────────────────────────────────┘
             │
         HTTP/REST
             │
┌────────────▼────────────────────────────────────────┐
│                  Backend (Express)                   │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │ Auth Routes  │  │ Chat Routes  │  │ API Routes│ │
│  └──────────────┘  └──────────────┘  └───────────┘ │
│         │                │                  │       │
│         └────────────────┼──────────────────┘       │
│                          │                          │
│         ┌────────────────▼─────────────────┐        │
│         │     Controllers & Models         │        │
│         └────────────────┬─────────────────┘        │
└────────────┬─────────────────────────────────────────┘
             │
         Database
             │
┌────────────▼────────────────────────────────────────┐
│              SQLite Database                        │
│  ┌─────────┐ ┌────────┐ ┌──────────┐ ┌────────┐   │
│  │ admins  │ │sessions│ │prospects │ │ebooks  │   │
│  └─────────┘ └────────┘ └──────────┘ └────────┘   │
└─────────────────────────────────────────────────────┘
```

## Cycle de Vie d'une Conversation

1. **Création de Session**
   - Visiteur accède au site
   - Frontend crée une session via `/api/chat/session`
   - Backend génère un UUID et stocke l'IP/User-Agent

2. **Messages**
   - Utilisateur envoie un message
   - Frontend POST vers `/api/chat/message`
   - Backend génère une réponse IA
   - Messages stockés en DB pour l'historique

3. **Qualification**
   - Après N messages, formulaire de capture affiché
   - Visiteur remplit nom, email, WhatsApp
   - Frontend POST vers `/api/prospects`
   - Prospect cré�� et session marquée comme convertie

4. **Suivi Admin**
   - Admin se connecte
   - JWT généré et stocké localement
   - Accès aux prospects et statistiques

## Modèle de Données

### Session
```javascript
{
  id: UUID,
  user_agent: string,
  ip_address: string,
  is_converted: boolean,
  created_at: timestamp,
  updated_at: timestamp
}
```

### Prospect
```javascript
{
  id: integer,
  session_id: UUID,
  name: string,
  email: string,
  whatsapp: string,
  interested_ebooks: JSON,
  main_objection: string,
  created_at: timestamp,
  updated_at: timestamp
}
```

### Ebook
```javascript
{
  id: integer,
  name: string,
  description: text,
  price: decimal,
  download_url: string,
  image_url: string,
  order_index: integer,
  is_active: boolean,
  created_at: timestamp,
  updated_at: timestamp
}
```

## Endpoints Sécurisés

### Public
- `POST /api/chat/session`
- `POST /api/chat/message`
- `GET /api/chat/history/:sessionId`
- `POST /api/prospects`
- `GET /api/ebooks`
- `GET /api/ebooks/:id`
- `POST /api/auth/login`

### Protégés (JWT Required)
- `GET /api/prospects`
- `GET /api/prospects/:id`
- `DELETE /api/prospects/:id`
- `POST /api/ebooks` (Admin)
- `PUT /api/ebooks/:id` (Admin)
- `DELETE /api/ebooks/:id` (Admin)
- `GET /api/stats`
- `GET /api/config`
- `PUT /api/config`

## Performance

### Optimisations
- Messages en base de données (pas de WebSocket pour MVP)
- Pagination pour les listes
- Index sur les colonnes fréquemment recherchées
- Cache localStorage pour les sessions

### Scalabilité Future
- PostgreSQL pour production
- Redis pour les sessions
- WebSockets pour le chat temps réel
- CDN pour assets statiques

## Sécurité

### Mesures Implémentées
- JWT signé avec secret fort
- Passwords hashés avec bcrypt (10 rounds)
- CORS restreint à origin configurée
- Validation des inputs
- SQL Prepared Statements (via db.js)

### À Ajouter
- Rate limiting
- HTTPS en production
- CSRF protection
- Content Security Policy
- Audit logging

---

**Pour plus d'infos, consulter README.md**
