const express = require('express');

const replyController = require('../controllers/reply.controllers');

const router = express.Router();

router.get('/:cid', replyController.getReplyByCommentId);

router.post('/create/:cid', replyController.createReply);

module.exports = router;