const express = require('express');
const { check } = require('express-validator');
const fileUpload = require('../middlewares/file-upload.js');


const productControllers = require('../controllers/product.controllers');

const router = express.Router();

router.get('/', productControllers.getProducts);

router.get('/:pid', productControllers.getProductById);

router.post('/create/:userName', 
fileUpload.single('image'),
[
    check('productName').not().isEmpty(),
    check('shortName').not().isEmpty(),
    // check('price').isInt(),
    // check('payedPrice').isInt(),
    check('expiration').not().isEmpty(),
    check('location').not().isEmpty(),
    check('description').not().isEmpty(),
    check('functions').not().isEmpty(),

    // check('commentId').not().isEmpty(),
    // check('houseId').not().isEmpty(),
] , productControllers.createProduct);

router.patch('/edit/:pid', [
    check('productName').not().isEmpty()
], productControllers.editProduct);

router.delete('/delete/:pid', productControllers.deleteProduct);


module.exports = router;