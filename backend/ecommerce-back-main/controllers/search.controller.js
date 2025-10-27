import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import mongoose from "mongoose";
import { convertCurrency } from "../utils/currencyConverter.js";
import jwt from "jsonwebtoken"

// Search for products by title or description (case-insensitive)
export async function searchProduct(req, res) {
  const { searchterm, currency = '$' } = req.query;
  let user = null;

  const auth = req.headers.authorization

  if (auth) {
    const token = auth?.split(' ')[1] || req.cookies.accessToken
    if (!token) {
      return res.status(401).json({ error: 'Not authorized' })
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    user = await User.findById(decoded.id).select('-password')
  }

  try {
    if (!searchterm || searchterm.trim().length < 2) {
      return res.status(400).json({ success: false, message: "Search query too short" });
    }

    // Perform text search with relevance score
    const results = await Product.find(
      { $text: { $search: searchterm } },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } }) // highest relevance first
      .limit(20);

    if (!results || results.length === 0) {
      return res.status(404).json({ success: false, message: "No products found" });
    }

    // Convert all products' prices asynchronously
    const formattedFavorites = await Promise.all(
      results.map(async (product) => {
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

    // If user is logged in, update search history
    if (user) {
      const existingUser = await User.findById(user._id);
      if (existingUser) {
        const firstResult = results[0];

        const exists = existingUser.searchHistory.some(
          (item) => item.id === firstResult._id.toString()
        );

        if (!exists) {
          existingUser.searchHistory.push({
            id: firstResult._id.toString(),
            image: firstResult.images?.[0] || null,
            title: firstResult.title,
            price: firstResult.price,
            currency: firstResult.currency,
          });

          // Keep only last 10 searches
          if (existingUser.searchHistory.length > 10) {
            existingUser.searchHistory = existingUser.searchHistory.slice(-10);
          }

          await existingUser.save();
        }
      }
    }

    res.status(200).json({ success: true, content: formattedFavorites });
  } catch (error) {
    console.error("Error in searchProduct:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// Returns the user's product search history
export async function getSearchHistory(req, res) {
  const { currency = '$' } = req.query;
  
  try {
    const user = await User.findById(req.user._id).select("searchHistory");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const historyItems = user.searchHistory

    const convertedHistoryItems = await Promise.all(
      historyItems.map(async (product) => {
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

    res.status(200).json({ success: true, content: convertedHistoryItems });
  } catch (error) {
    console.error("Error getting search history:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// Removes a specific product from search history by product ID
export async function removeProductFromSearchHistory(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid product ID" });
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { searchHistory: { _id: id } } },
      { new: true }
    ).select("searchHistory");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product removed from search history",
      content: user.searchHistory,
    });
  } catch (error) {
    console.error("Error removing from search history:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
