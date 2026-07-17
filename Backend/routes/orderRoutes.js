const express = require('express');
const router = express.Router();
const middleWarefunc = require('../middleware/authMiddleware')
const adminMiddleWare = require('../middleware/adminmiddleware')
const {createOrder,getOrders,getOrderbyId,updateOrder,getAllorders,cancelOrder} = require('../controllers/ordercontrollers')
router.post('/',middleWarefunc,createOrder);
router.get('/',middleWarefunc,getOrders);
router.get('/admin',middleWarefunc,adminMiddleWare,getAllorders);
router.get('/:id',middleWarefunc,getOrderbyId);
router.put('/:id',middleWarefunc,adminMiddleWare,updateOrder);
router.put('/:id/cancel',middleWarefunc,cancelOrder);
module.exports = router