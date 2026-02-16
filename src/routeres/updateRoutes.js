import { deleteProducts, editBrand, editProducts } from "../controllers/addEditItems.js";
import { editCategories } from "../controllers/addEditItems.js";
import { editSubCategories } from "../controllers/addEditItems.js";
import express from "express"

const updateRoutes=express.Router()

updateRoutes.post("/edit-category",editCategories)
updateRoutes.post("/edit-subcategory",editSubCategories)
updateRoutes.post("/edit-brand",editBrand)
updateRoutes.post("/edit-products",editProducts)
updateRoutes.post("/delete-products",deleteProducts)

export default updateRoutes