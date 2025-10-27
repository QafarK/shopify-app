import User from '../models/user.model.js';
import Product from '../models/product.model.js';
import mongoose from 'mongoose';
import { convertCurrency } from "../utils/currencyConverter.js";

// Add product to favorites
export const addProductToFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // Convert both sides to string for safe comparison
    const alreadyFavorited = user.favoriteProducts.some(
      id => id.toString() === productId
    );

    if (alreadyFavorited) {
      return res.status(400).json({ error: "Product is already in favorites" });
    }

    user.favoriteProducts.push(productId);
    await user.save();

    res.status(200).json({
      message: "Product added to favorites",
      favoriteProducts: user.favoriteProducts,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove product from favorites
export const removeProductFromFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Compare as strings
    user.favoriteProducts = user.favoriteProducts.filter(
      i => i.toString() !== id
    );

    await user.save();

    res.status(200).json({
      message: "Product removed from favorites",
      favoriteProducts: user.favoriteProducts,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all favorite products
export const getFavoriteProducts = async (req, res) => {
  try {
    const { currency = "$" } = req.query;
    const userId = req.user.id;

    const user = await User.findById(userId).select("favoriteProducts");
    if (!user) return res.status(404).json({ error: "User not found" });

    const favoriteProductIds = user.favoriteProducts;
    if (!favoriteProductIds || favoriteProductIds.length === 0) {
      return res.status(200).json([]);
    }

    const products = await Product.find({ _id: { $in: favoriteProductIds } });

    // Convert all products' prices asynchronously
    const formattedFavorites = await Promise.all(
      products.map(async (product) => {
        const productPrice = await convertCurrency(
          product.price,
          product.currency,
          currency
        );

        // Round up to 2 decimal places
        const roundedPrice = Math.ceil(productPrice * 100) / 100;

        return {
          id: product._id,
          title: product.title,
          image: product.images?.[0] || null,
          price: roundedPrice.toFixed(2),
          currency,
        };
      })
    );

    res.status(200).json(formattedFavorites);
  } catch (error) {
    console.error("Error fetching favorite products:", error.message);
    res.status(500).json({ error: error.message });
  }
};
