import express from "express"
import { signUp } from "../controllers/userControls.js"

export const registerRoutes =express.Router()
registerRoutes.post("/sign-up",signUp)


