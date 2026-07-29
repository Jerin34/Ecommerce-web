const Wishlistmodel = require('../models/Wishlist')

const addWishList = async (req,res) =>{
    try{
        const userId = req.user.id
    const {product} = req.body
    const existingProduct = await Wishlistmodel.findOne({user:userId,product})
    if(existingProduct){
        return res.status(400).json({message:'Product Already Exists in Wishlist'})}
    const data = await Wishlistmodel.create({user:userId,product})

    return res.status(201).json({message:'Product Added to Wishlist Successfully',data})
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}
const getWishList = async (req,res) =>{
    try{
    const userId = req.user.id
    const wishList  = await Wishlistmodel.find({user:userId}).populate('product',"name price imageUrl category stock");
    return res.status(200).json({message:'Wishlist Fetched Successfully',wishList})
}
catch(err){
    return res.status(500).json({message:err.message})
}
}
const removeWishList = async (req,res) =>{
    const userId = req.user.id
    const {productId} = req.params
    
    try{
    const deletedProduct = await Wishlistmodel.findOneAndDelete({user:userId,product:productId})
    if(!deletedProduct){
        return res.status(404).json({message:'Product Not Found in Wishlist'})
    }
    return res.status(200).json({message:'Product Removed from Wishlist Successfully'})

}catch(err){
 return res.status(500).json({message:err.message})   
}
     
}
module.exports = {addWishList,getWishList,removeWishList}