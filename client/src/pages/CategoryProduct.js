import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import HomeProduct from "../components/HomeProduct";
import { Box } from "@mui/material";
const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
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
          return <HomeProduct key={currElem._id} {...currElem} />;
        })}
      </Box>
    </div>
  );
};

export default CategoryProduct;
