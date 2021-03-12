import React, { useState, useEffect } from 'react';
import Header from '../../partials/Header/Header';
import Footer from '../../partials/Footer/Footer';
import classes from './Letters.module.css';
import { Link } from 'react-router-dom';
import LetterCard from '../../partials/LetterCard/LetterCard';
import { getLetters } from '../helpers/LetterApiCall';
import FileUpload from '../../partials/FileUpload/FileUpload';

const Letters = () => {
  const [letters, setLetters] = useState([]);
  const [error, setError] = useState(false);
  const [selectedLetters, setSelectedLetters] = useState([]);
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
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadAllLetters();
    console.log('Selected Letters', selectedLetters);
  }, []);

  const handleSubmit = () => {
    console.log('Selected Letters', selectedLetters);
    setNext(true);
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
              <div className={classes.about_button} onClick={handleSubmit}>
                <Link
                  className={classes.blue_btn}
                  // to="login/"
                >
                  {' '}
                  <span className="btn-text">
                    Next <i className="far fa-long-arrow-right"></i>
                  </span>{' '}
                </Link>
              </div>
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
    } else {
      return (
        <FileUpload
          accept=".jpg,.jpeg,.png,.pdf"
          label="Doc  ument"
          updateFilesCb={updateDocument}
        />
      );
    }
  };
  return (
    <div>
      <Header />
      <main>
        {/* <!-- breadcrumb-area-start --> */}
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
        {/* <!-- breadcrumb-area-start -->*/}

        {dynamicComponent()}
      </main>
      <Footer />
    </div>
  );
};

export default Letters;
