import React from "react";
import { Link } from "react-router-dom";

const Logo = () => (
  <div className="logo">
    <Link to="./">
      <img src="assets/img/logo/logo.png" alt="" />
    </Link>
  </div>
);

export default Logo;
