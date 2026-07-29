const mongoose = require('mongoose')
const AddressSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
     fullName: {
            type: String,
            required: true,
        },

        phone: {
            type: String,
            required: true,
        },

        house: {
            type: String,
            required: true,
        },

        area: {
            type: String,
            required: true,
        },

        city: {
            type: String,
            required: true,
        },

        state: {
            type: String,
            required: true,
        },

        pincode: {
            type: String,
            required: true,
        },

        landmark: {
            type: String,
            default: "",
        },

        isDefault: {
            type: Boolean,
            default: false,
        },

},
{
    timestamps:true
})
const Addressmodel = mongoose.model('Address',AddressSchema);
module.exports = Addressmodel;