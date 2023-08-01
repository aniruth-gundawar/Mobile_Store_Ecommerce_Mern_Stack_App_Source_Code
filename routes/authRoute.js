import {
  changePasswordController,
  emailSendController,
  getAllOrdersController,
  getOrdersController,
  loginController,
  orderStatusController,
  registerController,
  registerOTPController,
  testcontroller,
  updateProfileController,
} from "../controllers/authController.js";
import express from "express";
import { isAdmin, requireSignIN } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/register", registerController);

router.post("/register-otp", registerOTPController);

router.post("/login", loginController);

router.post("/email-send", emailSendController);

router.post("/change-password", changePasswordController);

router.get("/test", requireSignIN, isAdmin, testcontroller);

router.get("/user-auth", requireSignIN, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/admin-auth", requireSignIN, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

router.put("/profile", requireSignIN, updateProfileController);

router.get("/orders", requireSignIN, getOrdersController);

router.get("/all-orders", requireSignIN, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIN,
  isAdmin,
  orderStatusController
);

export default router;
