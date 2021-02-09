import React from 'react';
import TheCopyrightSection from './CopyrightSection';
import SocialMediaLinks from './SocialMediaLinks';
import { Link } from 'react-router-dom';
import classes from './Footer.module.css';
const Footer = () => {
  return (
    <footer>
      {/* <div className="footer-area grey-bg pt-80 pb-30">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-4">
              <div className="footer-wrapper mb-30">
                <div className="footer-logo">
                  <Link to="index.html">
                    <img src="assets/img/logo/logo.png" alt="" />
                  </Link>
                </div>
                <div className="footer-text">
                  <p>
                    At vero eoset accusamus et iusto odio dignissimos ducimus
                    qui blpraesentium voluptatum deleniti atque corrupti quos
                    dolores et quas molestias excepturi{" "}
                  </p>
                </div>
                <SocialMediaLinks />
              </div>
            </div>
            <div className="col-xl-2 col-lg-2 col-md-4">
              <div className="footer-wrapper mb-30">
                <h4 className="footer-title">Our Services</h4>
                <ul className="fotter-menu">
                  <li>
                    <Link to="#">User Strategy </Link>
                  </li>
                  <li>
                    <Link to="#">Product Designing </Link>
                  </li>
                  <li>
                    <Link to="#">Marketing Strategy</Link>
                  </li>
                  <li>
                    <Link to="#">IT Consultancy</Link>
                  </li>
                  <li>
                    <Link to="#">Server Security</Link>
                  </li>
                  <li>
                    <Link to="#">Product Marketing</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-2 col-lg-2 col-md-4">
              <div className="footer-wrapper mb-30">
                <h4 className="footer-title">Quick Links</h4>
                <ul className="fotter-menu">
                  <li>
                    <Link to="#">About Us</Link>
                  </li>
                  <li>
                    <Link to="#">Need Link Consultant?</Link>
                  </li>
                  <li>
                    <Link to="#">Our Services</Link>
                  </li>
                  <li>
                    <Link to="#">Have Any Questions?</Link>
                  </li>
                  <li>
                    <Link to="#">Meet Our Team</Link>
                  </li>
                  <li>
                    <Link to="#">Contact Us</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-2 col-lg-2 col-md-6">
              <div className="footer-wrapper mb-30">
                <h4 className="footer-title">Contact Us</h4>
                <div className="footer-info">
                  <p>But I must explain to you how all this mistaken</p>
                </div>
                <ul className="contact-link">
                  <li>
                    <div className="contact-address-icon">
                      <i className="far fa-phone"></i>
                    </div>
                    <div className="contact-address-text">
                      <h4>+812 (345) 778 88</h4>
                    </div>
                  </li>
                  <li>
                    <div className="contact-address-icon">
                      <i className="far fa-envelope-open"></i>
                    </div>
                    <div className="contact-address-text">
                      <h4>support@gmail.com</h4>
                    </div>
                  </li>
                  <li>
                    <div className="contact-address-icon">
                      <i className="far fa-map-marker-alt"></i>
                    </div>
                    <div className="contact-address-text">
                      <h4>227 Marion Street, Columbia</h4>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom-area pt-50">
          <div className="container">
            <TheCopyrightSection />
          </div>
        </div>
      </div> */}
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
