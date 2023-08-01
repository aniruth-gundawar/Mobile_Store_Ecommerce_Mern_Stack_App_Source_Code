import React, { useEffect, useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { ToastContainer, toast } from "react-toastify";
import useCategory from "./hooks/useCategory";
import Button from "@mui/material/Button";
import { useCart } from "../context/cart";
import Badge from "@mui/material/Badge";
import axios from "axios";

import Avatar from "@mui/material/Avatar";
const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();

  const [cart, setCart] = useCart();
  const [t, setT] = useState(0);
  useEffect(() => {
    let total = 0;
    cart?.map((item) => {
      total += item.quanti;
    });
    setT(total);
  }, [cart]);
  const handleLogout = async () => {
    toast.success("Logout Successfull", { position: "top-center" });

    try {
      let cartContents = cart;
      let customerID = auth.user._id;
      if (cartContents) {
        const { data } = await axios.post(`/api/v1/cart/add-to-cart`, {
          customerID,
          cartContents,
        });
        if (!data.success) {
          const { res } = await axios.put(`/api/v1/cart/update-cart`, {
            customerID,
            cartContents,
          });
          // if (res.data.message) {
          //   toast.success("Login Successfull", { position: "top-center" });
          // } else {
          //   toast.error(res.data.message, { position: "top-center" });
          // }
        }
      }

      setAuth({
        ...auth,
        user: null,
        token: "",
      });

      localStorage.removeItem("auth");
      localStorage.removeItem("cart");
      setCart([]);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { position: "top-center" });
    }
  };
  function stringAvatar(name) {
    return {
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }
  return (
    <>
      <nav className="navbar p-2 navbar-expand-lg text-white sticky bg-body-tertiary navabar_css">
        <div className="container">
          <NavLink to="/" className="navbar-brand">
            MOBILE STORE
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse " id="navbarTogglerDemo01">
            <ul className="navbar-nav ms-auto   mb-2 mb-lg-0">
              <li className="nav-item mt-1">
                <NavLink
                  to="/"
                  className="nav-link nav_link_css"
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item mt-1">
                <NavLink
                  to="/products"
                  className="nav-link "
                  aria-current="page"
                >
                  Products
                </NavLink>
              </li>
              {/* <li className="nav-item">
                <NavLink to="/about" className="nav-link ">
                  About
                </NavLink>
              </li> */}

              {/* <li className="nav-item">
                <NavLink to="/contact" className="nav-link ">
                  Contact
                </NavLink>
              </li> */}

              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link  ">
                      <Button variant="outlined">Login</Button>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link  ">
                      <Button variant="contained">Sign Up</Button>
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown mt-1 text-capitalize ">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  <li className=" ">
                    <NavLink
                      to={
                        auth.user.role
                          ? "/dashboard/admin"
                          : "/dashboard/user/profile"
                      }
                      // to="/dashboard/user/profile"
                      className="nav-link  "
                    >
                      <Avatar
                        sx={{ bgcolor: "green" }}
                        alt={auth.user.name}
                        src="dnkd"
                      />
                    </NavLink>
                  </li>
                </>
              )}
              <li className="nav-item mt-1">
                <NavLink to="/cart" aria-label="cart" className="nav-link ">
                  <Badge badgeContent={t} color="secondary">
                    <AddShoppingCartIcon fontSize="medium" />
                  </Badge>
                  {/* Cart{cart?.length} */}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
