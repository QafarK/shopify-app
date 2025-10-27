import express from "express";
import {
	getSearchHistory,
	removeProductFromSearchHistory,
	searchProduct,
} from "../controllers/search.controller.js";
import { protect } from "../middleware/auth.middleware.js"

const router = express.Router();

router.get("/", searchProduct);
router.get("/history", protect, getSearchHistory);
router.delete("/history/:id", protect, removeProductFromSearchHistory);

export default router;
