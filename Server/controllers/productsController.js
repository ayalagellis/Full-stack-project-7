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
    const updatedProduct = await updateProduct(id, product_name, product_description, price, quantity, image_url, category);
    res.send(updatedProduct);
};

export const deleteProduct1 = async (req, res) => {
    const id = req.params.id;
    await deleteProduct(id);
    res.send({ message: 'Product deleted successfully' });
};
