import express from 'express';
import { addProducts, createOrders } from '../controllers/addEditItems.js';
import { addCategories } from '../controllers/addEditItems.js';
import { uploadimage } from '../middleWares/multer.js';
import { addSubCategories } from '../controllers/addEditItems.js';
import { addBrands } from '../controllers/addEditItems.js';


const uploadRoutes= express.Router();

uploadRoutes.post('/add-product',uploadimage.array("images", 4),addProducts);
uploadRoutes.post('/add-category', addCategories);
uploadRoutes.post('/add-subcategory', addSubCategories);
uploadRoutes.post('/add-brand', addBrands);
uploadRoutes.post('/add-orders',createOrders);


export default uploadRoutes;