import express from "express";
import {
  addToCartController,
  updateCartController,
  getCartController,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/add-to-cart", addToCartController);
router.put("/update-cart", updateCartController);
router.get("/get-cart/:id", getCartController);
export default router;
