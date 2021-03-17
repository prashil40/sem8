import React from "react";
import LetterCard from "../LetterCard/LetterCard";
import LetterImage from "../../images/LetterImage.jpg";
import classes from "./BureauSelectionCard.module.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const BureauSelectionCard = () => {
  const title = "Sample title";
  const name = "Vishnu Kantliwala";
  const address = "334, Nevada, US";
  const contact_no = "9876543210";
  const email = "vkantliwala@gmail.com";
  const bureaus = [
    { value: "Transunion", label: "Transunion" },
    { value: "Equifax", label: "Equifax" },
    { value: "Experian", label: "Experian" },
  ];
  return (
    <div className={`${classes.col_xl_12} ${classes.bureau_card} `}>
      <div className={`${classes.col_xl_3} ${classes.image_div}  `}>
        <div className={` ${classes.card}  ${classes.card_select} `}>
          <div className={`${classes.our_services_wrapper}`}>
            <div className={classes.our_services_content}>
              <div className={classes.our_services_text}>
                <h3>{title}</h3>
              </div>
            </div>
            <div className={classes.our_services_img}>
              <img src={LetterImage} alt="Letter Preview" />
            </div>
          </div>
        </div>
      </div>
      <div className={`${classes.col_xl_3} ${classes.user_info_div}`}>
        <p>{name}</p>
        <p>{address}</p>
        <p>{contact_no}</p>
        <p>{email}</p>
      </div>
      <div className={`${classes.col_xl_6} `}>
        <form className={classes.form}>
          <div className={`${classes.form_row} ${classes.email_control}`}>
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={bureaus}
              placeholder="Select bureaus"
              id="bureaus"
              className={`${classes.bureaus}`}
            />
            <label htmlFor="bureaus" className={classes.floating_label}>
              Bureaus
            </label>
          </div>
          <div className={`${classes.form_row} ${classes.email_control}`}>
            <input
              type="text"
              className={classes.form_control}
              id="name"
              name="name"
              required
            />
            <label htmlFor="name" className={classes.floating_label}>
              Creditor Name
            </label>
          </div>

          <div className={`${classes.form_row} ${classes.email_control}`}>
            <input
              type="text"
              className={classes.form_control}
              id="ac_number"
              name="ac_number"
              required
            />
            <label htmlFor="ac_number" className={classes.floating_label}>
              Account Number / SS Number
            </label>
          </div>

          <div className={`${classes.form_row} ${classes.email_control}`}>
            <input
              type="date"
              className={classes.form_control}
              id="date"
              name="date"
              placeholder=""
            />
            <label htmlFor="date" className={classes.floating_label}>
              Date
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BureauSelectionCard;
