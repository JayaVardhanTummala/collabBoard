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

