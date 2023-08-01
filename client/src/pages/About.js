import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
const About = () => {
  return (
    // <div className="container">
    //   <div className="row">
    //     <div className="col-md-6">
    //       <div className="d-flex flex-column ">
    //         <span>Welcome to </span>
    //         <h2>Mobile Store</h2>
    //       </div>
    //     </div>

    //     <div className="col-md-6"></div>
    //   </div>
    // </div>
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-6">
          <div className="p-5 mt-4">
            <span className="text-primary mb-5">Welcome to </span>
            <h1 className="">Mobile Store</h1>
            <p className="lead">
              Our Mobile Store has 15 years history . Our store has all types of
              Mobile accessories . We provide quality service ,and we deliver
              each product timely .
            </p>
            <Link to="/" className="btn btn-outline-primary w-40">
              <ArrowForwardIcon />
            </Link>
          </div>
        </div>
        <div className="col-lg-6">
          <img
            className="w-100 shadow"
            src="https://via.placeholder.com/824x552"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
