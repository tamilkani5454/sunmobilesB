import express from 'express';
import { ConnectDB } from './src/config/connectDB.js';
import cors from 'cors';
import uploadRoutes from './src/routeres/uploadRoutes.js';
import getRoutes from './src/routeres/getRoutes.js';
import updateRoutes from './src/routeres/updateRoutes.js';
import { registerRoutes } from './src/routeres/register.js';
import { paymentRouter } from './src/routeres/paymentRoutes.js';
import { getUserOrders } from './src/controllers/getItems.js';


const app = express();
app.use(cors());
await ConnectDB();
app.use(express.json());
app.use(express.urlencoded());

app.get('/sunmobilesback', (req, res) => {
  res.send('Welcome to Sun Mobiles Back!');
});

app.use('/api/uploads',uploadRoutes);
app.use("/api/gets",getRoutes)
app.use("/api/update",updateRoutes)
app.use("/api/register",registerRoutes)
app.use("/api/payment",paymentRouter)
app.post("/api/get-user-order",getUserOrders)

app.listen(3000);