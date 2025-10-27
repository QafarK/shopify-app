import express from 'express';
import {
    getBasketProducts,
    addProductToBasket,
    removeProductFromBasket,
    updateProductQuantity,
} from '../controllers/basket.controller.js';

const router = express.Router();

router.get('/products', getBasketProducts);
router.post('/add', addProductToBasket);
router.patch('/update/:id', updateProductQuantity);
router.delete('/delete/:id', removeProductFromBasket);

export default router;
