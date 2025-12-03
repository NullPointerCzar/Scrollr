# Frontend Documentation

## Overview

The client is a React 19 single-page application built with Vite, featuring modern styling with Tailwind CSS and client-side routing with React Router.

---

## Tech Stack

- **React 19.2.0** - UI library
- **Vite 7.2.6** - Build tool and dev server
- **React Router 7.10.0** - Client-side routing
- **Tailwind CSS 4.1.17** - Utility-first CSS framework
- **Axios 1.13.2** - HTTP client for API calls
- **Lucide React 0.555.0** - Icon library

---

## Project Structure

```
client/src/
├── api/                    # API service layer
│   ├── auth.js            # Authentication API calls
│   └── axiosInstance.js   # Configured axios instance
├── components/            # Reusable components
│   └── ProtectedRoute.jsx # Route guard component
├── context/               # React Context providers
│   └── AuthContext.jsx    # Authentication state management
├── pages/                 # Page components
│   ├── Home.jsx          # Home/dashboard page
│   ├── Login.jsx         # Login page
│   └── Signup.jsx        # Registration page
├── assets/               # Static assets (images, etc.)
├── hooks/                # Custom React hooks (empty)
├── services/             # Additional services (empty)
├── store/                # State management (empty)
├── utils/                # Utility functions (empty)
├── App.jsx               # Root component with routes
├── main.jsx              # Application entry point
└── index.css             # Global styles
```

---

## Core Components

### 1. App.jsx

**Purpose:** Root component that sets up routing

**Location:** `client/src/App.jsx`

```jsx
import { Routes, Route } from "react-router";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route 
        path="/"
        element={
          <ProtectedRoute isAuthenticated={!!user}> 
            <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
```

**Routes:**
- `/login` - Public login page
- `/signup` - Public registration page
- `/` - Protected home page (requires authentication)

---

### 2. AuthContext

**Purpose:** Global authentication state management

**Location:** `client/src/context/AuthContext.jsx`

**Features:**
- Stores authenticated user data
- Persists auth state in localStorage
- Provides login/logout functions
- Auto-restores user on page refresh

**API:**

```javascript
// Context value structure
{
  user: Object | null,           // Current user data
  loginUser: (data) => void,     // Login function
  logoutUser: () => void         // Logout function
}
```

**Usage:**
```jsx
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function MyComponent() {
  const { user, loginUser, logoutUser } = useContext(AuthContext);
  
  // Access user data
  console.log(user?.username);
  
  // Login user
  loginUser({
    _id: "123",
    username: "john",
    email: "john@example.com",
    token: "jwt-token"
  });
  
  // Logout
  logoutUser();
}
```

**localStorage Keys:**
- `user` - JSON stringified user object
- `token` - JWT authentication token

---

### 3. ProtectedRoute Component

**Purpose:** Route guard that redirects unauthenticated users

**Location:** `client/src/components/ProtectedRoute.jsx`

```jsx
import { Navigate } from "react-router";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  
  return token ? children : <Navigate to="/login" />;
}
```

**Usage:**
```jsx
<Route 
  path="/protected" 
  element={
    <ProtectedRoute>
      <ProtectedPage />
    </ProtectedRoute>
  }
/>
```

**Behavior:**
- Checks for token in localStorage
- Renders children if authenticated
- Redirects to `/login` if not authenticated

---

## Pages

### 1. Login Page

**Location:** `client/src/pages/Login.jsx`

**Features:**
- Email and password login
- Form validation (all fields required)
- Disabled submit button until form is valid
- Link to signup page
- Tailwind CSS styling

**Form Fields:**
- Username (text input)
- Email (email input)
- Password (password input)

**Validation:**
```javascript
const isFormValid = form.username && form.email && form.password;
```

**Submit Handler:**
```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  try {
    const res = login(form);
    console.log("Logged In");
  } catch (error) {
    console.error(error.response.data);
  }
};
```

**UI State:**
- Button enabled: Indigo background, white text
- Button disabled: Gray background, gray text, not-allowed cursor

---

### 2. Signup Page

**Location:** `client/src/pages/Signup.jsx`

**Features:**
- User registration form
- Form validation (all fields required)
- Disabled submit button until form is valid
- Link to login page
- Async form submission
- Tailwind CSS styling

**Form Fields:**
- Username (text input)
- Email (email input)
- Password (password input)

**Validation:**
```javascript
const isFormValid = form.username && form.email && form.password;
```

**Submit Handler:**
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await signup(form);
    console.log("User created:", res.data);
  } catch (error) {
    console.error(error.response.data);
  }
};
```

**Note:** Uses async/await for API call

---

### 3. Home Page

**Location:** `client/src/pages/Home.jsx`

**Features:**
- Displays welcome message with username
- Logout button
- Accesses AuthContext for user data

**Current Implementation:**
```jsx
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome to Scrollr, {user?.username || "Guest"}!</h1>
      <p>This is your home page.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

**Future Enhancements:**
- Post feed
- Create post functionality
- User profile
- Notifications

---

## API Layer

### 1. Axios Instance

**Location:** `client/src/api/axiosInstance.js`

**Purpose:** Pre-configured axios instance with interceptors

```javascript
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001",
});

// Automatically attach JWT token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
```

**Features:**
- Base URL configuration
- Automatic token injection
- Request interceptor for authentication

---

### 2. Auth API

**Location:** `client/src/api/auth.js`

**Exports:**

```javascript
import axios from 'axios';

const API = "http://localhost:5000/api/auth";

// User registration
export const signup = (formData) => 
  axios.post(`${API}/signup`, formData);

// User login
export const login = (formData) => 
  axios.post(`${API}/login`, formData);
```

**Note:** Currently uses direct axios instead of the configured instance

**Recommendation:** Update to use `axiosInstance.js`:
```javascript
import API from './axiosInstance.js';

export const signup = (formData) => API.post('/api/auth/signup', formData);
export const login = (formData) => API.post('/api/auth/login', formData);
```

---

## Styling

### Tailwind CSS Configuration

**Config File:** `client/vite.config.js`

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

### Common Utility Classes Used

**Forms:**
- `space-y-4` - Vertical spacing between form elements
- `w-full` - Full width inputs
- `px-4 py-2` - Padding for inputs
- `border border-gray-300` - Input borders
- `rounded-md` - Rounded corners
- `focus:ring-indigo-500` - Focus ring color
- `focus:border-indigo-500` - Focus border color

**Buttons:**
- `bg-indigo-600` - Primary button color
- `hover:bg-indigo-700` - Hover state
- `text-white` - Button text color
- `py-2 px-4` - Button padding
- `rounded-md` - Rounded corners
- `disabled:bg-gray-300` - Disabled state

**Layout:**
- `flex items-center justify-center` - Centering
- `min-h-screen` - Full viewport height
- `bg-gray-100` - Page background
- `max-w-md` - Max width constraint
- `shadow-md` - Box shadow

---

## State Management

### Current Approach: Context API

**AuthContext** manages global authentication state:

**Pros:**
- Built into React
- No additional dependencies
- Simple for current scope

**Limitations:**
- Not optimized for frequent updates
- Limited dev tools
- Manual optimization needed

### Future Considerations

If the app grows, consider:

**1. Zustand** (Lightweight state management)
```bash
npm install zustand
```

**2. Redux Toolkit** (Full-featured state management)
```bash
npm install @reduxjs/toolkit react-redux
```

**3. TanStack Query** (React Query - Server state management)
```bash
npm install @tanstack/react-query
```

---

## Routing

### React Router Configuration

**Router Setup:** `client/src/main.jsx`

```jsx
import { BrowserRouter } from 'react-router';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

**Route Definitions:** In `App.jsx`

### Navigation

**Using Link component:**
```jsx
import { Link } from "react-router-dom";

<Link to="/signup">Sign up</Link>
```

**Programmatic navigation:**
```jsx
import { Navigate } from "react-router";

<Navigate to="/login" />
```

**Using useNavigate hook:**
```jsx
import { useNavigate } from "react-router";

const navigate = useNavigate();
navigate('/home');
```

---

## Development

### Running Dev Server

```bash
cd client
npm run dev
```

Server runs on: `http://localhost:5173`

### Building for Production

```bash
npm run build
```

Output directory: `client/dist/`

### Preview Production Build

```bash
npm run preview
```

---

## Environment Variables

Vite requires environment variables to be prefixed with `VITE_`:

**File:** `client/.env`

```env
VITE_API_URL=http://localhost:5001
```

**Usage:**
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

**Note:** Remember to restart dev server after changing .env

---

## Code Quality

### ESLint Configuration

**Config File:** `client/eslint.config.js`

**Plugins:**
- `@eslint/js` - Core ESLint rules
- `eslint-plugin-react-hooks` - React Hooks rules
- `eslint-plugin-react-refresh` - Fast Refresh compatibility

**Run Linter:**
```bash
npm run lint
```

---

## Performance Optimization

### Current Optimizations
- Vite for fast HMR (Hot Module Replacement)
- Code splitting via dynamic imports (ready for use)
- Tailwind CSS purging in production

### Recommended Future Optimizations

**1. Lazy Loading Routes:**
```jsx
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/Home'));

<Suspense fallback={<div>Loading...</div>}>
  <Home />
</Suspense>
```

**2. Memoization:**
```jsx
import { memo, useMemo, useCallback } from 'react';

const MemoizedComponent = memo(MyComponent);
```

**3. Image Optimization:**
```bash
npm install vite-plugin-imagemin
```

---

## Testing (Future Implementation)

### Recommended Testing Stack

**1. Vitest** (Unit/Integration testing)
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

**2. Playwright** (E2E testing)
```bash
npm install -D @playwright/test
```

**3. Testing Structure:**
```
src/
├── components/
│   ├── ProtectedRoute.jsx
│   └── ProtectedRoute.test.jsx
├── pages/
│   ├── Login.jsx
│   └── Login.test.jsx
```

---

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
cd client
vercel
```

### Netlify

```bash
npm run build
# Drag and drop dist/ folder to Netlify
```

### Build Configuration

**Build command:** `npm run build`  
**Output directory:** `dist`  
**Node version:** 18+

### Environment Variables (Production)

Set in hosting platform:
- `VITE_API_URL` - Production API URL

---

## Common Issues & Solutions

### Issue: Routes not working after refresh
**Solution:** Configure hosting for SPA routing:

**Vercel (`vercel.json`):**
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

**Netlify (`_redirects`):**
```
/*  /index.html  200
```

### Issue: CORS errors
**Solution:** Update server CORS configuration to allow frontend domain

### Issue: Token persists after logout
**Solution:** Ensure `localStorage.clear()` is called in logout function

### Issue: Tailwind styles not applying
**Solution:** Restart Vite dev server after config changes

---

## Future Enhancements

### Planned Features
1. **Post Feed** - Display and create posts
2. **User Profiles** - View other users
3. **Follow System** - Follow/unfollow users
4. **Notifications** - Real-time updates
5. **Image Upload** - Post images with Cloudinary
6. **Search** - Find users and posts
7. **Comments** - Comment on posts
8. **Likes** - Like/unlike posts
9. **Dark Mode** - Theme toggle
10. **Responsive Design** - Mobile optimization

### Component Structure (Future)
```
components/
├── layout/
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   └── Footer.jsx
├── post/
│   ├── PostCard.jsx
│   ├── PostForm.jsx
│   └── PostList.jsx
├── user/
│   ├── UserCard.jsx
│   ├── UserProfile.jsx
│   └── FollowButton.jsx
└── common/
    ├── Button.jsx
    ├── Input.jsx
    ├── Modal.jsx
    └── Loader.jsx
```

---

## Best Practices

1. **Component Organization:**
   - One component per file
   - Use named exports for utilities
   - Default export for components

2. **State Management:**
   - Keep state as local as possible
   - Lift state only when necessary
   - Use Context for truly global state

3. **Error Handling:**
   - Always handle API errors
   - Show user-friendly error messages
   - Log errors for debugging

4. **Performance:**
   - Avoid unnecessary re-renders
   - Use keys properly in lists
   - Debounce expensive operations

5. **Accessibility:**
   - Use semantic HTML
   - Add ARIA labels where needed
   - Ensure keyboard navigation works

6. **Security:**
   - Never store sensitive data in localStorage
   - Validate all user inputs
   - Sanitize rendered content
