import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Header from "./header";
import ProductModal from "./ProductModal";
import UpdateModal from "./UpdateModal"; 
import { getCookie } from "./UserContext";
import "../CSS/products.css"; 
import soundtrumpet from '../assets/trumpet.mp3'; 

function Products() {
    const { category } = useParams(); 
    const [products, setProducts] = useState([]);
    const [selectedQuantities, setSelectedQuantities] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const userDataCookie = getCookie('user-data');
    const decodedCookie = decodeURIComponent(userDataCookie);      
    const userData = JSON.parse(decodedCookie);        
    const customer_id = userData.customer_id;
    const username = userData.username;
    const manager = userData.manager;
    const cart_id = userData.cart_id;
    const total_price = userData.total_price;

    const audioRef = useRef(null); // Create a reference for the audio element

    useEffect(() => {
        fetchProducts();
    }, [category]);
    
    const fetchProducts = async () => {
        try {
            const response = await fetch(`http://localhost:3000/products?category=${category}`);
            const productsData = await response.json();
            setProducts(productsData);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    };
    
    const handleQuantityChange = (productId, quantity) => {
        setSelectedQuantities(prev => ({
            ...prev,
            [productId]: quantity
        }));
    };

    const handleAddProduct = async (productData) => {
        try {
            const response = await fetch('http://localhost:3000/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (response.ok) {
                await response.json();
                fetchProducts();
                setIsModalOpen(false);
            } else {
                console.error('Failed to add product:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to add product:', error);
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            const response = await fetch(`http://localhost:3000/products/${productId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchProducts();
            } else {
                console.error('Failed to delete product:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to delete product:', error);
        }
    };

    const handleUpdateProduct = async (productData) => {
        if (!currentProduct) return;

        try {
            const response = await fetch(`http://localhost:3000/products/${currentProduct.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (response.ok) {
                await response.json();
                fetchProducts();
                setIsUpdateModalOpen(false);
                setCurrentProduct(null);
            } else {
                console.error('Failed to update product:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to update product:', error);
        }
    };

    const handleAddToCart = async (product) => {
        if (!username) {
            alert('You must be logged in to add items to your cart.');
            return;
        }
        const quantity = selectedQuantities[product.id] || 1; // Default to 1 if no quantity is selected
        if (product.quantity < quantity) {
            alert('Selected amount is too much.');
            return;
        }
        try {
            const productId  = product['id'];
            const productPrice = parseFloat(product.price); // Converting price from string to number

            const response = await fetch('http://localhost:3000/cart-items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cart_id,
                    productId,
                    quantity,
                    productPrice
                }),
            });

            if (response.ok) {
                let priceChange = productPrice * quantity;
                let totalPrice = parseFloat(total_price) || 0; 

                let updatedTotalPrice =  totalPrice + priceChange;
                document.cookie = `user-data=${encodeURIComponent(JSON.stringify({
                    ...userData,
                    total_price: updatedTotalPrice // Ensure price is in the correct format
                }))}; path=/`;
                try {
                    await audioRef.current.play();
                } catch (error) {
                    console.error('Failed to play sound:', error);
                }

                alert('Item added to cart successfully.');
            } 
        } catch (error) {
            console.error('Failed to add item to cart:', error);
        }
    };

    return (
        <>
            <Header />

            <div className="product-page">
                <audio ref={audioRef}>
                    <source src={soundtrumpet} type="audio/mp3" />
                    Your browser does not support the audio element.
                </audio>

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
                            {product.quantity > 0 && (
                                <>
                                    <select className="quantity-selector" defaultValue="1"
                                        onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}>
                                        {[...Array(10)].map((_, index) => (
                                            <option key={index} value={index + 1}>
                                                {index + 1}
                                            </option>
                                        ))}
                                    </select>
                                    
                                    <button className="add-to-cart-button" 
                                        onClick={() => handleAddToCart(product)} disabled={product.quantity === 0}>
                                        Add to Cart 
                                    </button>
                                </>
                            )}

                            {manager !== 0 && (
                                <>
                                    <button onClick={() => { setCurrentProduct(product); setIsUpdateModalOpen(true); }}>
                                        Update Item
                                    </button>
                                    <button onClick={() => handleDeleteProduct(product.id)}>
                                        Delete Item
                                    </button>
                                </>
                            )}
                        </div>
                    ))}
                </div>
<br></br>
                {manager !== 0 && (
                    <button onClick={() => setIsModalOpen(true)}>Add Product</button>
                )}

                <ProductModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                    onSubmit={handleAddProduct} 
                />
                {currentProduct && (
                    <UpdateModal 
                        isOpen={isUpdateModalOpen} 
                        onClose={() => { setIsUpdateModalOpen(false); setCurrentProduct(null); }} 
                        onSubmit={handleUpdateProduct} 
                        product={currentProduct}
                    />
                )}
            </div>
        </>
    );
}

export default Products;
