import express from "express";
import { isAdmin, requireSignIN } from "../middlewares/authMiddleware.js";
import {
  categoryController,
  categoryPhotoContoller,
  createCategorycontroller,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";
import formidable from "express-formidable";
const router = express.Router();

router.post(
  "/create-category",
  requireSignIN,
  isAdmin,
  formidable(),
  createCategorycontroller
);

router.put(
  "/update-category/:id",
  requireSignIN,
  isAdmin,
  formidable(),
  updateCategoryController
);

router.get("/get-category", categoryController);

router.get("/category-photo/:id", categoryPhotoContoller);

router.get("/single-category/:slug", singleCategoryController);

router.delete(
  "/delete-category/:id",
  requireSignIN,
  isAdmin,
  deleteCategoryController
);

export default router;
