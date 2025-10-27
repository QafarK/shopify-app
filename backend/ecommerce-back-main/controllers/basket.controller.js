import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import BasketItem from "../models/basket.model.js";
import mongoose from "mongoose";
import { convertCurrency } from "../utils/currencyConverter.js";

// Get all basket products with total price
export async function getBasketProducts(req, res) {
    const { currency = "$" } = req.query;
    try {
        const user = await User.findById(req.user._id)
            .populate({
                path: "basket",
                populate: {
                    path: "product",
                    model: "Product",
                },
            })
            .lean();

        if (!user || !user.basket.length) {
            return res.status(200).json({
                success: true,
                message: "Basket is empty",
                content: [],
                basketTotal: 0,
            });
        }

        let basketTotal = 0;

        const basketWithTotals = await Promise.all(
            user.basket.map(async (item) => {
                const product = item.product;
                if (!product) return null;

                const productPrice = await convertCurrency(
                    product.price,
                    product.currency,
                    currency
                );

                const itemTotal = productPrice * item.count;
                basketTotal += itemTotal;

                return {
                    id: item._id,
                    productId: product._id,
                    title: product.title,
                    count: item.count,
                    pricePerItem: productPrice.toFixed(2),
                    currency,
                    total: (Math.ceil(itemTotal * 100) / 100).toFixed(2),
                    image: product.images?.[0] || null,
                };
            })
        );

        res.status(200).json({
            success: true,
            content: basketWithTotals.filter(Boolean),
            basketTotal: (Math.ceil(basketTotal * 100) / 100).toFixed(2),
            currency
        });
    } catch (error) {
        console.error("Error in getBasketProducts:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// Add a product to basket
export async function addProductToBasket(req, res) {
    const { productId, count = 1 } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        let basketItem = await BasketItem.findOne({
            product: productId,
        });

        if (!basketItem) {
            basketItem = await BasketItem.create({ product: productId, count });
        } else {
            basketItem.count += count;
            await basketItem.save();
        }

        await User.findByIdAndUpdate(req.user._id, {
            $addToSet: { basket: basketItem._id },
        });

        res.status(201).json({ success: true, message: "Product added to basket" });
    } catch (error) {
        console.error("Error in addProductToBasket:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// Update product quantity in basket
export async function updateProductQuantity(req, res) {
    const { basketItemId, newCount } = req.body;

    if (!mongoose.Types.ObjectId.isValid(basketItemId)) {
        return res.status(400).json({ success: false, message: "Invalid basket item ID" });
    }

    if (newCount < 0) {
        return res.status(400).json({ success: false, message: "Quantity cannot be negative" });
    }

    try {
        const basketItem = await BasketItem.findById(basketItemId);
        if (!basketItem) {
            return res.status(404).json({ success: false, message: "Basket item not found" });
        }

        basketItem.count = newCount;
        await basketItem.save();

        res.status(200).json({ success: true, message: "Quantity updated" });
    } catch (error) {
        console.error("Error in updateProductQuantity:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// Remove product from basket
export async function removeProductFromBasket(req, res) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid basket item ID" });
    }

    try {
        await BasketItem.findByIdAndDelete(id);
        await User.findByIdAndUpdate(req.user._id, { $pull: { basket: id } });

        res.status(200).json({ success: true, message: "Product removed from basket" });
    } catch (error) {
        console.error("Error in removeProductFromBasket:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
