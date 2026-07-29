const express = require('express');
const router  =  express.Router();
const middleWarefunc = require('../middleware/authMiddleware')
const {addAddress,getAddress,updateAddress,deleteAddress,patchUpdateAddress} = require('../controllers/addresscontroller')
router.post('/',middleWarefunc,addAddress);
router.get('/',middleWarefunc,getAddress);
router.put('/:id', middleWarefunc, updateAddress);
router.delete('/:id', middleWarefunc, deleteAddress);
router.patch('/:id', middleWarefunc, patchUpdateAddress);
module.exports = router