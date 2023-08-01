import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";
import fs from "fs";
export const createCategorycontroller = async (req, res) => {
  try {
    const { name } = req.fields;
    const { photo } = req.files;

    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: "true",
        message: "Category Already Exists",
      });
    }
    if (photo && photo.size > 1000000) {
      return res
        .status(500)
        .send({ error: "photo is Required && should be less than 1MB " });
    }
    // const category = await new categoryModel({
    //   ...req.fields,
    //   slug: slugify(name),
    // }).save();
    const category = new categoryModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      category.photo.data = fs.readFileSync(photo.path);
      category.photo.contentType = photo.type;
    }

    await category.save();
    res.status(201).send({
      success: "true",
      message: "Category Created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in category",
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { name, slug } = req.fields;
    const { photo } = req.files;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      category.photo.data = fs.readFileSync(photo.path);
      category.photo.contentType = photo.type;
    }
    await category.save();
    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category",
    });
  }
};

export const categoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({}).select("-photo");
    res.status(200).send({
      success: true,
      message: "all Categories List",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error while getting all categories",
    });
  }
};
export const singleCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await categoryModel.findOne({ slug }).select("-photo");
    res.status(200).send({
      success: true,
      message: "Get single category successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error while getting single category",
    });
  }
};

export const categoryPhotoContoller = async (req, res) => {
  try {
    const category = await categoryModel
      .findById(req.params.id)
      .select("photo");
    if (category.photo.data) {
      res.set("Content-type", category.photo.contentType);
      return res.status(200).send(category.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting  category Photo",
    });
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id).select("-photo");
    res.status(200).send({
      success: true,
      message: "Category Deleted Succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error while deleting category",
    });
  }
};
