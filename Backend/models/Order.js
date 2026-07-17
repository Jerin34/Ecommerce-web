const mongoose = require("mongoose")
const OrderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    items:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product',
                required:true,
            },
            quantity:{
                type:Number,
                required:true,
                default:1,
            }
        }
    ],
    totalPrice:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        default:'Pending',
        required:true
    }
},
{
    timestamps:true
})
const Ordermodel = mongoose.model('Order',OrderSchema);
module.exports = Ordermodel;