const express = require("express")
const router = express.Router()
const middleWarefunc = require('../middleware/authMiddleware')
const {addWishList,getWishList,removeWishList} = require('../controllers/wishlistController')
router.post('/',middleWarefunc,addWishList);
router.get('/',middleWarefunc,getWishList);
router.delete('/:productId',middleWarefunc,removeWishList);
module.exports = router