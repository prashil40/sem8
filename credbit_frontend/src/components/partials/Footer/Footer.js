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
          <div className={classes.col_xl_4}>
            <div className="copyright">
              <p className={`${classes.color_white} ${classes.p}`}>
                <i className="far fa-copyright"></i>{' '}
                Copyright&nbsp;2020&nbsp;Xcel Credit One.
              </p>
            </div>
          </div>
          <div className={`${classes.text_center} ${classes.col_xl_4}`}>
            <div className={`footer-icon ${classes.mt_0}`}>
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
          <div className={classes.col_xl_4}>
            <div className={`footer-bottem-text ${classes.text_lg_right}`}>
              <p className={`${classes.color_white} ${classes.p}`}>
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
