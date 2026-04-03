import productModel from '../models/productModel.js';

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

        const productData = {
            name,
            description,
            price: Number(price),
            image: imageList.map((file) => file.path),
            category,
            subCategory: subCategory || subcategory,
            sizes: parsedSizes,
            bestseller: String(bestseller ?? bestSeller) === 'true',
            date: Date.now(),
        };

        const product = new productModel(productData);
        await product.save();

        return res.status(201).json({ success: true, message: 'Product added successfully', product });
    } catch (error) {
        console.error('Error adding product:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const listProducts = async (req, res) => {
	res.status(501).json({ success: false, message: 'List products not implemented yet' });
};

const removeProduct = async (req, res) => {
	res.status(501).json({ success: false, message: 'Remove product not implemented yet' });
};

const singleProduct = async (req, res) => {
	res.status(501).json({ success: false, message: 'Get single product not implemented yet' });
};

export { addProduct, listProducts, removeProduct, singleProduct };
