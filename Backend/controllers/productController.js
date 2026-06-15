const  ProductModel = require('../models/Product')
const createProduct = async (req,res) =>{
    const {name,price,description,category,imageUrl,stock} = req.body;
    const createdBy = req.user.id;
    if(!name || !price || !description || !category || !imageUrl ){
        return res.status(400).json({message:'Please Provide All Required Fields'})
    }
    try{
        const newProduct = new ProductModel({
            name,price,description,category,imageUrl,stock,createdBy
        })
        await newProduct.save();
        return res.status(201).json({message:"New Product Created SuccessFully"})
    }catch(err){
        return res.status(500).json({message:'Errorn in Creating Product',error:err.message})
    }
}
const getProducts  = async (req,res) =>{
    try{
    const products = await ProductModel.find()
    return res.status(200).json({products})
    }catch(err){
        return res.status(500).json({message:'Error in Getting Products'})
    }
}
const getProductsById = async(req,res) =>{
    const id = req.params.id
    try{
    const product = await ProductModel.findById(id)
    if(!product){
        return res.status(404).json({message:'No Product Found'})
    }else{
        return res.status(200).json({product})
    }
}
catch(err){
    return res.status(500).json({message:'Error in Getting Product'})
}
}
const updateProducts = async(req,res) =>{
    const id = req.params.id
    try{
    const updatedProduct = await ProductModel.findByIdAndUpdate(id,req.body,{new:true})
    if(!updatedProduct){
        return res.status(404).json({message:'Product Not Found'})
    }else{
        return res.status(200).json({message:'Product Updated Successfully',product:updatedProduct})
    }
}catch(err){
    return res.status(500).json({message:'Error in Updating Product'})
}
}
const deleteProduct = async(req,res) =>{
    const id =  req.params.id
    try{
        const deletedProduct = await ProductModel.findByIdAndDelete(id)
        if(!deletedProduct){
            return res.status(404).json({message:'Product Not Found'})
        }else{
            return res.status(200).json({message:'Product Deleted Successfully'})
        }
    }
    catch(err){
        return res.status(500).json({message:'Error in Deleting Product'})
    }
}
module.exports = {createProduct,getProducts,getProductsById,updateProducts,deleteProduct}
