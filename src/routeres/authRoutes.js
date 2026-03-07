import express from 'express'
import { checkAdmin, checkUser, verifyAdmin, verifyUser } from '../middleWares/auth.js'
export const authRoutes=express.Router()

authRoutes.get("/admin/check",verifyAdmin,checkAdmin)
authRoutes.get("/user/check",verifyUser,checkUser)
