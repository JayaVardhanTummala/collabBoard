# 🧩 CollabBoard  
A clean, real-time, modern collaboration workspace built for teams that want speed, clarity and zero bullshit.  
Think: Trello vibes × Premium UI × Instant Sync × Developer Precision.

---

## 🚀 Live Demo
👉 **Use CollabBoard here:**  
[https://collab-board-k9k30dww2-jayavardhans-projects-3ef47ba9.vercel.app](https://collab-board-seven-beta.vercel.app/)

---

## ✨ What We Built

### 🗂️ **Workspace Boards**
- Create unlimited boards  
- Clean tri-stage workflow: **To-Do → Doing → Done**  
- Drag-and-drop powered Kanban  
- Crisp shadows + micro-animations  

### ⚡ **Real-Time Sync**
- Powered by **Socket.io**  
- Instantly sync tasks across all collaborators  
- Optimistic UI → instant feedback  

### 👥 **Collaboration**
- Invite collaborators via email  
- Board-level access  
- Real-time updates for every member  

### 🎨 **Premium UI / UX**
- Smooth transitions (Framer Motion)  
- Clean layout with strong typography  
- Carefully tuned shadows, spacing, hierarchy  
- Fast, lightweight, responsive  

### 🔐 **Authentication**
- JWT Auth  
- Protected routes  
- User persistence  

---

## 🧱 Tech Stack

### **Frontend** (Deployed on Vercel)
- **React + Vite**
- **Zustand** for state management
- **Tailwind CSS**
- **Framer Motion**
- **Lucide Icons**
- **React Hot Toast**

### **Backend** (Deployed on Railway)
- **Node.js + Express.js**
- **MongoDB + Mongoose**
- **Socket.io**
- **JWT Authentication**

---

## 📌 Folder Structure

```
client/
 ├── components/
 ├── pages/
 ├── store/
 ├── utils/
 └── main.jsx

server/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── sockets/
 └── index.js
```

---

## 🌐 Environment Variables

### **Client (`client/.env`)**
```
VITE_API_URL=your_backend_url_here
VITE_SOCKET_URL=your_socket_url_here
```

### **Server (`server/.env`)**
```
MONGO_URI=your_mongo_connection
JWT_SECRET=choose_a_strong_secret
CLIENT_URL=https://your-vercel-url.vercel.app
```

---

## 🛠️ Run Locally

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

## 📸 Screenshots  
(Add after deployment if needed)
- Dashboard  
- Board Details  
- Task Modal  
- Invite System  

---

## 🤝 Contributing
PRs welcome — just keep the code **clean, readable, scalable**.

---

## 📄 License
MIT © 2025

---

## ❤️ Made With Love  
Crafted with discipline, clarity, and a little cinematic madness.  
**Made with love by J.**

