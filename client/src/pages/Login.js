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
const Login = () => {
  const paperStyle = {
    padding: 20,

    width: 280,
    margin: "20px auto",
  };

  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/v1/auth/login`, { email, password });
      if (res && res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        toast.success("Login Successfull", { position: "top-center" });
        navigate(location.state || "/");
      } else {
        toast.error(res?.data.message, { position: "top-center" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Email is not registered", { position: "top-center" });
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
            <h2>Sign In</h2>
          </div>
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

            <div className="mb-3 ">
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
            <div className="row ">
              <div className="col-md-6">
                <Button type="submit" variant="contained">
                  Sign In
                </Button>
              </div>
              <div className="col-md-6 mt-2">
                <small className="forgot_password">
                  <span
                    className="text-warning "
                    onClick={() => navigate("/forgot-password")}
                  >
                    Forgot password
                  </span>
                </small>
              </div>
            </div>
          </form>
        </Paper>
      </div>
    </>
  );
};

export default Login;
