import React from "react";
import { useState, useEffect } from "react";
import AdminMenu from "../../components/AdminMenu";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useNavigate, useParams } from "react-router-dom";
import { Button, FormControl, InputLabel, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";

const UpdateProduct = () => {
  const params = useParams();
  const paperStyle = {
    padding: 20,
    height: 250,
    width: 250,
    margin: "20px auto",
  };
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/get-product/${params.slug}`
      );
      console.log(data);
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    getSingleProduct();
    getAllCategory();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("hhhh");
    try {
      console.log(photo);
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.put(
        `/api/v1/products/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.success("Product Updated Successfully ", {
          position: "top-center",
        });
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.error, { position: "top-center" });
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong ", { position: "top-center" });
    }
  };
  const handleDelete = async () => {
    try {
      let answer = window.prompt(
        "Are You Surely want to delete this product ? "
      );
      if (!answer) return;
      const { data } = await axios.delete(
        `/api/v1/products/delete-product/${id}`
      );
      toast.success("Product Deleted Successfully ", {
        position: "top-center",
      });
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong ", { position: "top-center" });
    }
  };

  return (
    <div className="container mx-auto m-3 p-3 ">
      <div className="row ">
        <div className="col-md-3 ">
          <AdminMenu />
        </div>

        <div className="col-md-6   ">
          <h1>Update product</h1>
          <div>
            <div className="mt-3">
              <FormControl fullWidth>
                <InputLabel>select category</InputLabel>

                <Select
                  className="form-select "
                  label="select a category"
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                  value={category}
                >
                  {categories?.map((c) => (
                    <MenuItem key={c._id} value={c._id}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="mt-3">
              <Button variant="contained" component="label">
                {photo ? photo.name : "upload photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </Button>
            </div>
            <div className="mt-3">
              {photo ? (
                <div className="text-center">
                  <Paper variant="outlined" style={paperStyle}>
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product-photo"
                      height={"200px"}
                      width={"200px"}
                      className="img img-responsive "
                    />
                  </Paper>
                </div>
              ) : (
                <div className="text-center">
                  <Paper variant="outlined" style={paperStyle}>
                    <img
                      src={`/api/v1/products/product-photo/${id}`}
                      alt="product-photo"
                      height={"200px"}
                      width={"200px"}
                      className="img img-responsive "
                    />
                  </Paper>
                </div>
              )}
            </div>
            <div className="mt-3">
              <TextField
                fullWidth
                className="form-control"
                id="outlined-basic"
                label="product name"
                variant="outlined"
                placeholder="product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mt-3">
              <TextField
                className="form-control"
                fullWidth
                id="outlined-basic"
                label="Description"
                variant="outlined"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mt-3">
              <TextField
                className="form-control"
                fullWidth
                type="number"
                id="outlined-basic"
                label="Price"
                variant="outlined"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mt-3">
              <TextField
                fullWidth
                className="form-control"
                type="number"
                id="outlined-basic"
                label="Quantity"
                variant="outlined"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="mt-3">
              <FormControl fullWidth>
                <InputLabel>select shipping</InputLabel>
                <Select
                  className="form-select "
                  placeholder="shipping"
                  label="select shipping"
                  value={shipping ? 1 : 0}
                  onChange={(e) => {
                    setShipping(e.target.value);
                  }}
                >
                  <MenuItem value={0}>No</MenuItem>
                  <MenuItem value={1}>Yes</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="mt-3  ">
              <Button onClick={handleUpdate} variant="contained">
                Update Product
              </Button>
              <Button
                className="m-2 bg-danger"
                // style={{ backgroundColor: "red" }}
                onClick={handleDelete}
                variant="contained"
              >
                Delete Product
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
