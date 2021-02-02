import React from "react";
// import HeaderContacts from './HeaderContacts';
// import SocialMediaLinks from './SocialMediaLinks';
import "TheHeader.css";
import Logo from "./Logo";
import TheNavbar from "./Navbar";
// import { Link } from "react-router-dom";

const Header = () => (
  <header>
    <div id="sticky-header" className="main-menu-area">
      <div className="container">
        <div className="row">
          <div className="col-xl-3 col-lg-3 d-flex align-items-center">
            <Logo />
          </div>

          <div className="col-xl-9 col-lg-9">
            <div className="main-menu text-right">
              <TheNavbar />
            </div>
          </div>

          <div className="col-12">
            <div className="mobile-menu"></div>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
