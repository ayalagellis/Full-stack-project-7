
import express from 'express'
import usersRoute from './routes/usersRoute.js'; 

const app = express()
app.use(express.json());

//Routes
app.use('/users', usersRoute);


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});