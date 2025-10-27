import mongoose from "mongoose";

const basketItemSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: true
  },
  count: {
    type: Number,
    default: 1,
    min: [1, "Item count must be at least 1"]
  }
}, { timestamps: true });

const BasketItem = mongoose.model('BasketItem', basketItemSchema);

export default BasketItem;
