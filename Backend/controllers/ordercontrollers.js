const Cartmodel = require('../models/Cart')
const OrderModel = require('../models/Order')
const jwt = require('jsonwebtoken');
const createOrder = async(req,res) =>{
    const userId = req.user.id; 
    try{
        const cartItems = await Cartmodel.find({user:userId}).populate('product');
        if(cartItems.length === 0){
          return   res.status(400).json({message:"Cart is empty"})
        }
        let  totalPrice = 0;
        for (let item of cartItems){
            totalPrice += item.product.price * item.quantity;
        }
    const newOrder = new OrderModel({
            user:userId,
            items:cartItems,
            totalPrice:totalPrice
        })
        await newOrder.save();
        await Cartmodel.deleteMany({user:userId});
        return res.status(201).json({message:"Order Created SuccessFully"})
}catch(err){
    return res.status(500).json({message:'Error in Getting Cart Items',error:err.message})}
}
const getOrders = async(req,res) =>{
    const userId = req.user.id;
    try{
        const viewOrders = await OrderModel.find({user:userId}).populate('items.product')
        return res.status(200).json({message:'Orders Fetched Successfully',orders:viewOrders})
    }catch(err){
        return res.status(500).json({message:'Error in Getting Orders',error:err.message})
    }
}
const getOrderbyId = async(req,res) =>{
    const id = req.params.id;
    try{
        const order = await OrderModel.findById(id).populate('items.product');
        if(!order){
            return res.status(404).json({message:'Order Not Found'})
        }else{
            return res.status(200).json({message:'Order Fetched Successfully',order:order})
        }
    }
    catch(err){
        return res.status(500).json({message:'Error in Getting Order',error:err.message})
    }
}
const updateOrder = async(req,res) =>{
    const id = req.params.id;
    const status = req.body.status
    try{
        const order = await OrderModel.findByIdAndUpdate(id,{status:status},{new:true})
        if(!order){
            return res.status(404).json({message:'Order Not Found'})
        }else{
            return res.status(200).json({message:'Order Updated Successfully',order:order})
        }
    
        }
        catch(err){
            return res.status(500).json({message:'Error in Updating Order',error:err.message})
        }
    }
    const getAllorders = async(req,res)=>{      
    try{
    
        const orders = await OrderModel.find().populate('user','name email role').populate('items.product')
        return res.status(200).json({message:"Orders Fetched Successfully",orders:orders})
    }catch(err){
        return res.status(500).json({message:'Error in Getting Orders',error:err.message})
    }
    }
    const cancelOrder = async(req,res,) =>{
        const id = req.params.id;
        try{
            const order = await OrderModel.findById(id)
            if(!order){
                return res.status(404).json({message:'Order Not Found'})
            }
            const validateuser = order.user.toString() == req.user.id
            if(!validateuser){
                return res.status(403).json({message:'Unauthorized Access'})
            }
          
             if(order.status == 'Pending'){
                order.status = 'cancelled'
               await  order.save();
                return res.status(200).json({message:'Order Cancelled Successfully'})
            }
            else{
                return res.status(400).json({message:'Order Cannot be Cancelled'})
            }
        }
        catch(err){
            return res.status(500).json({message:'Error in Canceling Order',error:err.message})
        }
    }
module.exports = {createOrder,getOrders,getOrderbyId,updateOrder,getAllorders,cancelOrder}