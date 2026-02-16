// routes/paymentRoutes.js
import express from "express"
import { createRazorpayOrder,verifyPayment  } from "../controllers/paymentControllers.js"

export const paymentRouter = express.Router()

paymentRouter.post("/create-payment", createRazorpayOrder)
paymentRouter.post("/verify-payment", verifyPayment)
