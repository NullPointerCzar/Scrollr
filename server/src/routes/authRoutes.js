import express from "express";
import { registerUser, authUser } from "../controllers/authControllers.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router()

router.post("/signup", registerUser)
router.post("/login", authUser)

export default router