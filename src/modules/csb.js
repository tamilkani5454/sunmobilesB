import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
})


const subCategorySchema = new mongoose.Schema({
    Category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    name: { type: String, required: true },
})


const brandSchema = new mongoose.Schema({
    name: { type: String, required: true },
    SubCategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory", required: true },
})


export const Category = mongoose.model("Category", categorySchema);
export const SubCategory = mongoose.model("SubCategory", subCategorySchema);
export const Brand = mongoose.model("Brand", brandSchema);