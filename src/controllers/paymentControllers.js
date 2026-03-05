import { razorpay } from "../config/razorpay.js";
import crypto from "crypto"
import orders from "../modules/orders.js";


export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount, orderId } = req.body // amount in rupees

    const order = await razorpay.orders.create({
      amount: Number(amount) * 100, // paisa
      currency: "INR",
      receipt: orderId + Date.now()
    })
    res.status(200).json({
      success: true,
      order
    });
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}


export const verifyPayment = async (req, res) => {
  
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  } = req.body.response
  const order_id=req.body.order_id

  const body = razorpay_order_id + "|" + razorpay_payment_id

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex")

  if (expectedSignature === razorpay_signature) {
    // ✅ payment success
    res.json({ success: true, message:"payment successfull"  })
     const updatepayStatus=await orders.findOneAndUpdate({orderId:order_id},{paymentStatus:"paid",paymentMethod:"online"},{new:true})
  } else {
    const updatepayStatus=await orders.findOneAndUpdate({orderId:order_id},{paymentStatus:"failed"},{new:true})
    res.status(400).json({ success: false})
  }
}
