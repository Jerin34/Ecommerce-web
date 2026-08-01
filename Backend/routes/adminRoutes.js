const express = require('express')
const router = express.Router()
const middleWarefunc = require('../middleware/authmiddleware')
const adminMiddleWare = require('../middleware/adminmiddleware')
const {getDashboardData,getAllOrders,updateOrderStatus} = require('../controllers/admincontroller')
router.get('/dashboard',middleWarefunc,adminMiddleWare,getDashboardData);
router.get('/orders',middleWarefunc,adminMiddleWare,getAllOrders);
router.put('/orders/:id',middleWarefunc,adminMiddleWare,updateOrderStatus); 
module.exports = router;