import React, { useState, useEffect } from "react";
import Header from "../../partials/Header/Header";
import Footer from "../../partials/Footer/Footer";
import classes from "./Letters.module.css";
import { Link } from "react-router-dom";
import LetterCard from "../../partials/LetterCard/LetterCard";
import { getLetters, createLetters } from "../helpers/LetterApiCall";
import { getBureaus } from "../helpers/BureauApiCall";
import FileUpload from "../../partials/FileUpload/FileUpload";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BureauSelectionCard from "../../partials/Bureau/BureauSelectionCard";

const options = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const Letters = () => {
  const [letters, setLetters] = useState([]);
  const [bureaus, setBureaus] = useState([]);
  const [error, setError] = useState(false);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [letterBureaus, setLetterBureaus] = useState({});
  const [sendingError, setSendingError] = useState("");
  const [lettersSent, setLettersSent] = useState(false);
  const [lettersSending, setLettersSending] = useState(false);

  const [nextValue, setNext] = useState(false);

  const [document, setDocument] = useState({ documentsArr: [] });

  const updateDocument = (files) => {
    setDocument({ ...document, documentsArr: files });
  };

  let letterCards = letters.map((letter, index) => {
    letter.index = index;
    return (
      <LetterCard
        key={index}
        letter={letter}
        letterIndex={index}
        setSelectedLetters={setSelectedLetters}
        selectedLetters={selectedLetters}
      />
    );
  });

  const loadAllLetters = () => {
    getLetters()
      .then((data) => {
        if (data.error) {
          setError(data.error);
          console.log(error);
        } else {
          setLetters(data);
        }
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  };

  const loadAllBureaus = () => {
    getBureaus()
      .then((data) => {
        if (data.error) {
          setError(data.error);
          console.log(error);
        } else {
          setBureaus(data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadAllLetters();
    loadAllBureaus();
    console.log("Selected Letters", selectedLetters);
  }, []);

  const handleSubmit = () => {
    console.log("Selected Letters", selectedLetters);

    if (selectedLetters.length === 0) {
      toast.error("Select atleast one letter", options);
    } else {
      setNext(true);
    }
  };
  let user;
  if (localStorage.getItem("token")) {
    user = JSON.parse(localStorage.getItem("token")).user;
  }
  const [functionToCall, createFunctionToCall] = useState();
  const mappings = [];
  const sendLetters = async () => {
    if (document.documentsArr.length === 0) {
      setSendingError("Choose ID proof!");
      return;
    }

    const id_proof = document.documentsArr[0];

    for (const fun in functionToCall) {
      // fun().call();
      const inputs = functionToCall[fun]().call();
      if (inputs === null) {
        setSendingError("Enter details properly!");
        return;
      }
      for (const bureau in inputs.bureaus) {
        mappings.push({
          bureau_url: inputs.bureaus[bureau]["value"],
          letter_url: inputs.letter_url,
          account_number: inputs.account_number,
          creditor_name: inputs.creditor_name,
          mention_date: inputs.date,
        });
      }
    }
    const data = {
      client_id: user._id,
      mappings,
    };

    console.log("Data", data);
    console.log("Document", id_proof);
    setSendingError("");

    setLettersSending((lettersSending) => !lettersSending);

    const res = await createLetters(data, id_proof);
    if (res) {
      setLettersSent((lettersSent) => !lettersSent);
      console.log("Letters sent successfully!", res);
    }
    setLettersSending((lettersSending) => !lettersSending);
  };

  const dynamicComponent = () => {
    if (!nextValue) {
      return (
        <div
          className={`${classes.our_services_area} ${classes.grey_bg_2} pt-120 pb-130`}
        >
          <div className={classes.container} id="letters">
            <div className="row">{letterCards}</div>
            <div className={`row ${classes.row_style}`}>
              {user ? (
                <div className={classes.about_button} onClick={handleSubmit}>
                  <Link
                    className={classes.blue_btn}
                    // to="login/"
                  >
                    {" "}
                    <span className="btn-text">
                      Next <i className="far fa-long-arrow-right"></i>
                    </span>{" "}
                  </Link>
                </div>
              ) : (
                <div className={classes.about_button}>
                  <Link className={classes.blue_btn} to="signin/">
                    {" "}
                    <span className="btn-text">
                      Next <i className="far fa-long-arrow-right"></i>
                    </span>{" "}
                  </Link>
                </div>
              )}
              <div
                id="hideDiv"
                className={classes.hide_div}
                //   style="display:none;margin-top:18px;"
              >
                <img
                  src="loader1.gif"
                  id="loader"
                  // style="height:20px;"
                />
                <label
                  id="lblMsgVerify"
                  // style="font-size:17px;"
                ></label>
              </div>
            </div>
          </div>
          <div
            className={`${classes.container} ${classes.selected_letters}`}
            id="selectedLetters"
            //   style="display:none;"
          >
            <div
              className="col-lg-12"
              // style="text-align:center;"
              id="loaderV"
            >
              <img
                src="Loader.gif"
                //   style="width:20%;"
              />
              <h6>Please wait!</h6>
            </div>
          </div>
        </div>
      );
    } else if (user) {
      return (
        <>
          <FileUpload
            accept=".jpg,.jpeg,.png,.pdf"
            label="Document"
            updateFilesCb={updateDocument}
          />
          <div className="container">
            {/* <BureauSelectionCard /> */}
            {selectedLetters.map((letter) => {
              return (
                <BureauSelectionCard
                  key={letter.url}
                  letter={letter}
                  user={user}
                  bureaus={bureaus}
                  setLetterBureaus={setLetterBureaus}
                  letterBureaus={letterBureaus}
                  createFunctionToCall={createFunctionToCall}
                  functionToCall={functionToCall}
                />
              );
            })}
          </div>
          <div className="container pb-130">
            {lettersSending ? (
              <label className={classes.success_message}>
                Sending letters...
              </label>
            ) : (
              ""
            )}
            {!lettersSent ? (
              <>
                {sendingError ? (
                  <label className={classes.error_message}>
                    {sendingError}
                  </label>
                ) : (
                  ""
                )}

                <div
                  className={`${classes.about_button} ${classes.send_button}`}
                  onClick={sendLetters}
                >
                  <a
                    className={classes.blue_btn}
                    // to="login/"
                  >
                    {" "}
                    <span className="btn-text">
                      Send <i className="far fa-long-arrow-right"></i>
                    </span>{" "}
                  </a>
                </div>
              </>
            ) : (
              <>
                <label className={classes.success_message}>
                  Letters sent successfully!
                </label>
                <div
                  className={`${classes.about_button} ${classes.send_button}`}
                >
                  <a className={classes.blue_btn} to="./">
                    {" "}
                    <span className="btn-text">
                      Home <i className="far fa-long-arrow-right"></i>
                    </span>{" "}
                  </a>
                </div>
              </>
            )}
          </div>
        </>
      );
    }
  };

  return (
    <div>
      <Header />
      <main>
        {/* <!-- breadcrumb-area-start --> */}
        {!error && (
          <>
            <div
              className={classes.breadcrumb_area}
              //   style="background-image:url('page/big_img/bg-14502568.jpeg');"
            >
              <div className={classes.container}>
                <div className="row">
                  <div className={classes.col_xl_12}>
                    <div
                      className={`${classes.breadcrumb_text} ${classes.text_center}`}
                    >
                      <h1>Letters</h1>
                      <ul className={classes.breadcrumb_menu}>
                        <li>
                          <Link to="/">Home</Link>
                        </li>
                        <li>
                          <span>Letters</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {dynamicComponent()}
          </>
        )}
        {error && (
          <div className={classes.error_area}>
            {/* <img src={illustration} alt='Error Illustration' /> */}
            <span>Server Down. Try again later!</span>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Letters;
