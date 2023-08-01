import cartModel from "../models/cartModel.js";
export const addToCartController = async (req, res) => {
  try {
    const { customerID, cartContents } = req.body;

    const existingUser = await cartModel.findOne({ customerID });
    if (existingUser) {
      return res.status(201).send({
        success: false,
      });
    }
    const cart = await new cartModel({
      customerID,
      cartContents,
    }).save();
    res.status(201).send({
      success: true,
      message: "added to cart ",
      cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in adding to cart",
      error,
    });
  }
};

export const updateCartController = async (req, res) => {
  try {
    const { customerID, cartContents } = req.body;
    const user = await cartModel.findOne({ customerID });
    const id = user._id;
    const updatedcart = await cartModel.findByIdAndUpdate(
      id,
      { customerID, cartContents },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "cart Updated SUccessfully",
      updatedcart,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Update cart",
      error,
    });
  }
};

export const getCartController = async (req, res) => {
  try {
    const { id } = req.params;
    const carts = await cartModel.findOne({ customerID: id });
    res.status(200).send({
      success: true,
      message: "cart fetched succsessfully",
      carts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error while getting cart details",
    });
  }
};
