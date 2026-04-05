import productModel from '../models/productModel.js';
import v2 from 'cloudinary';
import dotenv from 'dotenv';
import productmodel from '../models/productModel.js';
const addProduct = async (req, res) => {
    try {
        const body = req.body || {};
        const files = req.files || {};

        const {
            name,
            description,
            price,
            category,
            subcategory,
            subCategory,
            sizes,
            bestSeller,
            bestseller,
        } = body;

        const imageList = [
            files.image1?.[0],
            files.image2?.[0],
            files.image3?.[0],
            files.image4?.[0],
        ].filter(Boolean);

        if (!name || !description || !price || !category || !(subcategory || subCategory) || !sizes) {
            return res.status(400).json({ success: false, message: 'Missing required product fields' });
        }

        if (imageList.length === 0) {
            return res.status(400).json({ success: false, message: 'At least one product image is required' });
        }

        const parsedSizes = Array.isArray(sizes) ? sizes : JSON.parse(sizes);

        

        let imageurl = await Promise.all(imageList.map(async (item) => {
           let result = await cloudinary.uploader.upload(item.path, {
                resource_type:'image'
            });
            return result.secure_url;
        }));

        const productData = {
            name,
            description,
            price: Number(price),
            image: imageurl,
            category,
            subCategory: subCategory || subcategory,
            sizes: parsedSizes,
            bestseller: String(bestseller ?? bestSeller) === 'true',
            date: Date.now(),
        };

        const product = new productModel(productData);
        await product.save();
        return res.status(201).json({ success: true, message: 'Product added successfully', product, imageurl });
    } catch (error) {
        console.error('Error adding product:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const listProducts = async (req, res) => {
    try {
        const products = await productmodel.find({});
        return res.status(200).json({ success: true, products });
    } catch (error) {        console.error('Error listing products:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const removeProduct = async (req, res) => {
	try {
        await productModel.findByIdAndDelete(req.body.id);
        return res.status(200).json({ success: true, message: 'Product removed successfully' });
    } catch (error) {
        console.error('Error removing product:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });

    }
};

const singleProduct = async (req, res) => {

    try {
        const {prouductId} = req.body;
        const product = await productModel.findById(prouductId);
        return res.status(200).json({ success: true, product });
    } catch (error) {
        console.error('Error fetching single product:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
	res.status(501).json({ success: false, message: 'Get single product not implemented yet' });
};

export { addProduct, listProducts, removeProduct, singleProduct };
