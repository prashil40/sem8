import React from 'react';
import Header from '../../partials/Header/Header';
import Slider from '../../partials/Slider/Slider';
import Footer from '../../partials/Footer/Footer';
import { Link } from 'react-router-dom';
import '../../../Global.css';
import classes from './Home.module.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import image1 from '../../images/person_in_office.jpg';
import image2 from '../../images/Credbit table graph996.jpeg';
import image3 from '../../images/Credbit home photo500.png';
import s_img1 from '../../images/service_image1.png';
import s_img2 from '../../images/service_image2.png';
import s_img3 from '../../images/service_image3.png';
import s_img4 from '../../images/service_image4.jpeg';

const Home = () => {
  return (
    <div>
      <Header />
      <main>
        <div className={classes.main_body}>
          <Slider />
          <div className={`${classes.about_area} pt-30 pb-30 `}>
            <div className={classes.container1}>
              <div className={classes.row1}>
                <div>
                  <h2 className={classes.about_head}>
                    A self service credit solution platform to help you excel!
                  </h2>
                </div>
              </div>
              <div className={classes.row1}>
                <div className={classes.box}>
                  <p
                    className={`${classes.text_justify} ${classes.font_18} ${classes.p}`}
                  >
                    Credbit offers a self service credit solution web service
                    platform built to help you remove inaccurate or unverifiable
                    items from your credit report. We provide you with the
                    assembled letters you need to dispute and or challenge items
                    on your credit report.
                  </p>

                  <p
                    className={`${classes.text_justify} ${classes.font_18} ${classes.p}`}
                  >
                    Once you select your dispute letter(s), our
                    software&nbsp;will auto send&nbsp;your selected letter(s)
                    each month from the date you sign&nbsp;up. You can sit back
                    and relax while our software does the work for you. So
                    simple, affordable and saves you time.&nbsp;
                  </p>
                </div>

                <div className={classes.box}>
                  <div>
                    <img src={image1} className={classes.image1}></img>
                  </div>
                </div>

                <div className={classes.box}>
                  <div>
                    <p
                      className={`${classes.text_justify} ${classes.font_18} ${classes.p}`}
                    >
                      You choose the letter(s) best for your dispute. You enter
                      all necessary information needed. You challenge negative
                      items with creditors and bureaus.&nbsp;Removing one
                      negative item from your credit score may increase
                      your&nbsp; credit score&nbsp;30 - 50 points. Removing
                      multiple items may boost your score 100&nbsp;points.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="about-area pt-30 pb-30 ">
            <div className={classes.container}>
              <div className="row">
                <div className={classes.col_md_12}>
                  <h2 className={classes.about_head}>
                    The most affordable credit service solution!
                  </h2>
                </div>
              </div>
              <div className="row">
                <div className={`${classes.col_xl_4} mb-30`}>
                  <div className="about-img">
                    <img
                      src={image2}
                      className={classes.image2}
                      alt="Credbit table graph996.jpeg"
                    />
                  </div>
                </div>
                <div className={`${classes.col_xl_4} mb-30`}>
                  <div className="about-text">
                    <p
                      className={`${classes.text_justify} ${classes.font_18} ${classes.p}`}
                    >
                      Your credit score matters. We all deserve to get the
                      things we want and need and we know having
                      good&nbsp;credit helps.
                    </p>
                  </div>
                  <div
                    className={` header-button mt-40`}
                    // style="margin-left:0px;"
                  >
                    <Link className={classes.blue_btn} to="signup/">
                      <span className="btn-text">
                        Get Started <i className="far fa-long-arrow-right"></i>
                      </span>{' '}
                    </Link>
                  </div>
                </div>
                <div className={`${classes.col_xl_4} mb-30`}>
                  <div className="about-img">
                    <img
                      src={image3}
                      className={classes.image3}
                      alt="Credbit home photo500.png"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`cta-area pt-125 pb-95 ${classes.cta_area}`}
          // style=""
        >
          <div className={classes.container}>
            <div className="row">
              <div className={classes.col_xl_8}>
                <div className="cta-text mb-30">
                  <h1 className={classes.cta_header}>
                    Credbit values your time!
                  </h1>
                  <p
                    className={`${classes.cta_text} ${classes.p}`}
                    // style="color:#fff;margin-top:20px;font-size:20px;"
                  >
                    With Credbit you save time, no upfront fees, no middle
                    man&nbsp;&amp; we offer the best pricing with real results.
                  </p>
                </div>
              </div>
              <div className={`${classes.col_xl_4} mt-10`}>
                <div
                  className={`${classes.text_lg_right} mb-30 mt-20`}
                  // style="margin-top:18px;"
                >
                  <Link className={`${classes.blue_btn}`} to="signup/">
                    <span className="btn-text">
                      Sign Up Today! <i className="far fa-long-arrow-right"></i>
                    </span>{' '}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={classes.service_area}>
          <div className={classes.container}>
            <div className="row">
              <div className={`${classes.col_xl_4} mb-30`}>
                <div className={`${classes.service_wrapper} text-center`}>
                  <div className="services-img">
                    <img
                      src={s_img1}
                      alt="XcelICON1162.png"
                      className={classes.service_image}
                    />
                  </div>
                  <div className={classes.service_text}>
                    <p className={`${classes.text_justify} ${classes.p}`}>
                      We provide you the tools for you to challenge negative
                      items with all three bureaus.
                    </p>
                  </div>
                </div>
              </div>

              <div className={`${classes.col_xl_4} mb-30`}>
                <div className={`${classes.service_wrapper} text-center`}>
                  <div className="services-img">
                    <img
                      src={s_img2}
                      alt="XcelICON2798.png"
                      className={classes.service_image}
                    />
                  </div>
                  <div className={classes.service_text}>
                    <p className={`${classes.text_justify} ${classes.p}`}>
                      Our prepared letters are ready to help you&nbsp;diputes
                      any item(s)&nbsp;you feel are&nbsp;not accurate.
                    </p>
                  </div>
                </div>
              </div>

              <div className={`${classes.col_xl_4} mb-30`}>
                <div className={`${classes.service_wrapper} text-center`}>
                  <div className="services-img">
                    <img
                      src={s_img3}
                      alt="XcelICON3465.png"
                      className={classes.service_image}
                    />
                  </div>
                  <div className={classes.service_text}>
                    <p className={`${classes.text_justify} ${classes.p}`}>
                      No third party.
                    </p>
                    <p className={`${classes.text_justify} ${classes.p}`}>
                      We save you time &amp; Money
                    </p>
                    <p className={`${classes.text_justify} ${classes.p}`}>
                      You build your credit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row pt-75 pb-100">
              <div className={classes.col_md_8}>
                <img src={s_img4} className={classes.service_image2} />
              </div>

              <div className={`${classes.text_center} ${classes.col_4}`}>
                <div className={`${classes.ml_0} mt-105`}>
                  <Link className={` ${classes.blue_btn}`} to="working/">
                    <span className="btn-text">
                      How it works <i className="far fa-long-arrow-right"></i>
                    </span>{' '}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
