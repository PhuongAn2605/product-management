const express = require('express');
const { check } = require('express-validator');

const productControllers = require('../controllers/product.controllers');

const router = express.Router();

router.get('/', productControllers.getProductById);

router.post('/create', [
    check('productName').not().isEmpty(),
    check('shortName').not().isEmpty(),
    check('image').not().isEmpty(),
    check('price').not().isInt(),
    check('payedPrice').not().isInt(),
    check('expiration').not().isEmpty(),
    check('location').not().isEmpty(),
    check('description').not().isEmpty(),
    check('commentId').not().isEmpty(),
    check('houseId').not().isEmpty(),
] , productControllers.createProduct);

router.patch('/edit/:pid', [
    check('productName').not().isEmpty()
], productControllers.editProduct);

router.delete('/delete/:pid', productControllers.deleteProduct);


module.exports = router;