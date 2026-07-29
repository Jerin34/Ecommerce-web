const mongoose = require('mongoose')
const WishlistSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true,
    },
},
{
    timestamps:true
}
)
const Wishlistmodel = mongoose.model('Wishlist',WishlistSchema);
module.exports = Wishlistmodel;