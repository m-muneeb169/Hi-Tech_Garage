import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";

function Sidenavbar() {
  const [isMobileNavActive, setIsMobileNavActive] = useState(false);
  
  const handleScrollTo = (e) => {
    const { hash } = e.currentTarget;
    if (document.querySelector(hash)) {
      if (window.innerWidth <= 992) {
        setIsMobileNavActive(!isMobileNavActive);
      }
    }
  };
  
  const handleMobileNavToggle = () => {
    setIsMobileNavActive(!isMobileNavActive);
  };
  
  useEffect(() => {
    if (isMobileNavActive) {
      document.body.classList.add("mobile-nav-active");
      document.querySelector(".mobile-nav-toggle").classList.add("fa-times");
      document.querySelector(".mobile-nav-toggle").classList.remove("fa-bars");
    } else {
      document.body.classList.remove("mobile-nav-active");
      document.querySelector(".mobile-nav-toggle").classList.remove("fa-times");
      document.querySelector(".mobile-nav-toggle").classList.add("fa-bars");
    }
  }, [isMobileNavActive]);
  
  return (
    <div className="sidebar">
      <i
        className="fal fa-bars mobile-nav-toggle d-lg-none"
        onClick={handleMobileNavToggle}
      ></i>
      <header id="header" className="">
        <div className="position-relative h-100 d-flex flex-column overflow-auto">
          <nav id="navbar" className="navbar nav-menu">
            <ul>
              <li>
                <Link to="/" className="nav-link scrollto active">
                  <i className="fas fa-home"></i>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <a href="/#services" className="nav-link scrollto">
                  <i className="fas fa-user-cog"></i>
                  <span>Services</span>
                </a>
              </li>
              <li>
                <a href="#products" className="nav-link scrollto">
                  <i className="fas fa-tools"></i>
                  <span>WorkShops</span>
                </a>
              </li>
              <li>
                <Link to="/team" className="nav-link scrollto">
                  <i className="fas fa-user-friends"></i>
                  <span>Team</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="nav-link scrollto">
                  <i className="fas fa-address-book"></i>
                  <span>Contact</span>
                </Link>
              </li>
              <li>
                <Link to="/booking" className="nav-link scrollto">
                  <i className="fas fa-calendar-alt"></i>
                  <span>Booking</span>
                </Link>
              </li>
              <li>
                <a href="#about" className="nav-link scrollto">
                  <i className="fas fa-info-circle"></i>
                  <span>About</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Sidenavbar;