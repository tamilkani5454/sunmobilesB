import express from 'express';
import { csb, getAllOrders, getProducts, getusersList } from '../controllers/getItems.js';
import { verifyAdmin } from '../middleWares/auth.js';

const getRoutes = express.Router();

getRoutes.get('/get-csb', csb);
getRoutes.get("/get-products", getProducts)
getRoutes.get("/all-orders", verifyAdmin, getAllOrders)
getRoutes.get("/userCount", getusersList)
export default getRoutes;
