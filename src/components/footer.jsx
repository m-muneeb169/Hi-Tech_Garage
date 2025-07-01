import React from "react";
import { Link } from "react-router-dom";

function footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Adds smooth scrolling behavior
      
    });
  };

  return (
    <div>
      <footer id="footer">
        <div className="content-container">
          <div className="footer-top">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-6 footer-contact">
                  <h3>Hi-Tech_Garage</h3>
                  <h6>
                    <strong>Address</strong>
                  </h6>
                  <p>
                    Faisalabad , Punjab
                    <br />
                    Pakistan <br />
                    <strong>Phone:</strong> +92 302 7169070 <br />
                  </p>
                  <br />
                  <strong>Email:</strong> muneebshahid7169@gmail.com
                  <br />
                </div>
                <div className="col-lg-2 col-md-6 footer-links">
                  <h4>Useful Links</h4>
                  <ul className="d-flex flex-column align-items-center">
                    <li>
                      <Link to="#hero" onClick={scrollToTop}>
                        Home
                      </Link>
                    </li>
                    <li>
                      <a href="#about">About</a>
                    </li>
                    <li>
                      <a href="#services">Services</a>
                    </li>
                    <li>
                      <a href="#products">WorkShops</a>
                    </li>
                    <li>
                      <Link to="/bookings">Book Appointment</Link>
                    </li>
                    <li>
                      <Link to="/contact">Contact</Link>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-3 col-md-6 footer-links">
                  <h4>Our Services</h4>
                  <ul className="d-flex flex-column align-items-center">
                    <li>
                      <Link to="/web-development" onClick={scrollToTop}>
                        Roadside Assistance
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/blockchain-development"
                        onClick={scrollToTop}
                        rel="noopener noreferrer"
                      >
                        At-Home Repair
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/mobile-app-development"
                        onClick={scrollToTop}
                        rel="noopener noreferrer"
                      >
                        Periodic Servicing
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/graphic-designing"
                        onClick={scrollToTop}
                        rel="noopener noreferrer"
                      >
                        Oil Change
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/graphic-designing"
                        onClick={scrollToTop}
                        rel="noopener noreferrer"
                      >
                        Tire Services
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/graphic-designing"
                        onClick={scrollToTop}
                        rel="noopener noreferrer"
                      >
                        Coolant Change
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-2 col-md-6 footer-links">
                  <h4>Our WorkShops</h4>
                  <ul className="d-flex flex-column align-items-center">
                    <li>
                      <Link
                        to="/software-development"
                        onClick={scrollToTop}
                        rel="noopener noreferrer"
                      >
                        Honda
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dapps-nft-development"
                        onClick={scrollToTop}
                        rel="noopener noreferrer"
                      >
                        Aslam Autos
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/software-development"
                        onClick={scrollToTop}
                        rel="noopener noreferrer"
                      >
                        Toyota
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/software-development"
                        onClick={scrollToTop}
                        rel="noopener noreferrer"
                      >
                        Suzuki
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dapps-nft-development"
                        onClick={scrollToTop}
                        rel="noopener noreferrer"
                      >
                        Ibrahim Autos & Parts
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dapps-nft-development"
                        onClick={scrollToTop}
                        rel="noopener noreferrer"
                      >
                        First-Stop Garrage
                      </Link>
                    </li>
                   
                  </ul>
                </div>
                <div className="col-lg-2 col-md-6 footer-links">
                  <h4>Our Socials</h4>
                  <div className="social-links mt-3 d-flex justify-content-center">
                    <a
                      href="https://www.facebook.com/"
                      className="facebook"
                      target="_blank"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a
                      href="https://www.linkedin.com/"
                      className="linkedin"
                      target="_blank"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container py-4">
            <div className="copyright">
              &copy; Copyright 2024
              <strong>
                <span> Hi-Tech_Garage. Pvt. Ltd</span>
              </strong>
              . All Rights Reserved
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default footer;
