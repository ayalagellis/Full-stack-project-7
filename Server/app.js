
import express from 'express'
import usersRoute from './routes/usersRoute.js'; 
import productsRoute from './routes/productsRoute.js';
import cartRoute from './routes/cartRoute.js';
import cartItemsRoute from './routes/cart_ItemsRoute.js';
import ordersRoute from './routes/ordersRoute.js';
import orderItemsRoute from './routes/order_itemsRoute.js';
import discountsRoute from './routes/discountsRoute.js';

const app = express()
app.use(express.json());

//Routes
app.use('/users', usersRoute);
app.use('/products', productsRoute); // Product routes
app.use('/cart', cartRoute); // Cart routes
app.use('/cart-items', cartItemsRoute); // Cart items routes
app.use('/orders', ordersRoute); // Orders routes
app.use('/order-items', orderItemsRoute); // Order items routes
app.use('/discounts', discountsRoute); // Discounts routes



app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});