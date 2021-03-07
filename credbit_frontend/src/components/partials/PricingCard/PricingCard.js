import React, { useState, useEffect } from 'react';
import classes from './PricingCard.module.css';
import { Link } from 'react-router-dom';

const PricingCard = ({ pricing, pricingIndex }) => {
  const amount = pricing.amount;
  let duration = pricing.duration;
  const letters_count = pricing.letters_count;
  const bureaus_count = pricing.bureaus_count;

  useEffect(() => {
    calculateDuration();
  }, []);

  const calculateDuration = () => {
    switch (duration) {
      case 'm':
        duration = 'Monthly';
        break;
      case 'y':
        duration = 'Yearly';
        break;
      case 'q':
        duration = 'Quarterly';
        break;
      case 'w':
        duration = 'Weekly';
        break;
      case 'd':
        duration = 'Daily';
        break;
    }
  };
  return (
    <div className={classes.col_xl_3}>
      <div
        className={`${classes.pricing_wrapper}  ${classes.single_pricing} ${classes.text_center} mb-30`}
      >
        <div className="pricing-top-text">
          <div className={classes.price_count}>
            <h1
            //   style="color:#000;"
            >
              <span className={classes.usd}>$</span>
              {amount} <span className={classes.time_period}>/Monthly</span>
            </h1>
          </div>
        </div>
        <div className={classes.pricing_menu}>
          <p>{letters_count} letter</p>

          <p>Challenge&nbsp;{letters_count} Item</p>

          <p>Portal access</p>

          <p>Pre-written letters</p>

          <p>Select letter(s)</p>

          <p>Dispute to bureaus</p>

          <p>Select bureau(s)</p>

          <p>Input creditor info</p>

          <p>Challenge creditors</p>
        </div>

        <div className="pricing-button">
          <Link
            to="/signin"
            className={classes.blue_btn}
            // onclick="selectPlan('5','1')"
          >
            {' '}
            <span className="pricings-button" id="planBtn1">
              select plan <i className="far fa-long-arrow-right"></i>
            </span>{' '}
          </Link>
        </div>
      </div>
    </div>
  );
};
export default PricingCard;
