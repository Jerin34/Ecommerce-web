const Reviewmodel = require('../models/Review')
const addReview = async(req,res) =>{
    try{
        const {product,rating,comment} = req.body;
        const userid = req.user.id
        const ReviewExist = await Reviewmodel.findOne({product,user:userid})
        if(ReviewExist){
            return res.status(400).json({message:'Review Already Exists'})
        }
        if(rating < 1 || rating > 5){
            return res.status(400).json({message:'Rating must be between 1 and 5'})
        }
        if (!comment.trim()) {
    return res.status(400).json({message: "Comment should not be Empty"});
}
        const review = new Reviewmodel({
            product,
            user:userid,
            rating,
            comment
        })
        await review.save();
        return res.status(201).json({message:'Review Added Successfully',review})
    }
    catch(err){
        return res.status(400).json({message:err.message})
    }
}
const getReviews = async(req,res) =>{
    try{
    const productId = req.params.id;
    const reviews = await Reviewmodel.find({product:productId}).populate('user','name').sort({createdAt:-1});
    return res.status(200).json({message:'Reviews Fetched Successfully',reviews})
    }
    catch(err){
        return res.status(400).json({message:err.message})
    }
}
module.exports = {addReview,getReviews}