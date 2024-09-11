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

    // Initialize user data with default values
    const userDataCookie = getCookie('user-data');
    let userData = { customer_id: null, username: null, manager: 0, cart_id: null, total_price: '0' };
    
    if (userDataCookie) {
        try {
            const decodedCookie = decodeURIComponent(userDataCookie);
            userData = JSON.parse(decodedCookie);
        } catch (error) {
            console.error('Failed to parse user data from cookie:', error);
        }
    }

    const { customer_id, username, manager, cart_id, total_price } = userData;
    
    const audioRef = useRef(null);

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
                credentials: 'include'
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
                credentials: 'include'
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
                credentials: 'include'
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
        const quantity = selectedQuantities[product.id] || 1;
        if (product.quantity < quantity) {
            alert('Selected amount is too much.');
            return;
        }
        try {
            const productId  = product['id'];
            const productPrice = parseFloat(product.price); 

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
                let updatedTotalPrice = parseFloat(total_price) + priceChange;

                document.cookie = `user-data=${encodeURIComponent(JSON.stringify({
                    ...userData,
                    total_price: updatedTotalPrice
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
                                    <button onClick={() => { setCurrentProduct(product); setIsUpdateModalOpen(true); }} >
                                        Update Item
                                    </button>
                                    <button onClick={() => handleDeleteProduct(product.id)} >
                                        Delete Item
                                    </button>
                                </>
                            )}
                        </div>
                    ))}
                </div>
                <br />
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
