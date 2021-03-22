import React, { useState, useEffect } from "react";
import LetterCard from "../LetterCard/LetterCard";
import LetterImage from "../../images/LetterImage.jpg";
import classes from "./BureauSelectionCard.module.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const BureauSelectionCard = (props) => {
  const letter = props.letter;
  const title = letter.title;
  const url = letter.url;
  const user = props.user;
  const name = user.first_name;
  const createFunctionToCall = props.createFunctionToCall;

  // console.log("Props", props);
  const address =
    user.street + " " + user.city + " " + user.state + " " + user.zip_code;
  const contact_no = user.phone;
  const email = user.email;
  const bureaus = [];
  const [validationError, setValidationError] = useState("");

  let [inputs, setInputs] = useState({
    bureaus: "",
    creditor_name: "",
    account_number: "",
    date: "",
    letter_url: url,
  });

  const getInputs = () => {
    if (inputs.bureaus === "") {
      setValidationError("Select bureaus!");
      return null;
    } else if (inputs.creditor_name === "") {
      setValidationError("Enter creditor name!");
      return null;
    } else if (inputs.account_number === "") {
      setValidationError("Enter account number!");
      return null;
    } else {
      setValidationError("");
      return inputs;
    }
  };

  useEffect(() => {
    function theFunctionToCall() {
      // do something like setting something
      console.log(`Checking in letter ${title}`);
      // don't forget to set dependancies properly.

      return getInputs();
    }
    createFunctionToCall((prev) => ({
      ...prev,
      [url]: () => theFunctionToCall,
    }));
  }, [createFunctionToCall, inputs]);

  useEffect(() => {
    props.setLetterBureaus({ ...props.letterBureaus, [url]: inputs });
  }, [inputs]);

  props.bureaus.map((bureau) =>
    bureaus.push({ value: bureau.url, label: bureau.title })
  );

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
              name="bureaus"
              onChange={(selectedOption) =>
                setInputs({ ...inputs, bureaus: selectedOption })
              }
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
              onChange={(e) =>
                setInputs({ ...inputs, creditor_name: e.target.value })
              }
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
              onChange={(e) =>
                setInputs({ ...inputs, account_number: e.target.value })
              }
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
              onChange={(e) => setInputs({ ...inputs, date: e.target.value })}
            />
            <label htmlFor="date" className={classes.floating_label}>
              Date
            </label>
          </div>
        </form>
        {validationError ? (
          <label className={classes.error_message}>{validationError}</label>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default BureauSelectionCard;
