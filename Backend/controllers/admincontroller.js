const Product = require('../models/Product');
const order = require('../models/Order');
const getDashboardData = async(req,res)=>{
    try{
        const totalProducts = await Product.countDocuments();
        const totalOrders = await order.countDocuments();
        const pendingOrders = await order.countDocuments({status:'Pending'});
        const orders = await order.find();
        const totalrevenue = orders.reduce((curr,order)=>{
            return curr + order.totalPrice
        },0).toFixed(2);
        return res.status(200).json({totalProducts,totalOrders,pendingOrders,totalrevenue});
    }
    catch(error){
        return res.status(500).json({message:'Error in Getting Dashboard Data',error:error.message});
    }
}
const getAllOrders = async (req,res) =>{
    try{
        const orders = await order.find().populate('user','name role email').populate('items.product');
        return res.status(200).json({message:"Orders fetched successfully",orders: orders});
    }
    catch(error){
        return res.status(500).json({message:'Error in Getting Orders',error:error.message});
    }
}

const updateOrderStatus = async (req,res) =>{
    const {status} = req.body;
    const {id} = req.params;
    if(!status){
        return res.status(400).json({message:'Please provide  status'});
    }
    try{
        const updateStatus = await order.findByIdAndUpdate(id,{status:status},{new:true});
        if (!updateStatus) {
    return res.status(404).json({
        message: "Order Not Found"
    });
}
        return res.status(200).json({message:'Order Status Updated Successfully',order:updateStatus});
        
    }catch(err){
        return res.status(500).json({message:'Error in Updating Order Status',err:error.message});
    }
}
module.exports = {getDashboardData, getAllOrders, updateOrderStatus}