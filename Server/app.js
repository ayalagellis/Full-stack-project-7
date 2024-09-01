import express from 'express'
import cors from 'cors'; 
import cookieParser from 'cookie-parser';
import usersRoute from './routes/usersRoute.js'; 
import productsRoute from './routes/productsRoute.js';
import cartRoute from './routes/cartRoute.js';
import cartItemsRoute from './routes/cart_itemsRoute.js';
import ordersRoute from './routes/ordersRoute.js';
import orderItemsRoute from './routes/order_itemsRoute.js';
import discountsRoute from './routes/discountsRoute.js';


const app = express()
// app.use(cors({
//   origin: 'http://localhost:3000', 
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   credentials: true
// }));
app.use(cors()); // Allow requests from any origin

app.use(express.json());
app.use(cookieParser());


//Routes
app.use('/users', usersRoute);
app.use('/products', productsRoute); // Product routes
app.use('/cart', cartRoute); // Cart routes
app.use('/cart-items', cartItemsRoute); // Cart items routes
app.use('/orders', ordersRoute); // Orders routes
app.use('/order-items', orderItemsRoute); // Order items routes
app.use('/discounts', discountsRoute); // Discounts routes


app.use((req, res, next) => {
  res.status(404).send('Not Found');
});



app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});