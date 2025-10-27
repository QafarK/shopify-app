import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [3, "Title must be at least 3 characters"]
    },
    description: {
        type: String,
        required: true,
        minLength: [10, "Description must be at least 10 characters"]
    },
    category: {
        type: String,
        required: true,
        enum: ['electronics', 'clothing', 'books', 'furniture', 'toys', 'groceries', 'beauty', 'sports', 'automotive', 'other']
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price must be a positive number"]
    },
    currency: {
        type: String,
        default: '$',
        required: true,
        enum: ['$', '€', '£', '₼', '₽', '¥']
    },
    stock: {
        type: Number,
        required: true,
        min: [0, "Stock must be a positive number"]
    },
    images: {
        type: Array,
        default: [],
    },
}, { timestamps: true });

productSchema.index({ title: "text", description: "text" });

const Product = mongoose.model('Product', productSchema);

export default Product;
