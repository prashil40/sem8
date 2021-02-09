import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={classes.Navbar}>
      <ul className={classes.UnorderedList}>
        <li className={classes.ListItem}>
          <Link className={classes.Link} to="./">
            How it works
          </Link>
        </li>
        <li className={classes.ListItem}>
          <Link className={classes.Link} to="./">
            Pricing
          </Link>
        </li>
        <li className={classes.ListItem}>
          <Link className={classes.Link} to="./">
            Letters
          </Link>
        </li>
        <li className={classes.ListItem}>
          <Link className={classes.Link} to="./">
            About Us
          </Link>
        </li>
        <li className={classes.ListItem}>
          <Link className={classes.Link} to="./">
            Contact Us
          </Link>
        </li>

        <li className={`${classes.ListItem} ${classes.Button}`}>
          <Link className={classes.Link} to="login/">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
