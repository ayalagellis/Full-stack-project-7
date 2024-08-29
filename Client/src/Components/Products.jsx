import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./header";
import "../CSS/products.css"; 


function Products() {
    const { category } = useParams(); 
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await fetch(`http://localhost:3000/products?category=${category}`);
            const productsData = await response.json();
            setProducts(productsData);
          } catch (error) {
            console.error('Failed to fetch products:', error);
          }
        };
        fetchProducts();
    }, [category]); 

    return (
        <div className="product-page">
            <Header/>

            <h1>{category}</h1>
            <div className="product-list">
                {products.map(product => (
                    <div key={product.id} className="product-item">
                        <img 
                            src={product.image_url} 
                            alt={product.product_name} 
                            className="product-image" 
                        />
                        <h2 className="product-name">{product.product_name}</h2>
                        <p className="product-price">${product.price}</p>
                        <p className="product-stock">
                            {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                        </p>
                        <button className="add-to-cart-button" 
                         onClick={() => handleAddToCart(product)}> Add to Cart </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;
