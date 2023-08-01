import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/category.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";
import { ToastContainer, toast } from "react-toastify";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedphoto, setupdatedPhoto] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoryData = new FormData();
    categoryData.append("name", name);
    categoryData.append("photo", photo);

    try {
      const { data } = await axios.post(
        `/api/v1/category/create-category`,
        categoryData
      );
      setName("");
      if (data?.success) {
        toast.success(`${name} Category Created`, { position: "top-center" });

        getAllCategory();
      }
    } catch (error) {
      toast.error("something went wrong ", { position: "top-center" });
      console.log(error);
    }
  };
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
  const navigate = useNavigate();
  useEffect(() => {
    getAllCategory();
  }, []);
  const handleUpdate = async (e) => {
    e.preventDefault();
    const categoryData = new FormData();
    categoryData.append("name", updatedName);
    categoryData.append("photo", updatedphoto);
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        categoryData
      );
      if (data.success) {
        toast.success(`${updatedName} updated`, { position: "top-center" });

        setSelected(null);
        setUpdatedName("");
        setupdatedPhoto("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message, { position: "top-center" });
      }
    } catch (error) {
      toast.error("something went wrong ", { position: "top-center" });
    }
  };

  const handleDelete = async (cid) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${cid}`
      );
      if (data.success) {
        toast.success(`category deleted`, { position: "top-center" });
        getAllCategory();
      } else {
        toast.error(data.message, { position: "top-center" });
      }
    } catch (error) {
      toast.error("something went wrong ", { position: "top-center" });
    }
  };

  return (
    <div className="container mx-auto m-3 p-3 ">
      <div className="row ">
        <div className="col-md-3 ">
          <AdminMenu />
        </div>

        <div className="col-md-6 cards_category  ">
          <div className="mt-5">
            <CategoryForm
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
              photo={photo}
              setPhoto={setPhoto}
            />
          </div>
          <div className="mt-5">
            {categories.map((c) => (
              <div className="card" key={c._id}>
                <div className="card-body  d-flex flex-row ">
                  <h4 className=" w-50">{c.name}</h4>
                  <div className="btn_div ">
                    <Button
                      className="btns"
                      variant="contained"
                      onClick={() => {
                        setVisible(true);
                        setUpdatedName(c.name);
                        setupdatedPhoto(c.photo);
                        setSelected(c);
                      }}
                      startIcon={<EditIcon />}
                    >
                      Edit
                    </Button>
                    <Button
                      className="btns bg-danger"
                      variant="contained"
                      onClick={() => {
                        handleDelete(c._id);
                      }}
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
          <CategoryForm
            value={updatedName}
            setValue={setUpdatedName}
            handleSubmit={handleUpdate}
            photo={updatedphoto}
            setPhoto={setupdatedPhoto}
          />
        </Modal>
      </div>
    </div>
  );
};

export default CreateCategory;
