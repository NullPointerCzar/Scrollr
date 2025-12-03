# API Documentation

## Base URL
```
http://localhost:5001/api
```

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Auth Routes

### 1. User Registration (Signup)

**Endpoint:** `POST /api/auth/signup`

**Description:** Creates a new user account

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Validation:**
- `username`: Required, 3-30 characters, unique
- `email`: Required, valid email format, unique
- `password`: Required, minimum 6 characters

**Success Response (201):**
```json
{
  "_id": "ObjectId",
  "username": "johndoe",
  "email": "john@example.com",
  "avatar": "https://i.ibb.co/0jqHpnp/default-avatar.png",
  "token": "jwt-token-string"
}
```

**Error Responses:**

*400 - Email Already Registered*
```json
{
  "message": "Email already registered"
}
```

*400 - Username Already Taken*
```json
{
  "message": "Username already taken"
}
```

*400 - Invalid User Data*
```json
{
  "message": "Invalid user data"
}
```

*500 - Server Error*
```json
{
  "message": "Error message"
}
```

---

### 2. User Login

**Endpoint:** `POST /api/auth/login`

**Description:** Authenticates a user and returns a JWT token

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Success Response (200):**
```json
{
  "_id": "ObjectId",
  "username": "johndoe",
  "email": "john@example.com",
  "avatar": "https://i.ibb.co/0jqHpnp/default-avatar.png",
  "token": "jwt-token-string"
}
```

**Error Responses:**

*401 - Invalid Credentials*
```json
{
  "message": "Invalid email or password"
}
```

*500 - Server Error*
```json
{
  "message": "Error message"
}
```

---

## Protected Routes (Future Implementation)

### User Routes (Coming Soon)
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `GET /api/users/:id/followers` - Get user followers
- `GET /api/users/:id/following` - Get users being followed
- `POST /api/users/:id/follow` - Follow a user
- `DELETE /api/users/:id/unfollow` - Unfollow a user

### Post Routes (Coming Soon)
- `GET /api/posts` - Get all posts (feed)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/like` - Like a post
- `DELETE /api/posts/:id/unlike` - Unlike a post
- `POST /api/posts/:id/comment` - Comment on post
- `DELETE /api/posts/:id/comment/:commentId` - Delete comment

---

## Authentication Middleware

The `protect` middleware is available for securing routes:

**Location:** `server/src/middleware/authMiddleware.js`

**Usage:**
```javascript
import protect from '../middleware/authMiddleware.js';

router.get('/protected-route', protect, controllerFunction);
```

**Functionality:**
- Extracts JWT token from Authorization header
- Verifies token with JWT_SECRET
- Attaches user object to `req.user` (without password)
- Returns 401 if token is missing or invalid

**Error Responses:**

*401 - No Token*
```json
{
  "message": "Not authorized, no token"
}
```

*401 - Invalid Token*
```json
{
  "message": "Not authorized, token failed"
}
```

---

## JWT Token Structure

**Algorithm:** HS256 (HMAC with SHA-256)

**Payload:**
```json
{
  "id": "user-id-string",
  "iat": 1234567890,
  "exp": 1237159890
}
```

**Expiration:** 30 days

**Generation Location:** `server/src/utils/generateToken.js`

---

## Error Handling

All endpoints follow consistent error response format:

```json
{
  "message": "Error description string"
}
```

Common HTTP status codes:
- `200` - Success (GET, PUT)
- `201` - Created (POST)
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (auth failures)
- `403` - Forbidden (permission denied)
- `404` - Not Found
- `500` - Internal Server Error

---

## Request/Response Examples

### Signup Example

**Request:**
```bash
curl -X POST http://localhost:5001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "securepass123"
  }'
```

**Response:**
```json
{
  "_id": "674f8a1b2c3d4e5f6a7b8c9d",
  "username": "johndoe",
  "email": "john@example.com",
  "avatar": "https://i.ibb.co/0jqHpnp/default-avatar.png",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Login Example

**Request:**
```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepass123"
  }'
```

**Response:**
```json
{
  "_id": "674f8a1b2c3d4e5f6a7b8c9d",
  "username": "johndoe",
  "email": "john@example.com",
  "avatar": "https://i.ibb.co/0jqHpnp/default-avatar.png",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Protected Route Example

**Request:**
```bash
curl -X GET http://localhost:5001/api/users/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## CORS Configuration

The server accepts requests from all origins with the following configuration:

```javascript
app.use(cors());
```

For production, configure specific origins:

```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.com',
  credentials: true
}));
```

---

## Rate Limiting

⚠️ **Note:** Rate limiting is not currently implemented. Consider adding rate limiting middleware for production:

```bash
npm install express-rate-limit
```

Recommended configuration:
- Auth routes: 5 requests per 15 minutes
- API routes: 100 requests per 15 minutes

---

## Testing

Use tools like:
- **Postman** - GUI-based API testing
- **cURL** - Command-line testing
- **Thunder Client** (VS Code extension)
- **REST Client** (VS Code extension)

### Example Postman Collection Structure:
```
Scrollr API/
├── Auth/
│   ├── Signup
│   └── Login
├── Users/ (coming soon)
└── Posts/ (coming soon)
```
