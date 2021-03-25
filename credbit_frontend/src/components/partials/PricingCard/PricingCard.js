import React, { useState, useEffect } from "react";
import classes from "./PricingCard.module.css";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

const API = process.env.REACT_APP_BACKEND;
const RZP_KEY = process.env.REACT_RZP_KEY_ID;

const PricingCard = ({ pricing, pricingIndex }) => {
  const amount = pricing.amount;
  let duration = pricing.duration;
  const letters_count = pricing.letters_count;
  const bureaus_count = pricing.bureaus_count;
  const url = pricing.url;
  let user;
  if (localStorage.getItem("token")) {
    user = JSON.parse(localStorage.getItem("token")).user;
  }
  console.log("USER", user);
  const link = user ? "" : "signin/";
  useEffect(() => {
    calculateDuration();
  }, []);

  const calculateDuration = () => {
    switch (duration) {
      case "m":
        duration = "Monthly";
        break;
      case "y":
        duration = "Yearly";
        break;
      case "q":
        duration = "Quarterly";
        break;
      case "w":
        duration = "Weekly";
        break;
      case "d":
        duration = "Daily";
        break;
    }
  };
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  const displayRazorpay = async () => {
    console.log("call");
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const request = {
      client_url: `${API}auth/client/${user._id}/`,
      pricing_url: url,
    };

    console.log("REQUEST", request);
    // creating a new order
    const result = await fetch(`${API}s/sub/`, {
      method: "POST",
      body: JSON.stringify(request),
      headers: { "content-type": "application/json" },
    });
    if (!result) {
      alert("Server error. Are you online?");
      return;
    }
    if (result.error) {
      console.log("Error", result.error);
      return;
    }
    // return;
    // Getting the order details back
    const result2 = await result.json();
    console.log("RESULT", result2);
    const { rzp_sub_id } = result2;

    const options = {
      key: RZP_KEY, // Enter the Key ID generated from the Dashboard,
      // amount: amount.toString(),
      subscription_id: rzp_sub_id,
      name: "Credbit Service",
      description: "Dispute letter service",

      // image: { logo },
      // order_id: order_id,
      handler: async function (response) {
        return <Redirect to="/letters" />;
      },
      prefill: {
        name: user.first_name,
        email: user.email,
        contact: user.phone,
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
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
              {amount}{" "}
              <span className={classes.time_period}>/&nbsp;&nbsp;Monthly</span>
            </h1>
          </div>
        </div>
        <hr />
        <div className={classes.pricing_menu}>
          <p>{letters_count}&nbsp; x &nbsp;letters</p>

          <p>Challenge&nbsp;{letters_count} Items</p>

          <p>Portal access</p>

          <p>Pre-written letters</p>

          {/* <p>Select letter(s)</p>

          <p>Dispute to bureaus</p>

          <p>Select bureau(s)</p>

          <p>Input creditor info</p>

          <p>Challenge creditors</p> */}
        </div>

        <div className={classes.pricing_button}>
          {link ? (
            <Link to={link} className={classes.blue_btn}>
              {" "}
              <span className={classes.pricing_span}>Select Plan</span>{" "}
            </Link>
          ) : (
            <button className={classes.blue_btn} onClick={displayRazorpay}>
              {" "}
              <span className={classes.pricing_span}>Select Plan</span>{" "}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default PricingCard;
