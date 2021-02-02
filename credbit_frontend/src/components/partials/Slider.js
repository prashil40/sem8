import React from "react";
import { Link } from "react-router-dom";

const Slider = () => (
  <div className="slider-area">
    <div className="slider-active">
      <div
        className="single-slider slider-height slider-overlay d-flex align-items-center"
        // style="background-image:url(assets/img/slider/slider-1.jpg)"
      >
        <div className="container">
          <div className="row ">
            <div className="col-xl-8 col-lg-8">
              <div className="slider-content">
                <h1 data-animation="fadeInLeft" data-delay=".3s">
                  Perfect IT Solutions For Your Business
                </h1>
                <p data-animation="fadeInLeft" data-delay=".5s">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque
                </p>
                <div
                  className="slider-button"
                  data-animation="fadeInUp"
                  data-delay=".7s"
                >
                  <Link className="btn" to="#">
                    <span className="btn-text">
                      learn more <i className="far fa-long-arrow-right"></i>
                    </span>{" "}
                  </Link>
                  <Link className="text-link" to="#">
                    How It Works
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-3 d-none d-lg-block">
              <div className="slider-video text-md-right">
                <Link
                  className="popup-video"
                  to="https://www.youtube.com/watch?v=LTXD6XZXc3U"
                >
                  <i className="fas fa-play"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Slider;
