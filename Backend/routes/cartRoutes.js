const express  = require('express')
const router = express.Router();
const {AddtoCart,GetItem,RemoveFromCart} = require('../controllers/cartController')
const middleWarefunc = require('../middleware/authMiddleware')
router.post('/',middleWarefunc,AddtoCart)
router.get('/',middleWarefunc,GetItem)
router.delete('/:id',middleWarefunc,RemoveFromCart)
module.exports = router;