import express from "express";
import { isAdmin, requireSignIN } from "../middlewares/authMiddleware.js";
import {
  brainTreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productListController,
  productPhotoContoller,
  productsFilterController,
  realtedProductController,
  updateProductController,
  updateProductQuantityController,
} from "../controllers/productController.js";
import formidable from "express-formidable";
const router = express.Router();

router.post(
  "/create-product",
  requireSignIN,
  isAdmin,
  formidable(),
  createProductController
);

router.get("/get-product", getProductController);

router.get("/get-product/:slug", getSingleProductController);

router.get("/product-photo/:pid", productPhotoContoller);

router.delete(
  "/delete-product/:pid",
  requireSignIN,
  isAdmin,
  deleteProductController
);

router.put(
  "/update-product/:pid",
  requireSignIN,

  formidable(),
  updateProductController
);

router.put("/update-product-quantity/:pid", updateProductQuantityController);

router.post("/product-filters", productsFilterController);

router.get("/product-count", productCountController);

router.get("/product-list/:page", productListController);

router.get("/related-product/:pid/:cid", realtedProductController);

router.get("/product-category/:slug", productCategoryController);

router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIN, brainTreePaymentController);

export default router;
