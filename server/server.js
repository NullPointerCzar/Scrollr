import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import postRoutes from './src/routes/postRoutes.js'

dotenv.config();

const app = express();

// Configure CORS for deployment
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://scrollrmedia.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked origin: ${origin}`);
      callback(null, true); // Allow for debugging
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Basic route to test
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes (you'll add them later)
app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);


const PORT = process.env.PORT || 5000;


// Connect DB and start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  });
