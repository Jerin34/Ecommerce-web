const Cartmodel = require('../models/Cart')
const ProductModel = require('../models/Product')
const AddtoCart = async(req,res) =>{
    const userId = req.user.id;
    const {productId} = req.body;
    try{
    const product = await ProductModel.findById(productId);
    if(!product){
        return res.status(404).json({message:'Product Not Found'})
    }
    const cartitem = await Cartmodel.findOne({
        user:userId,
        product:productId
    })
    if(cartitem){
        cartitem.quantity  +=1;
        await cartitem.save();
        return res.status(200).json({message:'Product Added to Cart Successfully'})
    }
    else{
        const newCartItem = new Cartmodel({
            user:userId,
        product:productId
        })
        await newCartItem.save();
        return res.status(201).json({message:'New Product added to Cart'})
    }
}
catch(err){
    return res.status(500).json({message:'Error in Adding Product to Cart',error:err.message})
}
}
const GetItem = async (req,res) =>{
    const userId = req.user.id;
    try{
        const cartItem = await Cartmodel.find({user:userId}).populate('product');
        return res.status(200).json({message:'Cart Items',cartItem})
    }
    catch(err){
        return res.status(500).json({message:'Error in Getting Cart Items',error:err.message})
    }
}
const RemoveFromCart = async (req,res) =>{
    const id = req.params.id;
    try{
        const cartItem = await Cartmodel.findByIdAndDelete(id);
        if(!cartItem){
            return res.status(404).json({message:'Cart Item Not Found'})
        }
        return res.status(200).json({message:'Cart Item Deleted Successfully'})
    }
    catch(err){
        return res.status(500).json({message:'An error Occured',error:err.message})
    }
}
module.exports = {AddtoCart,GetItem,RemoveFromCart}