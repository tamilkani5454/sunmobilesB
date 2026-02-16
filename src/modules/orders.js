import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    products: [
      {
        productId: String,
        quantity: Number,
        price: Number,
        total: Number
      },
    ],

    shippingAddress: {
      firstName: String,
      lastName: String,
      phoneNumber: String,
      email: String,
      address: String,
      city: String,
      state: String,
      pincode: String,

    },

    paymentMethod: {
      type: String,
      enum: ["PAS", "Onlie"],
      default: "PAS",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    orderStatus: {
      type: String,
      enum: ["placed", "processing", "confirmed", "shipped", "delivered", "cancelled"],
      default: "placed",
    },
    orderId: String,
    deliveryCharge: Number,
    discount: Number,
    finalAmount: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Orders", orderSchema);
