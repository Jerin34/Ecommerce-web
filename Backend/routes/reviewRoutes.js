    const express = require('express')
    const router = express.Router();
    const middlewareFunc = require('../middleware/authMiddleware')
    const {addReview,getReviews} = require('../controllers/reviewController')
    router.post('/',middlewareFunc,addReview);
    router.get('/:id',getReviews);
    module.exports = router;
