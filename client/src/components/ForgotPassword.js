import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/registerpage.css";
import Alert from "@mui/material/Alert";
import { ToastContainer, toast } from "react-toastify";

import { useAuth } from "../context/Auth";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

const ForgotPassword = () => {
  const paperStyle = {
    padding: 20,

    width: 280,
    margin: "20px auto",
  };

  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const [email, setEmail] = useState("");
  const [otpform, setOtpForm] = useState(true);
  const [password, setPassword] = useState("");
  const [otp, setOTP] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/v1/auth/email-send`, { email });

      if (res && res.data.success) {
        toast.success("otp sent successfullyl", { position: "top-center" });
        setOtpForm(false);
      } else {
        toast.error(res?.data.message, { position: "top-center" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Email is not registered", { position: "top-center" });
    }
  };
  const handleSubmitOTP = async (e) => {
    e.preventDefault();
    try {
      let code = otp;
      const res = await axios.post(`/api/v1/auth/change-password`, {
        email,
        password,
        code,
      });

      if (res && res.data.success) {
        toast.success("password updated successfully", {
          position: "top-center",
        });
        navigate("/login");
      } else {
        toast.error("Invalid otp", { position: "top-center" });
      }
    } catch (error) {
      console.log(error);
      toast.error(error, { position: "top-center" });
    }
  };
  return (
    <>
      <div className="container mx-auto mt-5">
        <Paper elevation={20} style={paperStyle}>
          <div
            className="d-flex flex-column
     align-items-center"
          >
            <Avatar style={avatarStyle}></Avatar>
            <h5>Reset password</h5>
          </div>
          {otpform ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                {/* <input
                  type="email"
                  placeholder='Enter Your Email'
                  className="form-control"
                  id="email" 
                  aria-describedby="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  required
                /> */}
                <TextField
                  required
                  id="email"
                  label="Email"
                  variant="standard"
                  value={email}
                  fullWidth
                  placeholder="Enter Your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <Button type="submit" variant="contained">
                send otp
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSubmitOTP}>
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
                  label="Password"
                  variant="standard"
                  value={password}
                  fullWidth
                  placeholder="Enter  Password"
                  onChange={(e) => setPassword(e.target.value)}
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
                  type="text"
                  label="otp"
                  variant="standard"
                  value={otp}
                  fullWidth
                  placeholder="Enter  otp"
                  onChange={(e) => setOTP(e.target.value)}
                />
              </div>
              <Button type="submit" variant="contained">
                reset password
              </Button>
            </form>
          )}
        </Paper>
      </div>
    </>
  );
};

export default ForgotPassword;
