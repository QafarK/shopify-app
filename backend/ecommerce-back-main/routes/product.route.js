import express from "express";
import {
	getNewProducts,
	getProductDetails,
	getSimilarProducts,
	getProductsByCategory,
	getAllProducts
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/new", getNewProducts);
router.get("/:id/details", getProductDetails);
router.get("/:id/similar", getSimilarProducts);
router.get("/category/:category", getProductsByCategory);

export default router;
