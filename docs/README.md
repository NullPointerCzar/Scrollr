# Scrollr - Social Media Application

## Overview

Scrollr is a full-stack social media application built with the MERN stack (MongoDB, Express.js, React, Node.js). It features user authentication, protected routes, and a modern UI built with Tailwind CSS.

## Project Structure

```
Scrollr/
├── client/                 # Frontend React application
│   ├── public/            # Static assets
│   └── src/
│       ├── api/           # API service layer
│       ├── components/    # Reusable React components
│       ├── context/       # React Context providers
│       ├── pages/         # Page components
│       ├── hooks/         # Custom React hooks (empty)
│       ├── services/      # Service utilities (empty)
│       ├── store/         # State management (empty)
│       └── utils/         # Utility functions (empty)
├── server/                # Backend Node.js application
│   ├── src/
│   │   ├── config/       # Configuration files
│   │   ├── controllers/  # Route controllers
│   │   ├── middleware/   # Express middleware
│   │   ├── models/       # Mongoose models
│   │   ├── routes/       # API routes
│   │   └── utils/        # Utility functions
│   └── server.js         # Entry point
└── docs/                 # Documentation
```

## Tech Stack

### Frontend
- **React 19.2.0** - UI library
- **Vite 7.2.6** - Build tool and dev server
- **React Router 7.10.0** - Client-side routing
- **Tailwind CSS 4.1.17** - Utility-first CSS framework
- **Axios 1.13.2** - HTTP client
- **Lucide React 0.555.0** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express 5.2.1** - Web framework
- **MongoDB** - Database
- **Mongoose 9.0.0** - ODM for MongoDB
- **JWT (jsonwebtoken 9.0.2)** - Authentication tokens
- **bcryptjs 3.0.3** - Password hashing
- **Cloudinary 2.8.0** - Media management
- **Multer 2.0.2** - File upload handling
- **CORS 2.8.5** - Cross-origin resource sharing
- **dotenv 17.2.3** - Environment variables

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB (local or MongoDB Atlas)
- npm or yarn package manager

### Environment Variables

#### Server (.env)
Create a `.env` file in the `server/` directory:

```env
MONGO_URI=mongodb+srv://your-connection-string
PORT=5001
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

#### Client (.env)
Create a `.env` file in the `client/` directory (optional):

```env
VITE_API_URL=http://localhost:5001
```

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Scrollr
```

2. **Install server dependencies**
```bash
cd server
npm install
```

3. **Install client dependencies**
```bash
cd ../client
npm install
```

### Running the Application

#### Development Mode

**Start the backend server:**
```bash
cd server
npm run dev
```
Server will run on `http://localhost:5001`

**Start the frontend development server:**
```bash
cd client
npm run dev
```
Client will run on `http://localhost:5173`

#### Production Mode

**Build the client:**
```bash
cd client
npm run build
```

**Start the server:**
```bash
cd server
npm start
```

## Features

### Authentication
- User registration with username, email, and password
- User login with JWT token-based authentication
- Password hashing using bcrypt
- Protected routes requiring authentication
- Token storage in localStorage
- Automatic token inclusion in API requests

### User Management
- User profile with avatar (default provided)
- Bio field (max 160 characters)
- Follow/unfollow functionality (schema ready)
- Role-based access (user/admin)

### UI/UX
- Modern, responsive design with Tailwind CSS
- Form validation with disabled submit until all fields are filled
- Protected route redirects to login
- Logout functionality
- Loading states and error handling

## API Documentation

See [API.md](./API.md) for detailed API endpoint documentation.

## Database Schema

See [DATABASE.md](./DATABASE.md) for database models and schema documentation.

## Frontend Architecture

See [FRONTEND.md](./FRONTEND.md) for React component and state management documentation.

## Security Features

- Password hashing with bcrypt (salt rounds: 10)
- JWT tokens with 30-day expiration
- Protected API routes with middleware
- CORS configuration
- Environment variable management
- Input validation on both client and server

## Deployment

### Server Deployment
- Deploy to services like Heroku, Railway, Render, or DigitalOcean
- Set environment variables in the hosting platform
- Ensure MongoDB URI is accessible from the deployment environment

### Client Deployment
- Deploy to Vercel, Netlify, or similar static hosting
- Update API base URL to production server URL
- Build the production bundle with `npm run build`

## Development Notes

- Server runs on port 5001 (configurable via .env)
- Client dev server runs on Vite's default port (5173)
- MongoDB connection is established before starting the server
- Hot reloading enabled for both frontend and backend in dev mode
- ESLint configured for code quality

## Future Enhancements

- Post creation and management
- Comment system
- Like/unlike functionality
- User profile pages
- Image upload with Cloudinary integration
- Real-time notifications
- Search functionality
- Direct messaging
- Feed algorithm

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

ISC

## Support

For issues and questions, please create an issue in the repository.
