import express from "express"
import { adminLogin, login, signUp } from "../controllers/userControls.js"

export const registerRoutes = express.Router()
registerRoutes.post("/sign-up", signUp)
registerRoutes.post("/login", login)
registerRoutes.post("/admin-login",adminLogin)
