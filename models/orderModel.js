import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // products: [
    //   {
    //     type: mongoose.ObjectId,
    //     ref: "Products",
    //   },
    // ],
    products: {
      type: [Object],
    },
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "Not Processed",
      enum: ["Not Processed", "Processing", "Shipped", "Deliverd", "Cancel"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
