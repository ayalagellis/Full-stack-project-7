import React, { useState } from 'react';
import "../CSS/ProductModal.css"; 

const ProductModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        product_name: '',
        product_description: '',
        price: '',
        quantity: '',
        image_url: '',
        category: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>X</button>
                <h2>Add Product</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Product Name:
                        <input type="text" name="product_name" value={formData.product_name} onChange={handleChange} required />
                    </label>
                    <br></br>
                    <label>
                        Product Description:
                        <textarea name="product_description" value={formData.product_description} onChange={handleChange} />
                    </label>
                    <br></br>
                    <label>
                        Price:
                        <input type="number" name="price" value={formData.price} onChange={handleChange} required step="0.01" />
                    </label>
                    <br></br>
                    <label>
                        Quantity:
                        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
                    </label>
                    <br></br>
                    <label>
                        Image URL:
                        <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} />
                    </label>
                    <br></br>
                    <label>
                        Category:
                        <input type="text" name="category" value={formData.category} onChange={handleChange} />
                    </label>
                    <br></br>
                    <button type="submit">Add Product</button>
                </form>
            </div>
        </div>
    );
};

export default ProductModal;
