import { configDotenv } from "dotenv";
import userModel from "../models/userModel.js";
import { comparepassword, hashpassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import orderModel from "../models/orderModel.js";
import OtpModel from "../models/OtpModel.js";
import { mailer } from "../helpers/sendEmail.js";

export const registerOTPController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "password is required" });
    }
    if (!phone) {
      return res.send({ message: "phone is required" });
    }
    if (!address) {
      return res.send({ message: "address is required" });
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered .Please Login",
      });
    }
    let otpcode = Math.floor(Math.random() * 10000 + 1);
    let optpdata = new OtpModel({
      email,
      code: otpcode,
      expireIn: new Date().getTime() + 300 * 1000,
    });
    let otpResponse = await optpdata.save();
    mailer(email, otpcode);
    return res.status(201).send({
      success: true,
      message: "otp sent to the email please check your mail",
      optpdata,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

export const registerController = async (req, res) => {
  try {
    const { code, name, email, password, phone, address } = req.body;
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "password is required" });
    }
    if (!phone) {
      return res.send({ message: "phone is required" });
    }
    if (!address) {
      return res.send({ message: "address is required" });
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(201).send({
        success: false,
        message: "Already Registered .Please Login",
      });
    }

    let data = await OtpModel.findOne({ email, code });
    if (data) {
      let currentTime = new Date().getTime();
      let diff = data.expireIn - currentTime;
      if (diff < 0) {
        return res.status(401).send({
          success: false,
          message: " expired",
        });
      }
    } else {
      return res.status(200).send({
        success: false,
        message: " invalid mail or otp",
      });
    }
    const hashedPassword = await hashpassword(password);
    let names = name.charAt(0).toUpperCase() + name.slice(1);
    const user = await new userModel({
      name: names,
      email,
      password,
      phone,
      address,
      password: hashedPassword,
    }).save();
    res.status(201).send({
      success: true,
      message: "user Registered  Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

export const emailSendController = async (req, res) => {
  try {
    const { email } = req.body;
    let data = await userModel.findOne({ email });
    if (data) {
      let otpcode = Math.floor(Math.random() * 10000 + 1);
      let optpdata = new OtpModel({
        email,
        code: otpcode,
        expireIn: new Date().getTime() + 300 * 1000,
      });
      let otpResponse = await optpdata.save();
      mailer(email, otpcode);
      return res.status(201).send({
        success: true,
        message: "otp sent to the email please check your mail",
        optpdata,
      });
    } else {
      return res.status(401).send({
        success: false,
        message: " email is not registered",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While sending otp",
      error,
    });
  }
};

export const changePasswordController = async (req, res) => {
  try {
    let { email, code, password } = req.body;

    let data = await OtpModel.findOne({ email, code });
    if (data) {
      let currentTime = new Date().getTime();
      let diff = data.expireIn - currentTime;
      if (diff < 0) {
        return res.status(401).send({
          success: false,
          message: " expired",
        });
      } else {
        let user = await userModel.findOne({ email });
        const hashedPassword = await hashpassword(password);
        user.password = hashedPassword;
        user.save();
        return res.status(201).send({
          success: true,
          message: " password changed succesfully",
        });
      }
    } else {
      return res.status(200).send({
        success: false,
        message: " invalid mail or otp",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: " error in changingpassword",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: " invalid email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).send({
        success: false,
        message: " email is not registered",
      });
    }
    const match = await comparepassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Email or password",
      });
    }
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_HASH, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: " Error in Login",
      error,
    });
  }
};

export const testcontroller = (req, res) => {
  res.send(" protected routes");
};

//update prfole
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashpassword(password) : undefined;
    let names = name.charAt(0).toUpperCase() + name.slice(1);

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: names || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};

export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Geting Orders",
      error,
    });
  }
};

export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Getting Orders",
      error,
    });
  }
};

export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updating Order Status",
      error,
    });
  }
};
