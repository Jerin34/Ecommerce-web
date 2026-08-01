const express  = require('express')
const router = express.Router();
const {AddtoCart,GetItem,RemoveFromCart,updateCartQuantity} = require('../controllers/cartController')
const middleWarefunc = require('../middleware/authmiddleware')
router.post('/',middleWarefunc,AddtoCart)
router.get('/',middleWarefunc,GetItem)
router.put('/:id',middleWarefunc,updateCartQuantity)
router.delete('/:id',middleWarefunc,RemoveFromCart)
module.exports = router;