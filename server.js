import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import path from "path";
dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/build")));

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/category", categoryRoutes);

app.use("/api/v1/products", productRoutes);

app.use("/api/v1/cart", cartRoutes);

app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
// app.get("/", (req, res) => {
//   res.send({
//     message: "Ecommerce Website",
//   });
// });
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
