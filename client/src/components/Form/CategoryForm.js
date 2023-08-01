import React from "react";
import Button from "@mui/material/Button";
const CategoryForm = ({ handleSubmit, value, setValue, setPhoto, photo }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="d-flex category_form">
          <div className="mb-3">
            <input
              type="text"
              className="form-control "
              placeholder="Enter new category"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
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
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default CategoryForm;
