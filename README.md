# 💬 Chatty — Real-Time Fullstack Chat Application

[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.x-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)](LICENSE)

A modern, production-ready, real-time chat application built with the **MERN stack** and **Socket.IO**. Features include instant messaging, image sharing via Cloudinary, JWT-based authentication, online presence tracking, customizable themes, and a fully responsive UI.

[Live Demo](https://fullstack-chat-app-e6ut.onrender.com) · [Report Bug](https://github.com/Arin004joshi/fullstack-chat-app/issues) · [Request Feature](https://github.com/Arin004joshi/fullstack-chat-app/issues)

</div>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
  - [Clone the Repository](#1-clone-the-repository)
  - [Backend Setup](#2-backend-setup)
  - [Frontend Setup](#3-frontend-setup)
  - [Running the Full Application](#4-running-the-full-application)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
  - [Authentication Endpoints](#authentication-endpoints)
  - [Messaging Endpoints](#messaging-endpoints)
- [WebSocket Events](#-websocket-events)
- [Database Schema](#-database-schema)
- [Authentication & Security](#-authentication--security)
- [State Management](#-state-management)
- [Theming](#-theming)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgements](#-acknowledgements)

---

## 🌟 Overview

**Chatty** is a fullstack, real-time chat platform designed with a focus on performance, security, and user experience. It leverages WebSocket technology for instantaneous bi-directional communication, a robust REST API for data persistence, and a modern React frontend for a seamless conversational interface.

The application is architected as a decoupled monorepo — the **backend** (Express + Socket.IO server) and **frontend** (React SPA via Vite) operate independently during development but are unified behind a single deployment via static file serving in production.

---

## ✨ Key Features

| Category | Feature | Description |
|---|---|---|
| **Messaging** | Real-Time Chat | Instant message delivery via WebSocket connections (Socket.IO) |
| **Messaging** | Image Sharing | Send and receive images with live preview; media hosted on Cloudinary CDN |
| **Messaging** | Message History | Full conversation history persisted in MongoDB, fetched on-demand |
| **Authentication** | Secure Auth Flow | JWT-based authentication with HTTP-only cookies for XSS protection |
| **Authentication** | User Registration | Sign up with full name, email, and password (bcrypt-hashed) |
| **Authentication** | Persistent Sessions | 7-day token expiry with automatic re-authentication on page refresh |
| **User Experience** | Online Presence | Real-time tracking and display of which users are currently online |
| **User Experience** | Profile Management | Upload and update profile pictures via Cloudinary integration |
| **User Experience** | Theming | Light and Dark mode support with DaisyUI, persisted in localStorage |
| **User Experience** | Responsive Design | Fully adaptive layout — optimized for desktop, tablet, and mobile |
| **User Experience** | Toast Notifications | Non-blocking feedback for actions (login, errors, message sent, etc.) |
| **User Experience** | Loading Skeletons | Skeleton placeholders for contacts sidebar and message loading states |
| **Infrastructure** | Health Check | `/health` endpoint for uptime monitoring and deployment readiness probes |

---

## 🛠 Tech Stack

### Backend

| Technology | Purpose | Version |
|---|---|---|
| **Node.js** | JavaScript runtime | 18+ |
| **Express.js** | HTTP server & REST API framework | 4.18.x |
| **Socket.IO** | Real-time bidirectional WebSocket communication | 4.8.x |
| **MongoDB** | NoSQL document database | — |
| **Mongoose** | MongoDB ODM for schema definition and validation | 8.14.x |
| **JSON Web Token** | Stateless authentication via signed tokens | 9.0.x |
| **bcrypt.js** | Password hashing with salt rounds | 2.4.x |
| **Cloudinary** | Cloud-based image hosting and transformation | 1.41.x |
| **cookie-parser** | HTTP cookie parsing middleware | 1.4.x |
| **cors** | Cross-Origin Resource Sharing middleware | 2.8.x |
| **dotenv** | Environment variable management | 16.6.x |
| **nodemon** | Development auto-restart on file changes | 3.1.x |

### Frontend

| Technology | Purpose | Version |
|---|---|---|
| **React** | Component-based UI library | 19.1.x |
| **Vite** | Next-generation frontend build tool & dev server | 6.3.x |
| **React Router DOM** | Client-side routing and navigation | 7.6.x |
| **Zustand** | Lightweight, hook-based state management | 5.0.x |
| **Socket.IO Client** | WebSocket client for real-time communication | 4.8.x |
| **Axios** | Promise-based HTTP client | 1.10.x |
| **TailwindCSS** | Utility-first CSS framework | 3.4.x |
| **DaisyUI** | Tailwind CSS component library with theming | 5.0.x |
| **Lucide React** | Beautiful, consistent icon set | 0.525.x |
| **React Hot Toast** | Lightweight toast notification library | 2.5.x |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                          CLIENT (Browser)                           │
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐  │
│  │  React SPA   │  │  Zustand     │  │  Socket.IO Client        │  │
│  │  (Vite)      │  │  Stores      │  │  (Real-time events)      │  │
│  └──────┬───────┘  └──────┬───────┘  └────────────┬─────────────┘  │
│         │                 │                        │                 │
└─────────┼─────────────────┼────────────────────────┼─────────────────┘
          │ HTTP (REST)     │                        │ WebSocket
          ▼                 ▼                        ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        SERVER (Node.js)                             │
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐  │
│  │  Express.js  │  │  Auth        │  │  Socket.IO Server        │  │
│  │  REST API    │  │  Middleware   │  │  (Event broadcasting)    │  │
│  └──────┬───────┘  └──────┬───────┘  └────────────┬─────────────┘  │
│         │                 │                        │                 │
│         ▼                 ▼                        ▼                 │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                    Controllers Layer                         │   │
│  │     auth.controller.js  ←→  message.controller.js           │   │
│  └──────────────────────────┬───────────────────────────────────┘   │
│                              │                                      │
└──────────────────────────────┼──────────────────────────────────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                                 ▼
     ┌─────────────────┐              ┌─────────────────┐
     │   MongoDB Atlas  │              │   Cloudinary     │
     │   (Data Store)   │              │   (Image CDN)    │
     └─────────────────┘              └─────────────────┘
```

### Request Flow

1. **Authentication**: Client sends credentials → Express validates → JWT issued as HTTP-only cookie
2. **REST API Calls**: Axios sends requests with cookies → `protectRoute` middleware verifies JWT → Controller processes request → Response returned
3. **Real-Time Messaging**: On login, client establishes Socket.IO connection with `userId` → Server maps `userId → socketId` → On message send, server emits `newMessage` to receiver's socket → Client store updates instantly

---

## 📁 Project Structure

```
Chat-App/
├── package.json                    # Root package — monorepo build & start scripts
├── .gitignore                      # Git ignore rules
│
├── backend/
│   ├── package.json                # Backend dependencies and scripts
│   ├── .env                        # Environment variables (not committed)
│   └── src/
│       ├── index.js                # Express server entry point, CORS config, route mounting
│       ├── controllers/
│       │   ├── auth.controller.js  # Signup, login, logout, profile update, auth check
│       │   └── message.controller.js # Get users, get messages, send messages
│       ├── middleware/
│       │   └── auth.middleware.js  # JWT verification & route protection
│       ├── models/
│       │   ├── user.model.js       # Mongoose User schema (email, fullName, password, profilePic)
│       │   └── message.model.js    # Mongoose Message schema (senderId, receiverId, text, image)
│       ├── routes/
│       │   ├── auth.route.js       # Auth route definitions (POST/GET/PUT)
│       │   └── message.route.js    # Message route definitions (GET/POST)
│       └── lib/
│           ├── db.js               # MongoDB connection via Mongoose
│           ├── cloudinary.js       # Cloudinary SDK configuration
│           ├── socket.js           # Socket.IO server setup & online user tracking
│           └── utils.js            # JWT token generation & cookie configuration
│
└── frontend/
    ├── package.json                # Frontend dependencies and scripts
    ├── vite.config.js              # Vite configuration
    ├── tailwind.config.js          # TailwindCSS configuration
    ├── postcss.config.js           # PostCSS configuration
    ├── eslint.config.js            # ESLint configuration
    ├── index.html                  # HTML entry point
    ├── .env                        # Frontend environment variables
    ├── public/                     # Static assets (avatar.png, etc.)
    └── src/
        ├── main.jsx                # React app bootstrap with BrowserRouter
        ├── App.jsx                 # Root component — routing, auth check, theme application
        ├── index.css               # Global styles & Tailwind imports
        ├── constants/
        │   └── index.js            # Theme constants (light, dark)
        ├── lib/
        │   ├── axios.js            # Axios instance with baseURL & credentials
        │   └── utils.js            # Utility functions (formatMessageTime)
        ├── store/
        │   ├── useAuthStore.js     # Auth state — login, signup, logout, socket management
        │   ├── useChatStore.js     # Chat state — users, messages, subscriptions
        │   └── useThemeStore.js    # Theme state — persisted theme preference
        ├── components/
        │   ├── Navbar.jsx          # Top navigation bar with auth-aware links
        │   ├── Sidebar.jsx         # Contact list with online filter toggle
        │   ├── ChatContainer.jsx   # Message display area with auto-scroll
        │   ├── ChatHeader.jsx      # Selected user info with online status
        │   ├── MessageInput.jsx    # Text input with image attachment support
        │   ├── NoChatSelected.jsx  # Placeholder when no conversation is active
        │   ├── AuthImagePattern.jsx# Decorative pattern for auth pages
        │   └── skeletons/          # Loading skeleton components
        │       ├── SidebarSkeleton.jsx
        │       └── MessageSkeleton.jsx
        └── pages/
            ├── HomePage.jsx        # Main chat interface (Sidebar + ChatContainer)
            ├── LoginPage.jsx       # Login form with validation
            ├── SignUpPage.jsx      # Registration form with validation
            ├── ProfilePage.jsx     # User profile view & avatar upload
            └── SettingsPage.jsx    # Theme selector with live chat preview
```

---

## 📋 Prerequisites

Ensure the following are installed on your system before proceeding:

| Tool | Min Version | Installation |
|---|---|---|
| **Node.js** | 18.x | [Download](https://nodejs.org/) |
| **npm** | 9.x | Bundled with Node.js |
| **Git** | 2.x | [Download](https://git-scm.com/) |

You will also need accounts for the following services:

| Service | Purpose | Sign Up |
|---|---|---|
| **MongoDB Atlas** | Cloud database | [mongodb.com/atlas](https://www.mongodb.com/atlas) |
| **Cloudinary** | Image hosting | [cloudinary.com](https://cloudinary.com/) |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Arin004joshi/fullstack-chat-app.git
cd fullstack-chat-app
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# (or create .env manually — see Environment Variables section below)

# Start development server with hot-reload
npm run dev
```

The backend server will start on `http://localhost:5001`.

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```

The frontend will be available at `http://localhost:5173`.

### 4. Running the Full Application

From the **project root**, you can use the unified scripts:

```bash
# Install all dependencies (backend + frontend) and build the frontend
npm run build

# Start the production server (serves backend API + built frontend)
npm start
```

---

## 🔐 Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
# ─── Server ─────────────────────────────────────────────
PORT=5001
NODE_ENV=development

# ─── Database ───────────────────────────────────────────
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority

# ─── Authentication ─────────────────────────────────────
JWT_SECRET=your_super_secret_jwt_key_here

# ─── Cloudinary (Image Uploads) ─────────────────────────
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

> [!CAUTION]
> **Never commit your `.env` file to version control.** The `.gitignore` is already configured to exclude it. Rotate any credentials that may have been exposed.

> [!TIP]
> For the `JWT_SECRET`, use a cryptographically random string of at least 32 characters. You can generate one with:
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
> ```

---

## 📡 API Reference

All endpoints are prefixed with `/api`. Authentication-protected routes require a valid `jwt` cookie.

### Authentication Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/signup` | ✗ | Register a new user account |
| `POST` | `/api/auth/login` | ✗ | Authenticate and receive JWT cookie |
| `POST` | `/api/auth/logout` | ✗ | Clear authentication cookie |
| `GET` | `/api/auth/check` | ✓ | Verify current authentication status |
| `PUT` | `/api/auth/update-profile` | ✓ | Update user profile picture |

#### `POST /api/auth/signup`

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Success Response (201):**
```json
{
  "_id": "664f1a2b3c4d5e6f7a8b9c0d",
  "fullName": "John Doe",
  "email": "john@example.com",
  "profilePic": ""
}
```

**Validation Rules:**
- All fields are required
- Password must be at least **6 characters**
- Email must be unique (no duplicate accounts)

#### `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Success Response (200):**
```json
{
  "_id": "664f1a2b3c4d5e6f7a8b9c0d",
  "fullName": "John Doe",
  "email": "john@example.com",
  "profilePic": "https://res.cloudinary.com/..."
}
```

> [!NOTE]
> Login returns a generic `"Invalid credentials"` message for both wrong email and wrong password to prevent user enumeration attacks.

#### `PUT /api/auth/update-profile`

**Request Body:**
```json
{
  "profilePic": "data:image/png;base64,iVBORw0KGgo..."
}
```

The image is uploaded to Cloudinary and the returned secure URL is persisted in the database.

---

### Messaging Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/messages/users` | ✓ | List all users except the authenticated user |
| `GET` | `/api/messages/:id` | ✓ | Fetch message history with a specific user |
| `POST` | `/api/messages/send/:id` | ✓ | Send a text and/or image message to a user |

#### `GET /api/messages/users`

**Success Response (200):**
```json
{
  "filteredUser": [
    {
      "_id": "664f1a2b3c4d5e6f7a8b9c0d",
      "fullName": "Jane Smith",
      "email": "jane@example.com",
      "profilePic": "https://res.cloudinary.com/..."
    }
  ]
}
```

#### `POST /api/messages/send/:id`

**Request Body:**
```json
{
  "text": "Hello! How are you?",
  "image": "data:image/png;base64,..."
}
```

Both `text` and `image` are optional, but at least one must be provided.

**Success Response (201):**
```json
{
  "_id": "665a1b2c3d4e5f6a7b8c9d0e",
  "senderId": "664f1a2b...",
  "receiverId": "664f1a2c...",
  "text": "Hello! How are you?",
  "image": "https://res.cloudinary.com/...",
  "createdAt": "2026-04-19T12:30:00.000Z",
  "updatedAt": "2026-04-19T12:30:00.000Z"
}
```

> [!IMPORTANT]
> When a message is sent, the server immediately checks if the receiver is online. If so, the message is emitted to their socket in real-time via the `newMessage` event — no polling required.

---

## 🔌 WebSocket Events

Socket.IO is used for real-time bidirectional communication between the client and server.

### Connection Lifecycle

```
Client                                Server
  │                                      │
  │──── connect(userId) ────────────────►│  Registers userId → socketId mapping
  │                                      │
  │◄──── getOnlineusers([ids]) ─────────│  Broadcasts updated online user list
  │                                      │
  │──── (message sent via REST API) ────►│
  │                                      │  Sends newMessage to receiver socket
  │◄──── newMessage(messageObj) ────────│  (if receiver is online)
  │                                      │
  │──── disconnect ─────────────────────►│  Removes userId from map
  │                                      │
  │◄──── getOnlineusers([ids]) ─────────│  Re-broadcasts updated list
```

### Events Reference

| Event | Direction | Payload | Description |
|---|---|---|---|
| `connection` | Client → Server | `query.userId` | Establishes socket connection with user identity |
| `getOnlineusers` | Server → All Clients | `string[]` (user IDs) | Broadcasts list of currently online user IDs |
| `newMessage` | Server → Specific Client | `Message` object | Delivers a new message to the intended recipient |
| `disconnect` | Client → Server | — | Triggered on tab close or explicit disconnect |

---

## 🗄 Database Schema

### User Model

```javascript
{
  email:      { type: String, required: true, unique: true },
  fullName:   { type: String, required: true },
  password:   { type: String, required: true, minlength: 6 },  // bcrypt hash
  profilePic: { type: String, default: "" },                    // Cloudinary URL
  createdAt:  Date,  // auto-generated
  updatedAt:  Date   // auto-generated
}
```

### Message Model

```javascript
{
  senderId:   { type: ObjectId, ref: "User", required: true },
  receiverId: { type: ObjectId, ref: "User", required: true },
  text:       { type: String },                                 // optional
  image:      { type: String },                                 // Cloudinary URL, optional
  createdAt:  Date,  // auto-generated
  updatedAt:  Date   // auto-generated
}
```

---

## 🔒 Authentication & Security

The application implements multiple layers of security:

| Mechanism | Implementation | Purpose |
|---|---|---|
| **Password Hashing** | bcrypt with 10 salt rounds | Protects stored passwords against brute-force attacks |
| **JWT Tokens** | 7-day expiry, signed with `JWT_SECRET` | Stateless, tamper-proof session management |
| **HTTP-Only Cookies** | `httpOnly: true`, `sameSite: "strict"` | Prevents XSS-based token theft and CSRF attacks |
| **Secure Flag** | Enabled in production (`NODE_ENV=production`) | Ensures cookies are only sent over HTTPS |
| **CORS Policy** | Explicit origin whitelist | Restricts API access to authorized domains |
| **Generic Error Messages** | Login returns `"Invalid credentials"` for all failures | Prevents user/email enumeration |
| **Route Protection** | `protectRoute` middleware on sensitive endpoints | Ensures only authenticated users access protected resources |
| **Input Validation** | Server-side checks on all user inputs | Prevents malformed data from reaching the database |

---

## 🧠 State Management

State is managed client-side using **Zustand** — a minimal, unopinionated state management library with a hooks-based API.

### Store Architecture

| Store | File | Responsibilities |
|---|---|---|
| `useAuthStore` | `store/useAuthStore.js` | Authentication state, user object, socket lifecycle, online users list |
| `useChatStore` | `store/useChatStore.js` | Contact list, message history, message sending, real-time subscriptions |
| `useThemeStore` | `store/useThemeStore.js` | Theme preference (persisted to `localStorage`) |

### Data Flow

```
User Action → Store Method → API Call (Axios) → Server Response → Store Update → React Re-render
                                                                        │
                                Socket Event ──────────────────────────►│
```

---

## 🎨 Theming

Chatty supports **Light** and **Dark** themes powered by DaisyUI's theming system.

- Themes are applied via the `data-theme` attribute on the document root element
- The active theme is persisted in `localStorage` under the key `chat-theme`
- The Settings page provides a visual theme selector with a **live chat preview** so users can see how each theme looks before applying it

### Customizing Themes

You can extend the theme list by adding valid DaisyUI theme names to `frontend/src/constants/index.js`:

```javascript
export const THEMES = [
  "light",
  "dark",
  // Add more: "cupcake", "retro", "cyberpunk", "valentine", "night", etc.
];
```

See the full list of available themes in the [DaisyUI documentation](https://daisyui.com/docs/themes/).

---

## 🌐 Deployment

The application is production-ready and configured for deployment on **Render** (or similar platforms).

### Production Build

```bash
# From project root
npm run build    # Installs deps for backend + frontend, builds React app
npm start        # Starts the Express server (serves API + static frontend)
```

### Render Configuration

| Setting | Value |
|---|---|
| **Build Command** | `npm run build` |
| **Start Command** | `npm start` |
| **Root Directory** | `.` (project root) |
| **Node Version** | 18+ |

### Environment Variables on Render

Set all the variables listed in the [Environment Variables](#-environment-variables) section. Additionally, update:

- `NODE_ENV` → `production` (enables secure cookies and HTTPS)
- Update CORS origins in `backend/src/index.js` and `backend/src/lib/socket.js` to include your deployed frontend URL

### Post-Deployment Checklist

- [ ] Verify the `/health` endpoint returns `{ "status": "OK" }`
- [ ] Test user registration and login flow
- [ ] Confirm real-time messaging works between two browser sessions
- [ ] Validate image uploads are processed through Cloudinary
- [ ] Check that online presence indicators update correctly

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit** your changes with clear messages
   ```bash
   git commit -m "feat: add amazing feature"
   ```
4. **Push** to your fork
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open** a Pull Request with a detailed description

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Purpose |
|---|---|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation changes |
| `style:` | Code formatting (no logic change) |
| `refactor:` | Code restructuring |
| `perf:` | Performance improvement |
| `test:` | Adding or updating tests |
| `chore:` | Maintenance tasks |

---

## 📄 License

This project is licensed under the **ISC License**. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- [Socket.IO](https://socket.io/) — Real-time engine powering the WebSocket layer
- [DaisyUI](https://daisyui.com/) — Beautiful Tailwind CSS component library
- [Lucide Icons](https://lucide.dev/) — Clean, consistent icon set
- [Cloudinary](https://cloudinary.com/) — Cloud-based image management
- [Zustand](https://github.com/pmndrs/zustand) — Bear-minimum state management for React
- [Render](https://render.com/) — Cloud hosting platform for deployment

---

<div align="center">

**Built with ❤️ by [Arin Kumar Joshi](https://github.com/Arin004joshi)**

⭐ Star this repo if you found it helpful!

</div>
