const express = require('express');
const {loginUser} = require('../controllers/authcontroller');
const router = express.Router();
const {registerUser} = require('../controllers/authcontroller');
router.post('/register',registerUser);
router.post('/login',loginUser);
module.exports = router;