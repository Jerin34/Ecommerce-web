    const jwt = require('jsonwebtoken');
    const adminMiddleWare = async(req,res,next) =>{
        try{
            const role = req.user.role;
            if(role !== 'admin'){
                return res.status(403).json({message:"Unauthorized"})
            }
            next();
        }catch(err){
            return res.status(403).json({message:"Unauthorized"})
        }
    }
    module.exports = adminMiddleWare