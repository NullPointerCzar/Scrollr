# Deployment Guide

## Vercel (Frontend) + Render (Backend)

### Backend Deployment (Render)

#### 1. Create Render Account
- Go to [render.com](https://render.com)
- Sign up with GitHub

#### 2. Create Web Service
- Click "New +" → "Web Service"
- Connect your GitHub repository
- Select `Scrollr` repository
- Build command: `npm install`
- Start command: `npm start`

#### 3. Set Environment Variables
Go to "Environment" tab and add:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/scrollr
PORT=5000
JWT_SECRET=your-production-secret-key
NODE_ENV=production
```

#### 4. Get Your Render URL
After deployment, copy the URL (e.g., `https://scrollr-api.onrender.com`)

---

### Frontend Deployment (Vercel)

#### 1. Create Vercel Account
- Go to [vercel.com](https://vercel.com)
- Sign up with GitHub

#### 2. Deploy Project
- Click "New Project"
- Select `Scrollr` repository
- Framework: **Vite**
- Root directory: `./client`

#### 3. Set Environment Variables
Go to "Settings" → "Environment Variables":

```
VITE_API_URL=https://scrollr-api.onrender.com
```

**Critical:** Change `scrollr-api.onrender.com` to your actual Render URL!

#### 4. Deploy
Click "Deploy" and wait for build to complete

---

## Critical Issues to Fix

### Issue 1: axiosInstance.js Using Undefined ENV Variable

**Problem:** If `VITE_API_URL` is not set, baseURL becomes `undefined`

**Fix:**
```javascript
// client/src/api/axiosInstance.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
```

### Issue 2: Server CORS Not Allowing Vercel Domain

**Problem:** Your CORS only allows hardcoded domains

**Fix - Make it flexible:**
```javascript
// server/server.js
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.FRONTEND_URL, // Set in .env for production
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
```

**Add to .env (server):**
```env
FRONTEND_URL=https://your-vercel-app.vercel.app
```

### Issue 3: ProtectedRoute Silent Failure

**Problem:** If token expires, user gets blank page instead of redirecting to login

**Fix:**
```jsx
// client/src/components/ProtectedRoute.jsx
import { Navigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) return <div>Loading...</div>;

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
```

### Issue 4: Login Response Not Properly Stored

**Problem:** Token might not persist across refresh

**Fix - Update AuthContext:**
```jsx
// client/src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Restore user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loginUser = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("token", data.token);
    setUser(data);
  };

  const logoutUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
```

---

## Deployment Checklist

### Backend (Render)
- [ ] Create account on Render
- [ ] Connect GitHub repository
- [ ] Set `MONGO_URI` (MongoDB Atlas connection)
- [ ] Set `JWT_SECRET` (strong random key)
- [ ] Set `NODE_ENV=production`
- [ ] Set `FRONTEND_URL` to your Vercel domain
- [ ] Deploy and copy Render URL
- [ ] Test API at `https://your-render-url.com` (should show "API is running...")

### Frontend (Vercel)
- [ ] Create account on Vercel
- [ ] Connect GitHub repository
- [ ] Set root directory to `./client`
- [ ] Set `VITE_API_URL` to your Render URL
- [ ] Deploy
- [ ] Test login at `https://your-vercel-app.vercel.app/login`

### Testing
- [ ] Sign up creates account
- [ ] Login succeeds and redirects to feed
- [ ] Token persists on page refresh
- [ ] Logout clears token and redirects to login
- [ ] Create post appears in feed
- [ ] Network tab shows API calls to correct URL

---

## Common Deployment Issues

### Issue: "Cannot GET /"
**Cause:** Frontend routing not configured for SPA

**Fix - Add `vercel.json` in client folder:**
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Issue: "Network Error" or "CORS Error"
**Cause:** `VITE_API_URL` pointing to wrong backend URL

**Debug:**
1. Open browser DevTools → Network tab
2. Try to login
3. Check failed requests — what URL are they hitting?
4. Verify that URL is your actual Render deployment

### Issue: Login works locally but not on Vercel
**Cause:** Environment variable not set during build

**Fix:**
1. Go to Vercel Project Settings
2. Click "Environment Variables"
3. Add `VITE_API_URL=https://your-render-api.com`
4. **Redeploy** (Vercel doesn't auto-redeploy when env vars change)

### Issue: "TypeError: Cannot read property 'user' of null"
**Cause:** AuthContext not wrapping App component

**Fix - Check `main.jsx`:**
```jsx
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
```

### Issue: Token not working on production
**Cause:** Token not being sent with requests

**Debug:**
1. Open DevTools → Application → Local Storage
2. Verify `token` key exists and has a value
3. Check Network tab → Request headers
4. Look for `Authorization: Bearer <token>`

---

## Performance Optimization

### Enable Compression (Render)
Add to `server/server.js`:
```javascript
import compression from 'compression';
app.use(compression());
```

Install: `npm install compression`

### Build Optimization (Vercel)
Vercel automatically:
- Minifies JavaScript
- Optimizes images
- Caches static assets
- Uses edge caching

---

## Monitoring

### Render Logs
- Go to your Render service
- Click "Logs" tab
- Monitor for errors in real-time

### Vercel Analytics
- Go to your Vercel project
- Click "Analytics" tab
- Monitor performance metrics

---

## Rollback

### Rollback Render Deployment
1. Go to service → "Deploys"
2. Click the previous successful deploy
3. Click "Redeploy"

### Rollback Vercel Deployment
1. Go to project → "Deployments"
2. Find previous successful deployment
3. Click "..." → "Promote to Production"

---

## Next Steps

1. Deploy backend to Render
2. Copy Render URL
3. Set Vercel env var to Render URL
4. Deploy frontend to Vercel
5. Test end-to-end flow
6. Monitor logs for errors
7. Debug if issues arise using checklist above

---

## Support URLs

- **Render Docs:** https://render.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **MongoDB Atlas:** https://cloud.mongodb.com

## Local Testing Before Deployment

Before deploying to production, test with production-like environment:

```bash
# Terminal 1 - Server
cd server
NODE_ENV=production npm start

# Terminal 2 - Client (production build)
cd client
npm run build
npm run preview
```

This simulates production build and helps catch issues early.
