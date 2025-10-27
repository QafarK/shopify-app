import Product from "../models/product.model.js";
import mongoose from "mongoose";
import { convertCurrency } from "../utils/currencyConverter.js";

// Fetch all products
export const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 20, category, currency = "$" } = req.query;

    const query = {};
    if (category) query.category = category;

    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(query);

    let convertedProducts = products;
    convertedProducts = await Promise.all(
      products.map(async (prod) => {
        const convertedPrice = await convertCurrency(
          prod.price,
          prod.currency,
          currency
        );
        return {
          ...prod.toObject(),
          price: convertedPrice,
          currency,
        };
      })
    );

    res.status(200).json({
      success: true,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      totalProducts: total,
      products: convertedProducts,
    });
  } catch (error) {
    console.error("Error in getAllProducts:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Fetch most recently created products.
export async function getNewProducts(req, res) {
  try {
    const newProducts = await Product.find()
      .sort({ createdAt: -1 }) // newest first
      .limit(10); // top 10

    res.status(200).json(newProducts);
  } catch (error) {
    console.error("Error fetching new products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Fetch detailed information about a single product
export const getProductDetails = async (req, res) => {
  const { id } = req.params;
  const { currency } = req.query;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const productObj = product.toObject();

    if (currency) {
      const convertedPrice = await convertCurrency(
        product.price,
        product.currency,
        currency
      );
      productObj.convertedPrice = convertedPrice;
      productObj.displayCurrency = currency;
    }

    res.status(200).json(productObj);
  } catch (error) {
    console.error("Error in getProductDetails:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Fetch other products from the same category
export async function getSimilarProducts(req, res) {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find other products in the same category (excluding this product)
    const similarProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
    })
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json(similarProducts);
  } catch (error) {
    console.error("Error fetching similar products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Fetch all products in a specific category
export async function getProductsByCategory(req, res) {
  const { category } = req.params;
  try {
    const validCategories = [
      "electronics",
      "clothing",
      "books",
      "furniture",
      "toys",
      "groceries",
      "beauty",
      "sports",
      "automotive",
      "other",
    ];

    if (!validCategories.includes(category)) {
      return res.status(400).json({ message: "Invalid category" });
    }

    const products = await Product.find({ category }).sort({ createdAt: -1 });

    if (!products.length) {
      return res.status(404).json({ message: "No products found in this category" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
