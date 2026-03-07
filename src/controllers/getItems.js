import { Brand, Category, SubCategory } from "../modules/csb.js";
import Orders from "../modules/orders.js";
import Products from "../modules/products.js";


//get all products
const getProducts = async (req, res) => {
    try {
        const products = await Products.find()
        
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//get all orders by admin
const getOrders = async (req, res) => {
    try {
        const orders = await Orders.find();
        res.status(200).json(orders);
    }
    catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//get Categories,SubCategories,Brands
const csb = async (req, res) => {
    try {
        const categories = await Category.find().select('-__v ');
        const subCategories = await SubCategory.find();
        const brands = await Brand.find();
        res.status(200).json({ categories, subCategories: subCategories, brands });
    } catch (error) {
        console.error('Error fetching CSB:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
//get user orders
const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await Orders.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, order: orders });
    } catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
const getAllOrders =async(req,res)=>{
    const orders = await Orders.find({})
    res.json(orders)
}
export { getProducts, getOrders, csb, getUserOrders,getAllOrders };

