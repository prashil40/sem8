import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Slider.module.css';

const Slider = () => (
  <div className="slider-area">
    <div className={classes.slider_overlay}>
      <div
        className={classes.slider}
        // style="background-image:url(assets/img/slider/slider-1.jpg)"
      >
        <div className={classes.container}>
          <div>
            <div>
              <div className={classes.slider_content}>
                <h1
                  className={classes.slider_header}
                  data-animation="fadeInLeft"
                  data-delay=".3s"
                >
                  CREDBIT
                </h1>
                <p
                  className={classes.paragraph}
                  data-animation="fadeInLeft"
                  data-delay=".5s"
                >
                  Providing you assembled dispute letters to challenge items on
                  your credit report with all three bureaus. Our letters auto
                  send every 30 days without you lifting a finger!
                </p>
                <div
                  className={classes.slider_button}
                  data-animation="fadeInUp"
                  data-delay=".7s"
                >
                  <Link className={classes.Link} to="#">
                    <span className={classes.button_text}>
                      learn more
                    </span>{' '}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Slider;
