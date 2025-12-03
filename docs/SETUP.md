# Environment Setup Guide

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git** (for version control)
- **Code Editor** (VS Code recommended)

### Checking Installed Versions

```bash
node --version
npm --version
git --version
```

---

## MongoDB Setup

### Option 1: MongoDB Atlas (Cloud - Recommended for Development)

1. **Create Account:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create Cluster:**
   - Click "Build a Database"
   - Choose "FREE" tier (M0 Sandbox)
   - Select your preferred cloud provider and region
   - Click "Create Cluster"

3. **Configure Database Access:**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose authentication method (username/password)
   - Save credentials securely
   - Set privileges to "Read and write to any database"

4. **Configure Network Access:**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - For development, click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production, whitelist specific IPs

5. **Get Connection String:**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with your database name (e.g., "scrollr")

**Example Connection String:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/scrollr?retryWrites=true&w=majority
```

### Option 2: Local MongoDB Installation

**macOS (using Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Windows:**
- Download installer from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
- Run installer and follow prompts
- Start MongoDB service

**Linux (Ubuntu):**
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

**Local Connection String:**
```
mongodb://localhost:27017/scrollr
```

---

## Project Setup

### 1. Clone Repository

```bash
git clone https://github.com/NullPointerCzar/Scrollr.git
cd Scrollr
```

Or if starting fresh:
```bash
mkdir Scrollr
cd Scrollr
```

### 2. Server Setup

```bash
cd server
npm install
```

**Create `.env` file:**
```bash
touch .env
```

**Edit `server/.env`:**
```env
# MongoDB Connection
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/scrollr?retryWrites=true&w=majority

# Server Port (avoid 5000 on macOS due to AirPlay)
PORT=5001

# JWT Secret (generate a strong random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Environment
NODE_ENV=development
```

**Generate Secure JWT Secret:**
```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Using OpenSSL
openssl rand -base64 64
```

**Create `.gitignore`:**
```bash
cat > .gitignore << EOF
node_modules
.env
.DS_Store
*.log
EOF
```

**Verify Server Setup:**
```bash
npm run dev
```

Expected output:
```
[nodemon] starting `node server.js`
MongoDB Connected: cluster0-shard-00-00.xxxxx.mongodb.net
Server running on http://localhost:5001
```

### 3. Client Setup

```bash
cd ../client
npm install
```

**Create `.env` file (optional):**
```bash
touch .env
```

**Edit `client/.env`:**
```env
VITE_API_URL=http://localhost:5001
```

**Verify Client Setup:**
```bash
npm run dev
```

Expected output:
```
VITE v7.2.6  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

---

## Running the Application

### Development Mode

**Terminal 1 (Server):**
```bash
cd server
npm run dev
```

**Terminal 2 (Client):**
```bash
cd client
npm run dev
```

**Access the application:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5001
- API Test: http://localhost:5001/api/auth (should show "API is running...")

---

## VS Code Setup (Recommended)

### Recommended Extensions

Install these extensions for better development experience:

```
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension bradlc.vscode-tailwindcss
code --install-extension christian-kohler.npm-intellisense
code --install-extension dsznajder.es7-react-js-snippets
code --install-extension mongodb.mongodb-vscode
```

**Or search in VS Code Extensions:**
1. ESLint
2. Prettier - Code formatter
3. Tailwind CSS IntelliSense
4. npm Intellisense
5. ES7+ React/Redux/React-Native snippets
6. MongoDB for VS Code

### VS Code Settings

**Create `.vscode/settings.json` in project root:**
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

### Workspace Configuration

**Create `.vscode/extensions.json`:**
```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "christian-kohler.npm-intellisense",
    "dsznajder.es7-react-js-snippets",
    "mongodb.mongodb-vscode"
  ]
}
```

---

## Database Initialization

### Create Admin User (Optional)

**Using MongoDB Compass or Atlas UI:**
1. Connect to your database
2. Select the `scrollr` database
3. Create `users` collection
4. Insert document:

```json
{
  "username": "admin",
  "email": "admin@scrollr.com",
  "password": "$2a$10$...", // Use bcrypt to hash
  "role": "admin",
  "avatar": "https://i.ibb.co/0jqHpnp/default-avatar.png",
  "bio": "Administrator",
  "followers": [],
  "following": [],
  "createdAt": "2024-12-03T00:00:00.000Z",
  "updatedAt": "2024-12-03T00:00:00.000Z"
}
```

**Or use the Signup API:**
```bash
curl -X POST http://localhost:5001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@scrollr.com",
    "password": "securepassword"
  }'
```

---

## Testing the Setup

### 1. Test Server API

```bash
# Test root endpoint
curl http://localhost:5001

# Test signup
curl -X POST http://localhost:5001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'

# Test login
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 2. Test Frontend

1. Open browser to http://localhost:5173
2. Click "Sign up"
3. Fill out the form
4. Submit and verify account creation
5. Try logging in with the created account

---

## Troubleshooting

### Issue: Port 5000 Already in Use (macOS)

**Problem:** macOS AirPlay Receiver uses port 5000

**Solution:**
1. Use port 5001 (already configured in .env)
2. Or disable AirPlay: System Settings → General → AirDrop & Handoff → Uncheck "AirPlay Receiver"

### Issue: MongoDB Connection Failed

**Problem:** Cannot connect to MongoDB

**Solutions:**
1. Check connection string format
2. Verify database user credentials
3. Check network access whitelist in Atlas
4. Ensure MongoDB service is running (local)
5. Check firewall settings

### Issue: CORS Errors

**Problem:** API requests blocked by CORS policy

**Solutions:**
1. Ensure server is running on correct port
2. Check CORS middleware in server.js
3. Verify client is using correct API URL

### Issue: npm install Fails

**Problem:** Dependency installation errors

**Solutions:**
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Or use legacy peer deps
npm install --legacy-peer-deps
```

### Issue: Tailwind Styles Not Working

**Problem:** Styles not applying

**Solutions:**
1. Restart Vite dev server
2. Clear browser cache
3. Check Tailwind plugin in vite.config.js
4. Verify no conflicting CSS

### Issue: Cannot Find Module

**Problem:** Import errors

**Solutions:**
1. Check file path casing (case-sensitive)
2. Verify file extension (.js, .jsx)
3. Check if file exists
4. Clear and reinstall node_modules

---

## Production Setup

### Environment Variables

**Server (Production `.env`):**
```env
MONGO_URI=mongodb+srv://prod-user:password@production-cluster.mongodb.net/scrollr
PORT=5001
JWT_SECRET=very-long-random-production-secret-key
NODE_ENV=production
```

**Client:**
Update API URL to production server URL

### Security Checklist

- [ ] Strong, unique JWT_SECRET
- [ ] Secure MongoDB credentials
- [ ] HTTPS enabled
- [ ] CORS configured for specific origins
- [ ] Rate limiting enabled
- [ ] Environment variables secured
- [ ] Database backups configured
- [ ] Error messages sanitized
- [ ] Input validation on all endpoints
- [ ] Security headers configured

### Build for Production

**Client:**
```bash
cd client
npm run build
# Output: dist/ folder
```

**Server:**
```bash
cd server
npm start
```

---

## Additional Tools

### API Testing
- **Postman** - GUI for API testing
- **Thunder Client** - VS Code extension
- **cURL** - Command-line tool

### Database Management
- **MongoDB Compass** - Official GUI client
- **MongoDB Atlas UI** - Web-based management
- **Studio 3T** - Advanced MongoDB client

### Version Control
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <repository-url>
git push -u origin main
```

---

## Next Steps

After setup is complete:

1. Read [API Documentation](./API.md)
2. Review [Database Schema](./DATABASE.md)
3. Explore [Frontend Architecture](./FRONTEND.md)
4. Start building features!

---

## Support

If you encounter issues not covered here:

1. Check the [Issues](https://github.com/NullPointerCzar/Scrollr/issues) page
2. Create a new issue with:
   - Error message
   - Steps to reproduce
   - Environment details (OS, Node version, etc.)
   - Screenshots if applicable
