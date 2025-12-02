import express from "express";
import { registerUser, authUser, getAllUsers } from "../controllers/authControllers.js";

const router = express.Router()

router.post("/signup", registerUser)
router.post("/login", authUser)
router.get("/fetchUsers", getAllUsers )

export default router