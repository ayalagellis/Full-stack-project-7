import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../models/products.js';

export const getProducts1 = async (req, res) => {
    const filters = {
        category: req.query.category,
        priceMin: req.query.priceMin,
        priceMax: req.query.priceMax,
        name: req.query.name
    };

    try {
        const products = await getProducts(filters);
        res.send(products);
    } catch (error) {
        console.error('Error fetching products by filters:', error);
        res.status(500).send('Server Error');
    }
};


export const getProduct1 = async (req, res) => {
    const id = req.params.id;
    const product = await getProduct(id);
    res.send(product);
};

export const createProduct1 = async (req, res) => {
    const { product_name, product_description, price, quantity, image_url, category } = req.body;
    const product = await createProduct(product_name, product_description, price, quantity, image_url, category);
    res.send(product);
};

export const updateProduct1 = async (req, res) => {
    const id = req.params.id;
    const { product_name, product_description, price, quantity, image_url, category } = req.body;

    const updateData = {};
    if (product_name !== undefined) updateData.product_name = product_name;
    if (product_description !== undefined) updateData.product_description = product_description;
    if (price !== undefined) updateData.price = price;
    if (quantity !== undefined) updateData.quantity = quantity;
    if (image_url !== undefined) updateData.image_url = image_url;
    if (category !== undefined) updateData.category = category;

    try {
        if (Object.keys(updateData).length === 0) {
            return res.status(400).send('No fields to update');
        }

        const updatedProduct = await updateProduct(id, updateData);
        res.send(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).send('Error updating product');
    }
};


export const deleteProduct1 = async (req, res) => {
    const id = req.params.id;
    await deleteProduct(id);
    res.send({ message: 'Product deleted successfully' });
};
