const express = require('express');

const { check } = require('express-validator');
const commentController = require('../controllers/comment.controllers');

const router = express.Router();

router.get('/', commentController.getComment);

router.get('/:hid', commentController.getCommentsByHouseId);

router.post('/create/:hid', [
    check('content').not().isEmpty()
], commentController.createComment);

module.exports = router;