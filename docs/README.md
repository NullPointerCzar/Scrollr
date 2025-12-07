# Scrollr - Social Media Application

A modern social media platform built with MERN stack (MongoDB, Express, React, Node.js).

## 🚀 Live Application

**Visit:** https://scrollrmedia.vercel.app

## ✨ Features

- User authentication (signup/login)
- Create and view posts
- Follow/unfollow users
- Real-time feed updates
- Responsive design with Tailwind CSS

## 📋 Quick Start (Development)

### Prerequisites
- Node.js v18+
- MongoDB connection (or MongoDB Atlas)

### Setup

```bash
# Install server dependencies
cd server
npm install

# Create .env file
cat > .env << EOF
MONGO_URI=mongodb+srv://your-connection-string
PORT=5001
JWT_SECRET=your-secret-key
NODE_ENV=development
EOF

npm run dev  # Server runs on http://localhost:5001
```

```bash
# Install client dependencies (new terminal)
cd client
npm install

cat > .env << EOF
VITE_API_URL=http://localhost:5001
EOF

npm run dev  # Client runs on http://localhost:5173
```

## 📦 Tech Stack

**Frontend:** React 19, Vite, Tailwind CSS, Axios, React Router  
**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt

## 📚 Documentation

- [API Documentation](./API.md)
- [Database Schema](./DATABASE.md)
- [Frontend Architecture](./FRONTEND.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [Setup Guide](./SETUP.md)

## 🔐 Authentication

Login with credentials to access the feed. JWT tokens are stored in localStorage and automatically included in API requests.

## 📝 License

ISC

## 👨‍💻 Author

Created by [Your Name]

---

**For detailed information, see the documentation files listed above.**

