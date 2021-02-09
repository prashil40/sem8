import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Logo.module.css';
import logo from './logo_credbit.png';

const Logo = () => (
  <div>
    <Link to="./">
      <img className={classes.logo} src={logo} alt="" />
    </Link>
  </div>
);

export default Logo;
