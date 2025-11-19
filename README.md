<<<<<<< HEAD
# CollabBoard

CollabBoard is a modern, sleek, real-time Kanban app built for teams that want *speed*, *clarity*, and *zero friction*.  
Create boards, manage tasks, collaborate instantly — all wrapped inside a beautifully crafted interface.

---

## 🚀 Live Demo
**URL:** _coming soon…_

---

## ✨ Features

### 🗂️ Boards & Workflow
- Create and manage unlimited boards  
- Clean Kanban flow (To-Do → Doing → Done)  
- Drag-and-drop tasks  
- Color-coded task labels  

### 🔥 Real-Time Collaboration
- Instant updates via Socket.io  
- Changes broadcast across all collaborators  
- Optimistic UI for snappy interactions  

### 🎨 Premium UI + UX
- Smooth motion with Framer Motion  
- Crisp card shadows, micro-interactions  
- Thoughtful spacing + typography  
- Accessible, minimal, distraction-free visuals  

### 👥 User Management
- JWT Authentication  
- Team invites  
- Board-level access  

---

## 🧱 Tech Stack

### Frontend
- **React + Vite**  
- **Zustand** (state mgmt)  
- **Tailwind CSS**  
- **Framer Motion**  
- **React Hot Toast**  

### Backend
- **Node.js + Express.js**  
- **MongoDB + Mongoose**  
- **Socket.io**  

---

## 📁 Folder Structure

```
client/
 ├── src/
 │   ├── components/
 │   ├── pages/
 │   ├── store/
 │   ├── utils/
 │   └── main.jsx
server/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── sockets/
 └── index.js
```

---

## 🔧 Environment Variables

### **Client** (`/client/.env`)
```
VITE_API_URL=http://localhost:3000
VITE_SOCKET_URL=http://localhost:3000
```

### **Server** (`/server/.env`)
```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret
CLIENT_URL=http://localhost:5173
```

---

## 🛠️ Run the Project Locally

### Frontend
```bash
cd client
npm install
npm run dev
```

### Backend
```bash
cd server
npm install
npm run dev
```

---

## 📌 API Endpoints

### **Boards**
```
POST   /boards
GET    /boards
GET    /boards/:id
DELETE /boards/:id
```

### **Tasks**
```
POST    /tasks
PATCH   /tasks/:id
DELETE  /tasks/:id
```

### **Invitations**
```
POST /boards/:id/invite
```

---

## 🧪 Screenshots
> _Add after deployment_

- Dashboard  
- Board Detail  
- Task Modal  
- Invite System  

---

## 🤝 Contributing
Contributions are welcome — but keep the code clean, consistent, and elegant.  
Beauty matters here.

---

## 📄 License
MIT License © 2025

---

## ❤️ Made with Love  
Built with focus, clarity, and a little cinematic grit.  
**Made with love by J.**

=======
# 🌉 **CollabBoard**
A lightweight, modern, real-time Kanban collaboration tool where teams can create boards, add tasks, assign colors, drag-and-drop, and collaborate instantly.

Clean UI.  
Smooth UX.  
No bullshit — just productivity. 🚀

> **Live Demo:** _Coming Soon_ (Deployment link will go here)

---

## ✨ Features

- 🎨 **Beautiful, minimal UI**  
- 🌓 **(Dark Mode… Coming Later)** – designed but postponed for release  
- 📌 **Create & manage boards**  
- 🗂️ **Drag-and-drop Kanban columns**  
- 📝 **Task modals with color tags**  
- 🔥 **Real-time sync using Socket.io**  
- 👥 **Board collaborators & invites**  
- 🧩 **Optimistic UI updates**  
- 🔐 **JWT + Auth Store for state safety**  
- ⚡ **Fast Vite + React stack**

---

## 🧱 Tech Stack

- **Frontend:** React, Vite, Zustand (Auth/Board Store), Framer Motion  
- **Backend:** Node.js, Express.js, MongoDB  
- **Realtime:** Socket.io  
- **UI Styling:** TailwindCSS + custom shadow system  
- **Notifications:** React-Hot-Toast  

---

## 🎯 Folder Structure (Frontend)

```
src
 ├── assets/
 ├── components/
 │   ├── auth/
 │   ├── board/
 │   ├── layout/
 │   ├── notifications/
 │   └── ui/
 ├── pages/
 ├── store/
 ├── utils/
 └── main.jsx
```

---

## 🚀 Getting Started

### 1️. Clone Repo
```bash
git clone https://github.com/your-username/CollabBoard.git
cd CollabBoard
```

### 2️. Install  
#### Frontend
```bash
cd client
npm install
npm run dev
```

#### Backend
```bash
cd server
npm install
npm run dev
```

---

## 🔑 Environment Variables

### **Client**
```
VITE_API_URL=http://localhost:3000
VITE_SOCKET_URL=http://localhost:3000
```

### **Server**
```
MONGO_URI=your_mongo_connection
JWT_SECRET=your_secret
CLIENT_URL=http://localhost:5173
```

---

## 📸 Screenshots
*(Add yours here after deployment)*

```
- Dashboard View
- Board Detail View
- Task Modal View
```

---

## 🧪 API Endpoints (Short Summary)

### Boards
```
POST   /boards
GET    /boards
GET    /boards/:id
PATCH  /boards/:id
DELETE /boards/:id
```

### Tasks
```
POST   /tasks
PATCH  /tasks/:id
DELETE /tasks/:id
```

### Invites
```
POST /boards/:id/invite
```

---

## 🤝 Contributing
Pull requests are welcome — but keep the code clean and the design consistent.

---

## 📝 License
MIT License © 2025 CollabBoard

---

## 🌟 Final Note  
This project is built with **precision**, **clean UI sense**, and **intent**.  
If you're reading this, you already know — we're building something legit.  

**CollabBoard → Where teams meet, work, and move.**  
🚀🔥  
>>>>>>> d695611 (added readme file)
