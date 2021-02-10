import React from 'react';
// import HeaderContacts from './HeaderContacts';
// import SocialMediaLinks from './SocialMediaLinks';
import classes from './Header.module.css';
import Logo from '../Logo/Logo';
import Navbar from '../Navbar/Navbar';
// import { Link } from "react-router-dom";

const Header = () => (
  <header className="sticky/">
    <div className={` ${classes.row} `}>
      <div>
        <Logo />
      </div>

      <div>
        <div>
          <Navbar />
        </div>
      </div>
    </div>
  </header>
);

export default Header;
