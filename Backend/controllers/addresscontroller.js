const Address = require('../models/address');
const addAddress = async(req,res) =>{
    const {fullName,phone,house,area,city,state,pincode,landmark} = req.body;
    if(!fullName || !phone || !house || !area || !city || !state || !pincode ){
        return res.status(400).json({message:'Please Provide All Required Fields'})
    }
    try{
        const totalAddress = await Address.countDocuments({user:req.user.id});
        const newAddress = new Address({fullName,phone,house,area,city,state,pincode,landmark,user:req.user.id,isDefault:totalAddress === 0});
        await newAddress.save();
        return res.status(201).json({message:"New Address Created SuccessFully",address:newAddress})
    }catch(err){
        return res.status(500).json({message:'Errorn in Creating Address',error:err.message})
    }
}

const getAddress = async(req,res) =>{
    try{
        const addresses = await Address.find({user:req.user.id}).sort({
            isDefault:-1,createdAt:-1
        })
        return res.status(200).json({message:"Addresses fetched SucessFully",addresses})
    }
    catch(err){
        return res.status(500).json({message:'Error in Fetching Addresses',error:err.message})
    }
}
const updateAddress = async (req, res) => {
    const { id } = req.params;

    const {
        fullName,
        phone,
        house,
        area,
        city,
        state,
        pincode,
        landmark
    } = req.body;

    if (
        !fullName ||
        !phone ||
        !house ||
        !area ||
        !city ||
        !state ||
        !pincode
    ) {
        return res.status(400).json({
            message: "Please Provide All Required Fields"
        });
    }

    try {

        const existingAddress = await Address.findOne({
            _id: id,
            user: req.user.id
        });

        if (!existingAddress) {
            return res.status(404).json({
                message: "Address not found"
            });
        }

        const updatedAddress = await Address.findByIdAndUpdate(
            id,
            {
                fullName,
                phone,
                house,
                area,
                city,
                state,
                pincode,
                landmark
            },
            {
               returnDocument: "after",
                runValidators: true
            }
        );

        return res.status(200).json({
            message: "Address updated successfully",
            address: updatedAddress
        });

    } catch (err) {

        return res.status(500).json({
            message: "Error updating address",
            error: err.message
        });

    }
};
const deleteAddress = async(req,res) =>{
    try{
        const {id} = req.params;
        const existinguser = await Address.findOne({
            _id:id,
            user:req.user.id
        });
        if(!existinguser){
            return res.status(404).json({
                message: "Address not found"
            });
        }
        const wasDefault = existinguser.isDefault;
        await Address.findByIdAndDelete(id);
        if(wasDefault){
            const newAddress = await Address.findOne({user:req.user.id}).sort({createdAt:-1});
            if(newAddress){
                await Address.findByIdAndUpdate(newAddress._id,{
                    isDefault:true
                })
            }
        }
        return res.status(200).json({message:"Address Deleted Successfully"})
    }
    
    catch(err){
        return res.status(500).json({message:"Error in Deleting Address",error:err.message})
    }
}
const patchUpdateAddress = async(req,res) =>{
    try{
    const {id} = req.params
    const existingUser = await Address.findOne({
        _id:id,
        user:req.user.id
    })
    if(!existingUser){
        return res.status(404).json({message:'Address Not Found'})
    }
    await Address.updateMany(
        {user:req.user.id},
        {isDefault:false}
    )
    const updatedAddress =await Address.findByIdAndUpdate(id,{
        isDefault:true
    },
{returnDocument:"after"}
)
return res.status(200).json({message:"Address Updated Successfully",data:updatedAddress})
    }
    catch(err){
    return res.status(500).json({message:'Error in updating Addresss',error:err.message})
    }
}

module.exports = {addAddress,getAddress,updateAddress,deleteAddress,patchUpdateAddress}