const mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema({
    name:{
        type:String,required:true,trim:true
    },
    price:{
        type:Number,required:true
    },
    description:{
        type:String,required:true
    },
    imageUrl:{
        type:String,required:true
    },
    category:{
        type:String,required:true,
    },
    stock:{
        type:Number,required:true,default:0
    },
    rating:{
        type:Number,default:0
    },
    numReviews:{
        type:Number,default:0
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }

},
{
    timestamps:true
})
const ProductModel = mongoose.model('Product',ProductSchema);
module.exports = ProductModel;