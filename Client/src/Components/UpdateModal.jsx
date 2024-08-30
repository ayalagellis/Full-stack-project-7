import React, { useState, useEffect } from 'react';
import '../CSS/updateModal.css'; // Import the CSS file

function UpdateModal({ isOpen, onClose, onSubmit, product }) {
    const [formData, setFormData] = useState({
        product_name: '',
        product_description: '',
        price: '',
        quantity: '',
        image_url: '',
        category: ''
    });

    useEffect(() => {
        if (product) {
            setFormData({
                product_name: product.product_name || '',
                product_description: product.product_description || '',
                price: product.price || '',
                quantity: product.quantity || '',
                image_url: product.image_url || '',
                category: product.category || ''
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({  ...prev,[name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedFields = Object.fromEntries(
            Object.entries(formData).filter(([key, value]) => value !== product[key])
        );

        if (Object.keys(updatedFields).length > 0) {
            onSubmit(updatedFields);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
            <button className="modal-close" onClick={onClose}>X</button>
                <h2>Update Product</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Product Name:
                        <input 
                            type="text" 
                            name="product_name" 
                            value={formData.product_name} 
                            onChange={handleChange} 
                            placeholder="Product Name"
                        />
                    </label>
                    <label>
                        Product Description:
                        <textarea 
                            name="product_description" 
                            value={formData.product_description} 
                            onChange={handleChange} 
                            placeholder="Product Description"
                        />
                    </label>
                    <label>
                        Price:
                        <input 
                            type="number" 
                            name="price" 
                            value={formData.price} 
                            onChange={handleChange} 
                            placeholder="Price"
                        />
                    </label>
                    <label>
                        Quantity:
                        <input 
                            type="number" 
                            name="quantity" 
                            value={formData.quantity} 
                            onChange={handleChange} 
                            placeholder="Quantity"
                        />
                    </label>
                    <label>
                        Image URL:
                        <input 
                            type="text" 
                            name="image_url" 
                            value={formData.image_url} 
                            onChange={handleChange} 
                            placeholder="Image URL"
                        />
                    </label>
                    <label>
                        Category:
                        <input 
                            type="text" 
                            name="category" 
                            value={formData.category} 
                            onChange={handleChange} 
                            placeholder="Category"
                        />
                    </label>
                    <button type="submit">Update</button>
                    <button type="button" className="cancel" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateModal;
