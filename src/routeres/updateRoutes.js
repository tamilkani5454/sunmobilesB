import { deleteProducts, editBrand, editProducts, updateOrderStatus } from "../controllers/addEditItems.js";
import { editCategories } from "../controllers/addEditItems.js";
import { editSubCategories } from "../controllers/addEditItems.js";
import express from "express"
import { verifyAdmin } from "../middleWares/auth.js";

const updateRoutes=express.Router()

updateRoutes.post("/edit-category",editCategories)
updateRoutes.post("/edit-subcategory",editSubCategories)
updateRoutes.post("/edit-brand",editBrand)
updateRoutes.post("/edit-products",editProducts)
updateRoutes.post("/delete-products",deleteProducts)
updateRoutes.post("/edit-order", verifyAdmin, updateOrderStatus)

export default updateRoutes