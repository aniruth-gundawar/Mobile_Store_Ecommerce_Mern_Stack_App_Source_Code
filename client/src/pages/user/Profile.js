import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../context/Auth";

import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import UserMenu from "../../components/UserMenu";
const Profile = () => {
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/v1/auth/profile`, {
        name,
        email,
        password,
        phone,
        address,
      });

      if (data.error) {
        toast.error(data?.error, {
          position: "top-center",
        });
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="container mx-auto m-3 p-3 ">
      <div className="row ">
        <div className="col-md-3 ">
          <UserMenu />
        </div>

        <div className="col-md-9 ">
          <Paper elevation={20} style={paperStyle}>
            <div
              className="d-flex flex-column
 align-items-center"
            >
              <Avatar style={avatarStyle}></Avatar>
              <h2 style={headerStyle}>User Profile</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <TextField
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
              
            /> */}
                <TextField
                  disabled
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
              
            /> */}
                <TextField
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
              
            /> */}
                <TextField
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
              
            /> */}
                <TextField
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
                Update Profile
              </Button>
            </form>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default Profile;
