import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
const Register = () => {
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [otp, setOTP] = useState("");
  const [otpform, setOtpForm] = useState(true);
  const navigate = useNavigate();
  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    try {
      let code = otp;
      const res = await axios.post(`/api/v1/auth/register`, {
        code,
        name,
        email,
        password,
        phone,
        address,
      });

      if (res.data.success) {
        toast.success("Registered Successfully", { position: "top-center" });
        navigate("/");
      } else {
        toast.error("Invalid otp", { position: "top-center" });
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong", { position: "top-center" });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/v1/auth/register-otp`, {
        name,
        email,
        password,
        phone,
        address,
      });

      if (res && res.data.success) {
        toast.success("otp sent successfully", { position: "top-center" });
        setOtpForm(false);
      } else {
        toast.error(res?.data.message, { position: "top-center" });
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong", { position: "top-center" });
    }
  };
  return (
    <>
      {/* <div className="registration"> */}
      <Paper elevation={20} style={paperStyle}>
        <div
          className="d-flex flex-column
 align-items-center"
        >
          <Avatar style={avatarStyle}></Avatar>
          <h2 style={headerStyle}>Sign Up</h2>
        </div>
        {otpform ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-3 mt-3">
              <TextField
                required
                id="name"
                label="Name"
                variant="standard"
                value={name}
                fullWidth
                placeholder="Enter Your Name"
                onChange={(e) => setName(e.target.value)}
              />
              {/* <input
            type="text"
            placeholder="Enter Your Name"
            className="form-control"
            id="name"
            aria-describedby="name"
            onChange={(e) => setName(e.target.value)}
            required
          /> */}
            </div>

            <div className="mb-3">
              {/* <input
              type="email"
              placeholder="Enter Your Email"
              className="form-control"
              id="email"
              aria-describedby="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            /> */}
              <TextField
                required
                id="email"
                label="Email"
                variant="standard"
                value={email}
                fullWidth
                placeholder="Enter Your Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              {/* <input
              type="password"
              placeholder="Enter password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            /> */}
              <TextField
                required
                type="password"
                id="password"
                label="password"
                variant="standard"
                value={password}
                fullWidth
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              {/* <input
              type="text"
              placeholder="Enter Your Mobile No."
              className="form-control"
              id="phone"
              aria-describedby="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            /> */}
              <TextField
                required
                id="phone"
                label="phone"
                variant="standard"
                value={phone}
                fullWidth
                placeholder="Enter Your Mobile No."
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="mb-3">
              {/* <input
              type="text"
              placeholder="Enter Your Address"
              className="form-control"
              id="address"
              aria-describedby="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            /> */}
              <TextField
                required
                id="address"
                label="Address"
                variant="standard"
                value={address}
                fullWidth
                placeholder="Enter Your Address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <Button type="submit" color="primary" variant="contained">
              Sign up
            </Button>
          </form>
        ) : (
          <form onSubmit={handleOTPSubmit}>
            <div className="mt-5 ">
              <TextField
                required
                id="otp"
                label="OTP"
                variant="standard"
                value={otp}
                fullWidth
                placeholder="Enter OTP"
                onChange={(e) => setOTP(e.target.value)}
              />
            </div>

            <Button
              className="mt-5"
              type="submit"
              color="primary"
              variant="contained"
            >
              submit
            </Button>
          </form>
        )}
      </Paper>
      {/* </div> */}
    </>
  );
};

export default Register;
