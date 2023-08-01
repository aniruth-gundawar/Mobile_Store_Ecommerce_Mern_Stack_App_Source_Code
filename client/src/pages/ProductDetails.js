import React, { useState, useEffect } from "react";
import axios from "axios";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  ImageListItem,
  Typography,
} from "@mui/material";
import HomeProduct from "../components/HomeProduct";
import { useCart } from "../context/cart";
const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/get-product/${params.slug}`
      );
      setProduct(data?.product);
      console.log(product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row mt-2 d-flex align-items-center justify-content-center mx-auto ms-5 ">
          <div className="col-md-4 mt-5 ">
            <Card raised sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  sx={{
                    height: "395px",
                    Width: "395px",
                    justify: "center",
                    objectFit: "contain",
                    padding: "4px",
                    margin: "auto",
                    // display: "flex",
                    // alignItems: "center",
                    // justifyContent: "center",
                  }}
                  component="img"
                  image={`/api/v1/products/product-photo/${product._id}`}
                  alt="green iguana"
                />
              </CardActionArea>
            </Card>
          </div>
          <div className="col-md-8 mt-5 d-flex flex-column mx-auto align-items-start ">
            <Typography
              sx={{ minHeight: "60px" }}
              gutterBottom
              variant="h4"
              component={"div"}
            >
              {product.name}
            </Typography>
            <Typography
              gutterBottom
              sx={{ minHeight: "45px", fontSize: "1.3rem" }}
              variant="body2"
            >
              {product.description}
            </Typography>
            <Typography
              gutterBottom
              sx={{ minHeight: "45px", fontSize: "1.5rem", color: "#0F1111" }}
              variant="body2"
            >
              {/* <CurrencyRupeeIcon size="small" /> */}
              Rs.{product.price}
            </Typography>

            <Button
              size="small"
              variant="contained"
              onClick={() => {
                var ind = -1;
                cart &&
                  cart.map((item, index) => {
                    if (item._id === product._id) {
                      ind = index;
                    }
                  });
                if (ind === -1) {
                  if (product.quantity <= 0) {
                    toast.error("product Out of stock", {
                      position: "top-center",
                    });

                    return;
                  }
                  product.quanti = 1;
                  setCart([...cart, product]);
                  localStorage.setItem(
                    "cart",
                    JSON.stringify([...cart, product])
                  );
                } else {
                  if (product.quantity <= cart[ind].quanti) {
                    toast.error("product Out of stock", {
                      position: "top-center",
                    });

                    return;
                  }
                  cart[ind].quanti++;
                  setCart([...cart]);
                  localStorage.setItem("cart", JSON.stringify([...cart]));
                }

                toast.success("Item Added to cart", {
                  position: "top-center",
                });
              }}
            >
              Add to Cart
            </Button>
            {/* {product.quantity} */}
          </div>
        </div>
        <hr className="mt-5"></hr>
        <h3>similar Products</h3>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "row",
            m: 2.2,
          }}
        >
          {relatedProducts?.map((currElem) => {
            return <HomeProduct key={currElem._id} {...currElem} />;
          })}
        </Box>
      </div>
    </>
  );
};

export default ProductDetails;
