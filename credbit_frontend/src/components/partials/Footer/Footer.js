import React from 'react';
import TheCopyrightSection from '../CopyrightSection';
import SocialMediaLinks from '../SocialMediaLinks';
import { Link } from 'react-router-dom';
import classes from './Footer.module.css';
const Footer = () => {
  return (
    <footer>
      <div className={classes.footer_bg_bottom}>
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-4">
            <div className="copyright">
              <p className={classes.color_white}>
                <i className="far fa-copyright"></i>{' '}
                Copyright&nbsp;2020&nbsp;Xcel Credit One.
              </p>
            </div>
          </div>
          <div className={`${classes.text_center} col-xl-4 col-lg-4 col-md-4`}>
            <div className="footer-icon mt-0">
              {/* <Link to="#" style="color:white;border:none;">
                {' '}
                <img
                  src="social/big_img/fbicon237.png"
                  style="width:100%;margin-top:-7px;"
                />
              </Link>
              <Link to="#" style="color:white;border:none;">
                {' '}
                <img
                  src="social/big_img/Instagram_icon749.png"
                  style="width:100%;margin-top:-7px;"
                />
              </Link> */}
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4">
            <div className="footer-bottem-text text-md-right">
              <p className={classes.color_white}>
                <Link
                  to="terms-and-conditions/"
                  className={classes.color_white}
                >
                  Terms &amp; Conditions
                </Link>{' '}
                |{' '}
                <Link to="privacy-policy/" className={classes.color_white}>
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
