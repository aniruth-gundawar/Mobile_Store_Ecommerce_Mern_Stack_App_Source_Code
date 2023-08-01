import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { spacing } from "@mui/system";
import { CardActionArea } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { ToastContainer, toast } from "react-toastify";
import { useCart } from "../context/cart";

export default function HomeProduct(currElem) {
  const navigate = useNavigate();

  const [cart, setCart] = useCart();
  const { _id, name, description, price, slug } = currElem;
  return (
    <NavLink to={`/products/product/${slug}`} className="nav-link  ">
      <Card raised sx={{ maxWidth: "290px", m: 0.5 }}>
        <CardActionArea>
          <CardMedia
            className="hover-zoom"
            component="img"
            alt={name}
            sx={{
              maxHeight: "220px",
              minWidth: "310px",
              justify: "center",
              objectFit: "contain",
              padding: "4px",
              // display: "flex",
              // alignItems: "center",
              // justifyContent: "center",
            }}
            image={`/api/v1/products/product-photo/${_id}`}
          />
          <CardContent sx={{ padding: "0.8rem" }}>
            <Typography
              sx={{
                minHeight: "40px",
                fontWeight: 500,
                marginBottom: "0.3rem",
                color: "#282c3f",
                lineHeight: 1,
              }}
              variant="h6"
              component={"div"}
            >
              {name.substring(0, 25)}
            </Typography>
            {/* <Typography gutterBottom sx={{ minHeight: "45px" }} variant="body2">
            {description.substring(0, 60)}...
          </Typography> */}
            <Typography
              sx={{ fontSize: "1rem", color: "green" }}
              variant="body2"
            >
              {price.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </Typography>
          </CardContent>
          {/* 
        <CardActions sx={{ padding: "0.5rem" }}>
          <Button
            sx={{ fontSize: "0.6rem" }}
            onClick={() => {
              navigate(`/products/product/${slug}`);
            }}
            size="small"
            variant="contained"
          >
            More Details
          </Button>
          <Button
            sx={{ fontSize: "0.6rem" }}
            size="small"
            variant="contained"
            onClick={() => {
              setCart([...cart, currElem]);
              localStorage.setItem("cart", JSON.stringify([...cart, currElem]));
              toast.success("Item Added to cart", { position: "top-center" });
            }}
          >
            ADD To cart
          </Button>
        </CardActions> */}
        </CardActionArea>
      </Card>
    </NavLink>
  );
}
