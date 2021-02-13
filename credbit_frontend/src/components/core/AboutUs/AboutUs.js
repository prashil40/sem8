import React from 'react';
import Header from '../../partials/Header/Header';
import Footer from '../../partials/Footer/Footer';
import { Link } from 'react-router-dom';
import classes from './AboutUs.module.css';
import about_img1 from '../../images/slider.jpg';

const AboutUs = () => {
  return (
    <main>
      {/* <!-- breadcrumb-area-start --> */}
      <div className={classes.breadcrumb_area}>
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className={`${classes.breadcrumb_text} text_center`}>
                <h1>About Us</h1>
                <ul className={classes.breadcrumb_menu}>
                  <li>
                    <Link to="home/">Home</Link>
                  </li>
                  <li>
                    <span>About Us</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- breadcrumb-area-start --> */}
      {/* <!-- about-area-start --> */}
      <div className={`${classes.about_area} pt-130 pb-150`}>
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 mb-30">
              <div className={classes.about_1_wrapper}>
                <div className={`${classes.about_text} mt-0`}>
                  <p className="text_justify color_black">
                    Here at Credbit we are here to serve you. There are millions
                    of Americans who have negative items on their credit report.
                    We understand how important it is to have a solid credit
                    score. We all want a great life and access to the things
                    which help us to&nbsp; a better lifestyle. Credbit has given
                    you the platform to do just that. We created an easy process
                    with an affordable approach, giving you the capability for
                    you to dispute negative items within minutes. You save time,
                    money, no middle man and the&nbsp;best part is, you have
                    direct access to dispute negative items.&nbsp;
                  </p>
                </div>
              </div>
            </div>

            <div className="col-xl-12 col-lg-12 mb-30">
              <div className={`${classes.about_2_img} ${classes.containerImg}`}>
                {/* <img src={about_img1    } alt="aboutus789.png" /> */}
                <div className={`centered ${classes.slider_content}`}>
                  <h1>Credbit</h1>
                  <p>
                    A self service credit solution platform built to help you
                    excel in life
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-12 col-lg-12 mb-30">
              <div className="about-1-wrapper">
                <div className={classes.about_text}>
                  <h4>
                    Join the many Americans who have boost&nbsp;their credit
                    through our self service platform.
                  </h4>
                </div>

                <div className={classes.about_button}>
                  <Link className="btn" to="signup/">
                    <span className="btn-text">
                      Sign Up Today!<i className="far fa-long-arrow-right"></i>
                    </span>{' '}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- about-area-end --> */}
      {/* <!-- services-area-start --> */}
      {/* <div
      className="services-area"
      style="background-image:url(assets/img/bg/bg-1.jpg);padding-top:75px;padding-bottom:150px;"
    >
      <div className="container">
        {/* <style>
                    .services-text ul li{
                        list-style-type:none !important;
                    }
                    </style> */}
      {/*<div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
            <div className="services-wrapper text-center">
              <div className="services-img">
                <img
                  src="icon/big_img/XcelICON1928.png"
                  alt="XcelICON1928.png"
                  style="height:135px;padding-bottom:20px;"
                />
              </div>
              <div className="services-text" style="text-align:left;">
                <ul>
                  <li>We provide the letters.</li>
                  <li>You choose which letters is best for you.</li>
                  <li>Enter necessary fields.</li>
                  <li>Then send!</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
            <div className="services-wrapper text-center">
              <div className="services-img">
                <img
                  src="icon/big_img/XcelICON2826.png"
                  alt="XcelICON2826.png"
                  style="height:135px;padding-bottom:20px;"
                />
              </div>
              <div className="services-text" style="text-align:left;">
                <ul>
                  <li>We connect you to all three bureaus.</li>
                  <li>Select which bureau(s) you would like to contact.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
            <div className="services-wrapper text-center">
              <div className="services-img">
                <img
                  src="icon/big_img/XcelICON3635.png"
                  alt="XcelICON3635.png"
                  style="height:135px;padding-bottom:20px;"
                />
              </div>
              <div className="services-text" style="text-align:left;">
                <ul>
                  <li>
                    Credbit advises you to give your process 90 up to
                    120 days.
                  </li>
                  <li>
                    We advise&nbsp;you to check your mailing address every
                    thirty days.
                  </li>
                  <li>We want you to recieve the best results.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> */}
      {/* <!-- services-area-end --> */}
    </main>
  );
};

export default AboutUs;
