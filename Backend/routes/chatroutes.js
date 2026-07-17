const express = require("express");
const router = express.Router();
const { chatReply } = require("../controllers/chatcontroller");
router.post("/", chatReply);
module.exports = router;