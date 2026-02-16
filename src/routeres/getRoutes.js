import express from 'express';
import { csb, getProducts} from '../controllers/getItems.js';

const getRoutes= express.Router();

getRoutes.get('/get-csb', csb);
getRoutes.get("/get-products",getProducts)
export default getRoutes;
