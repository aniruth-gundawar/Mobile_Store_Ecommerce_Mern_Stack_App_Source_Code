import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "../context/Auth.js";
import axios from "axios";
import Fuse from "fuse.js";
import { ToastContainer, toast } from "react-toastify";
import HomeProduct from "../components/HomeProduct.js";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import {
  Box,
  FormControl,
  Radio,
  FormLabel,
  RadioGroup,
  Slider,
  Typography,
  Button,
  TextField,
  Paper,
  InputBase,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Prices } from "../components/Prices.js";
import { convertLength } from "@mui/material/styles/cssUtils.js";
// import { Radio } from "antd";
const Home = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [slide, setSlide] = useState([0, 150000]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
        // console.log(categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const getTotal = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `/api/v1/products/product-count`
  //     );
  //     setTotal(data?.total);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const navigate = useNavigate();
  useEffect(() => {
    getAllCategory();
    // getTotal();
  }, []);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`/api/v1/products/get-product`);
      data?.products.sort((a, b) => {
        return a.price - b.price;
      });
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong ", { position: "top-center" });
    }
  };
  // const getAllProducts = async () => {
  //   try {
  //     setLoading(true);
  //     const { data } = await axios.get(
  //       `/api/v1/products/product-list/${page}`
  //     );
  //     setLoading(false);
  //     setProducts(data?.products);
  //   } catch (error) {
  //     setLoading(false);
  //     toast.error("something went wrong ", { position: "top-center" });
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    getAllProducts();
  }, []);

  // const loadMore = async () => {
  //   try {
  //     setLoading(true);
  //     const { data } = await axios.get(
  //       `/api/v1/products/product-list/${page}`
  //     );
  //     setLoading(false);
  //     setProducts([...products, ...data?.products]);
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   if (page === 1) return;
  //   loadMore();
  // }, [page]);

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c != id);
    }
    setChecked(all);
  };

  const applyFilters = () => {
    var temp = products;
    if (checked.length) {
      temp = products.filter((item) => checked.includes(item.category._id));
    }

    if (searchInput) {
      // temp = temp.filter(
      //   (item) =>
      //     item.description
      //       .toLowerCase()
      //       .search(searchInput.toLowerCase().trim()) !== -1
      // );
      const fuse = new Fuse(temp, {
        keys: ["name", "description", "category.name"],
      });
      const result = fuse.search(searchInput);
      const matches = [];
      if (result.length) {
        result.forEach(({ item }) => {
          matches.push(item);
        });
      }
      temp = matches;
    }

    const minPrice = slide[0];
    const maxPrice = slide[1];

    temp = temp.filter(
      (item) => item.price >= minPrice && item.price <= maxPrice
    );
    return temp;
  };

  var prods = useMemo(applyFilters, [checked, slide, products, searchInput]);

  const handleClearFilter = () => {
    // window.location.reload();
    setSlide([0, 150000]);
    setChecked([]);
    setSearchInput("");
    var x = document.getElementsByClassName("categorycheckbox");
    for (var i = 0; i < x.length; i++) {
      x[i].checked = false;
    }
  };
  return (
    <>
      <div className="container">
        <div className="d-flex   mt-3 justify-content-center" style={{}}>
          {/* <input
            className="w-75"
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          /> */}
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 800,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search for Products"
              inputProps={{ "aria-label": "search for products" }}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={applyFilters}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
        <div className="row mt-3">
          <div className="col-md-3 mt-4">
            <h4 className="text-center">Filters</h4>
            <div className="d-flex flex-column mt-3 ">
              {categories.map((c) => {
                return (
                  <div key={c._id} className="form-check flex-row mt-3">
                    <input
                      className="form-check-input categorycheckbox "
                      type="checkbox"
                      id={c.name}
                      name={c.name}
                      aria-label={c.name}
                      onChange={(e) => {
                        handleFilter(e.target.checked, c._id);
                      }}
                    />
                    <label
                      className=" form-check-label categorycheckbox"
                      htmlFor={c.name}
                    >
                      {c.name}
                    </label>
                  </div>
                );
              })}

              {/* {categories.map((c) => {
                return (
                  <>
                    <input
                      type="checkbox"
                      className="categorycheckbox"
                      key={c._id}
                      // label={c.name}
                      onChange={(e) => {
                        handleFilter(e.target.checked, c._id);
                      }}
                    />
                  </>
                );
              })} */}
              {/* {categories?.map((c) => (
                <FormControlLabel
                  className="categorycheckbox"
                  key={c._id}
                  label={c.name}
                  control={
                    <Checkbox
                      onChange={(e) => {
                        handleFilter(e.target.checked, c._id);
                      }}
                    />
                  }
                />
              ))} */}
            </div>
            <div className=" mt-5 ">
              <h4 className="text-center mt-5">Price</h4>
              <Slider
                min={0}
                max={150000}
                value={slide}
                step={500}
                placeholder="price"
                color="secondary"
                valueLabelDisplay="on"
                onChange={(e, value) => setSlide(value)}
              />
            </div>
            <div className="mt-5">
              <Button
                onClick={handleClearFilter}
                size="small"
                variant="contained"
              >
                Clear Filters
              </Button>
            </div>
          </div>
          <div className="col-md-9">
            {/* <h1 className="text-center">All products</h1> */}
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
              {prods?.map((currElem) => {
                return <HomeProduct key={currElem._id} {...currElem} />;
              })}
            </Box>
          </div>

          {/* <div className="m-2 p-3">
          {prods && prods.length < total && (
            <button
              className="btn btn-warning"
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
            >
              {loading ? "Loading ..." : "Loadmore"}
            </button>
          )}
        </div> */}
        </div>
      </div>
    </>
  );
};

export default Home;
