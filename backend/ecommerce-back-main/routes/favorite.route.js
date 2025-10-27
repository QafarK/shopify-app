import express from 'express';
import {
    getFavoriteProducts,
    addProductToFavorites,
    removeProductFromFavorites,
} from '../controllers/favorite.controller.js';

const router = express.Router();

router.get('/products', getFavoriteProducts)
router.post('/add', addProductToFavorites)
router.delete('/delete/:id', removeProductFromFavorites);

export default router;