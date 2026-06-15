 const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
 const express= require('express');
 const app = express();
 require('dotenv').config();
 const connectDb  = require('./config/db')
 const cors = require('cors');
 const authRoutes = require('./routes/authRoutes')
const middleWarefunc  = require('./middleware/authmiddleware')
const productRoutes = require('./routes/productRoutes')
const cartRoutes = require('./routes/cartRoutes')
 app.use(express.json());
 app.use(cors());
 connectDb();
 app.use('/api/auth',authRoutes);
app.get('/',(req,res) =>{
    res.send("Lets start the backend now")
})
app.use('/api/cart',cartRoutes);
app.use('/api/products',productRoutes);
app.get('/protected',middleWarefunc,(req,res) =>{
    res.json({message:"This is a protected route",user:req.user});
});
app.listen(5000,() =>{
    console.log('Server is Running on port 5000');
}) 
module.exports = app;