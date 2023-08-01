import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  customerID: {
    type: String,
    required: true,
  },
  cartContents: {
    type: [Object],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// const Cart = mongoose.model("Cart", CartSchema);
// module.exports = Cart;
export default mongoose.model("cart", CartSchema);
