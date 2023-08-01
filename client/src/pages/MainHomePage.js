import React from "react";
import useCategory from "../components/hooks/useCategory";
import { Box, Grid } from "@mui/material";
import HomeCategory from "../components/HomeCategory";
import { Link } from "react-router-dom";
import Jumbotran from "../components/Jumbotran";
const MainHomePage = () => {
  const categories = useCategory();

  return (
    <>
      <div className="">
        <Jumbotran />
      </div>
      <div className="container py-5 m-auto">
        <div className="m-auto available_categories">
          <h4 className="m-4 h_four">Available Categories</h4>
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
            {categories?.map((currElem) => {
              return (
                <div className="col" key={currElem._id}>
                  <Link
                    to={`/category/${currElem.slug}`}
                    className="nav-link "
                    key={currElem._id}
                  >
                    <HomeCategory {...currElem} />
                  </Link>
                </div>
              );
            })}
          </Box>
        </div>
      </div>
    </>
  );
};

export default MainHomePage;
