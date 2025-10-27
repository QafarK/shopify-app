import dotenv from "dotenv"
dotenv.config()
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js"
import basketRoutes from "./routes/basket.route.js"
import searchRoutes from "./routes/search.route.js";
import favoriteRoutes from "./routes/favorite.route.js"

import { connectDB } from "./config/db.js";
import { protect } from "./middleware/auth.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/basket", protect, basketRoutes);
app.use("/api/v1/search", searchRoutes);
app.use("/api/v1/favorites", protect, favoriteRoutes);

app.listen(process.env.PORT, () => {
	console.log("Server started at http://localhost:" + process.env.PORT);
	connectDB();
});
