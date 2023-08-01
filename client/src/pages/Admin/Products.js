import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/AdminMenu";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Product from "../../components/Product";
import { Box } from "@mui/material";
import HomeProduct from "../../components/HomeProduct";
const Products = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`/api/v1/products/get-product`);
      data?.products.sort((a, b) => {
        return a.quantity - b.quantity;
      });
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong ", { position: "top-center" });
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <div className="container">
      <div className="row ">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flexStart",
              alignContent: "center",
              m: 2.2,
            }}
            // sx={{
            //   display: "grid",
            //   gap: 1,
            //   gridTemplateColumns: "repeat(3, 1fr)",
            // }}
          >
            {products?.map((currElem) => {
              return <Product key={currElem._id} {...currElem} />;
            })}
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Products;
