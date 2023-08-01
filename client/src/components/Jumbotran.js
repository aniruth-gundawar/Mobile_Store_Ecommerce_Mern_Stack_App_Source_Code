import React from "react";
// import HomepageImage from "../../public/Homepage_image.jpg";
const Jumbotran = () => {
  return (
    <div
      className="m-2 "
      // style={{
      //   maxWidth: "100%",
      //   height: "300px",
      //   backgroundImage: `url(${
      //     process.env.PUBLIC_URL + "/Homepage_image.jpg"
      //   })`,
      //   backgroundRepeat: "no-repeat",
      //   backgroundSize: "cover",
      // }}
    >
      <img src="/Homepage_image.jpg" className="img-fluid" alt="..." />
      {/* <div className="text-center">
          <div className="d-flex  text-center justify-content-start align-items-center h-100">
            <div className="text-white ">
              <h1 className="mb-3 ">Perfect spot for mobile accessories</h1>
              <h4 className="mb-3">Subheading</h4>
              <a
                className="btn btn-outline-light btn-lg"
                href="#!"
                role="button"
              >
                Call to action
              </a>
            </div>
          </div>
        </div> */}
    </div>
  );
};

export default Jumbotran;
