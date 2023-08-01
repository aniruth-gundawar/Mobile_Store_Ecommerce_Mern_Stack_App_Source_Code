import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import HomeIcon from "@mui/icons-material/Home";
import { Link, NavLink } from "react-router-dom";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
export default function Footer() {
  return (
    <MDBFooter
      color="white"
      bgColor="dark"
      className="text-center text-lg-start footer_section mt-5"
    >
      <section className="d-flex justify-content-center  p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on :</span>
        </div>

        <div>
          <Link to="" aria-label="facebook" className="me-4 text-reset">
            <FacebookIcon />
          </Link>
          <Link to="" aria-label="instagram" className="me-4 text-reset">
            <InstagramIcon />
          </Link>
          <Link to="" aria-label="Twitter" className="me-4 text-reset">
            <TwitterIcon />
          </Link>
        </div>
      </section>
      <section>
        <MDBContainer className="text-center  mt-5">
          <MDBRow className="mt-3">
            {/* <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon icon="gem" className="me-3" />
                Company name
              </h6>
              <p>
                Here you can use rows and columns to organize your footer
                content. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit.
              </p>
            </MDBCol> */}

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Products</h6>
              <p>
                <NavLink className="text-white text-decoration-none ">
                  Smart Phones
                </NavLink>
              </p>
              <p>
                <NavLink className="text-white text-decoration-none">
                  Chargers
                </NavLink>
              </p>
              <p>
                <NavLink className="text-white text-decoration-none">
                  Batteries
                </NavLink>
              </p>
              <p>
                <NavLink className="text-white text-decoration-none">
                  Screen Guards
                </NavLink>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <NavLink
                  to="/about"
                  className="text-white text-decoration-none"
                >
                  About
                </NavLink>
              </p>
              <p>
                <NavLink className="text-white text-decoration-none">
                  Pricing
                </NavLink>
              </p>
              <p>
                <NavLink className="text-white text-decoration-none">
                  Orders
                </NavLink>
              </p>
              <p>
                <NavLink className="text-white text-decoration-none">
                  Help
                </NavLink>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <HomeIcon />

                <span className="me-4"> Armoor , 503224 ,TS , IND</span>
              </p>
              <p>
                <EmailIcon />
                <span className="me-4"> mbstore806@gmail.com</span>
              </p>
              <p>
                <PhoneIcon />+ 01 234 567 88
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2023 Copyright:
        <Link className="text-white text-decoration-none">mbstore806.com</Link>
      </div>
    </MDBFooter>
  );
}
