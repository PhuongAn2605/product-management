const express = require('express');

const replyController = require('../controllers/reply.controllers');

const router = express.Router();

router.get('/', replyController.getReply);

router.post('/create', replyController.createReply);

module.exports = router;