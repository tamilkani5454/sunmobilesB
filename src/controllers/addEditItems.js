import { Category, SubCategory, Brand } from '../modules/csb.js';
import Products from '../modules/products.js';
import { r2 } from '../config/r2Connect.js';
import { PutObjectCommand, DeleteObjectCommand} from '@aws-sdk/client-s3';
import orders from '../modules/orders.js';


//upload items controller
export const addProducts = async (req, res) => {

    const productsData = JSON.parse(req.body.productData);
    const { name, category, subCategory, brand, price, offerPrice, stock, description, specifications, status } = productsData;
    try {
        const generateFileName = (mimetype) => {
            const ext = mimetype.split("/")[1]; // jpeg / png / webp
            const random = Math.random().toString(36).substring(2, 10); // 8 chars
            return `${random}.${ext}`;
        };
        const folder = 'sunmobiles/products';
        const uploadedImages = []
        for (const file of req.files) {
            const fileName = generateFileName(file.mimetype);
            const key = `${folder}/${fileName}`;

            const commend = new PutObjectCommand({
                Bucket: process.env.R2_BUCKET_NAME,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype,

            })
            await r2.send(commend)



            uploadedImages.push({
                key,
                url: `${process.env.R2_PUBLIC_URL}/${key}`,
            });

        }
        const newProduct = new Products({
            name,
            category,
            subCategory,
            brand,
            price,
            offerPrice,
            stock,
            description,
            specifications,
            status,
            images: uploadedImages
        })

        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully', product: newProduct });

    } catch (error) {
        console.error('Error adding products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
export const addCategories = async (req, res) => {
    const category = req.body

    try {
        const newCategory = new Category({
            name: category.name
        })
        await newCategory.save()

    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
export const addSubCategories = async (req, res) => {
    const subCategory = req.body
    const categoryId = subCategory.categoryId;
    const name = subCategory.name;
    try {
        const newSubCategory = new SubCategory({
            Category: categoryId,
            name: name
        })
        await newSubCategory.save()
        res.status(201).json({
            message: 'Subcategory added successfully', subcategory: newSubCategory
        });
    } catch (error) {
        console.error('Error adding subcategory:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

};
export const addBrands = async (req, res) => {
    const brand = req.body
    const subCategoryId = brand.subCategoryID;
    const name = brand.name;
    try {
        const newBrand = new Brand({
            SubCategory: subCategoryId,
            name: name
        })
        await newBrand.save()
        res.status(201).json({
            message: 'Brand added successfully', brand: newBrand
        });
    } catch (error) {
        console.error('Error adding brand:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

};

//edit items controllers
export const editCategories = async (req, res) => {
    const data = req.body

    await Category.findByIdAndUpdate(data.categoryId, { name: data.name })

}
export const editSubCategories = async (req, res) => {
    const data = req.body

    await SubCategory.findByIdAndUpdate(data.subCategoryID, { name: data.name })

}
export const editBrand = async (req, res) => {
    const data = req.body
    const update = await Brand.findByIdAndUpdate(data.brandID, { name: data.name })
}
export const editProducts = async (req, res) => {
    const data = req.body
    const updateProduct = await Products.updateOne({ _id: data._id },
        {
            $set: {
                name: data.name,
                category: data.category,
                subCategory: data.subCategory,
                brand: data.brand,
                price: data.price,
                offerPrice: data.offerPrice,
                description: data.description,
                specifications: data.specifications,
                stock: data.stock,
                status: data.status,
            }
        }
    )
    res.json({success:true, message:"products updated successfully"})
};
//delete items controllers
export const deleteProducts = async (req, res) => {
    const id = req.body.id
    const delProduct = await Products.findById({ _id: id })
    console.log(delProduct)
    for (const img of delProduct.images){
        console.log(img.key)
        const command = new DeleteObjectCommand({
            Bucket:process.env.R2_BUCKET_NAME,
            Key:img.key
        });
        await r2.send(command)
    }
    await Products.findByIdAndDelete({ _id: id })

}
// create  orders 
export const createOrders = async (req, res) => {
    const userId = "6992b349449c6ac69a7f7768"

    const products = req.body.cart.map((item, index) => ({
        productId: item._id,
        quantity: Number(item.quantity),
        price: Number(item.offerPrice),
        total: Number(item.offerPrice * item.quantity)
    }))

    const shippingAddress = req.body.shippingAddress
    const subTotal = products.reduce((sum, p) => sum + p.total, 0)
    const deliveryCharge = subTotal < 500 ? 50 : 0
    const finalAmount = subTotal + deliveryCharge

    const orderId ="ORD-" + Date.now() +"-" +Math.random().toString(36).substring(2, 6).toUpperCase()
        

    const order = new orders({
        userId,
        products,
        shippingAddress,
        deliveryCharge,
        finalAmount,
        orderId,

    })
    await order.save()
    res.json({ message:"success",order_id:orderId, amount:finalAmount, key: process.env.RAZORPAY_KEY_ID })

}