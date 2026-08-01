    const express = require('express')
    const router = express.Router();
    const middlewareFunc = require('../middleware/authmiddleware')
    const {addReview,getReviews} = require('../controllers/reviewcontroller')
    router.post('/',middlewareFunc,addReview);
    router.get('/:id',getReviews);
    module.exports = router;
