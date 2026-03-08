import { Brand, Category, SubCategory } from "../modules/csb.js";
import Orders from "../modules/orders.js";
import Products from "../modules/products.js";
import users from "../modules/users.js";

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
const getAllOrders = async (req, res) => {
    try {
        const orders = await Orders.find({}).lean();

        // Fetch all product details
        const enrichedOrders = await Promise.all(orders.map(async (order) => {
            if (order.products && Array.isArray(order.products)) {
                order.products = await Promise.all(order.products.map(async (item) => {
                    if (item.productId) {
                        try {
                            const product = await Products.findById(item.productId).lean();
                            if (product) {
                                return { ...item, productId: product };
                            }
                        } catch (err) {
                            console.error(`Error fetching product ${item.productId}:`, err);
                        }
                    }
                    return item;
                }));
            }
            return order;
        }));

        res.json(enrichedOrders);
    } catch (error) {
        console.error('Error fetching all orders:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
const getusersList = async (req, res) => {
    const usersCount = await users.countDocuments()
    res.json({ success: true, usersCount })
}
const getUserData = async (req, res) => {
    const { userId } = req.body
    const user = await users.findById(userId).select("-password")
    res.json(user)
}
export { getProducts, getOrders, csb, getUserOrders, getAllOrders, getusersList, getUserData };

