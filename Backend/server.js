require("dotenv").config();
 const express= require('express');
 const app = express();
 const PORT = process.env.PORT || 5000;
 const connectDb  = require('./config/db')
 const cors = require('cors');
 const authRoutes = require('./routes/authRoutes')
const middleWarefunc  = require('./middleware/authmiddleware')
const productRoutes = require('./routes/productRoutes')
const cartRoutes = require('./routes/cartRoutes')
const orderRoutes = require('./routes/orderRoutes')
const adminRoutes = require('./routes/adminRoutes')
const chatRoutes = require('./routes/chatRoutes')
const reviewRoutes = require('./routes/reviewRoutes')
const wishListRoutes = require('./routes/wishlistRoutes')
const addressRoutes = require('./routes/addressRoutes')
 app.use(express.json());
 app.use(cors());
 connectDb();
 app.use('/api/auth',authRoutes);
app.get('/',(req,res) =>{
  res.send("Lets start the backend now")
})
app.use('/api/cart',cartRoutes);
app.use('/api/products',productRoutes);
app.use('/api/orders',orderRoutes);     
app.use('/api/admin', adminRoutes);
app.get('/protected',middleWarefunc,(req,res) =>{
res.json({message:"This is a protected route",user:req.user});
});
app.use('/api/review',reviewRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/wishlist',wishListRoutes);
app.use('/api/address',addressRoutes);
app.listen(PORT,() =>{
 console.log(`Server is Running on port ${PORT}`);
})
module.exports = app;