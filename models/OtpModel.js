import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
    },
    code: {
      type: String,
    },
    expireIn: Number,
  },
  { timestamps: true }
);
export default mongoose.model("otp", otpSchema);
