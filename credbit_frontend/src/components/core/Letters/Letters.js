import React, { useState, useEffect } from 'react';
import Header from '../../partials/Header/Header';
import Footer from '../../partials/Footer/Footer';
import classes from './Letters.module.css';
import { Link } from 'react-router-dom';
import LetterCard from '../../partials/LetterCard/LetterCard';
import { getLetters } from '../helpers/LetterApiCall';

const Letters = () => {
  const [letters, setLetters] = useState([]);
  const [error, setError] = useState(false);

  let letterCards = letters.map((letter, index) => {
    letter.index = index;
    return <LetterCard key={index} letter={letter} letterIndex={index} />;
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
  }, []);

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
        {/* <!-- breadcrumb-area-start -->
            <!-- pricing-area-start --> */}
        <div
          className={`${classes.our_services_area} ${classes.grey_bg_2} pt-120 pb-130`}
        >
          <div className={classes.container} id="letters">
            <div className="row">
              {/* <div className={classes.col_xl_4}>
                <div className={`${classes.our_services_wrapper} mb-30`}>
                  <div className={classes.our_services_content}>
                    <div className={classes.our_services_text}>
                      <h3>Debt Validation Letter</h3>
                    </div>
                  </div>
                  <div className={classes.our_services_img}>
                    <img
                      src="content/preview-letter-template.jpg"
                      alt="Letter Preview"
                    />
                  </div>
                  <div
                    className={`${classes.our_services_content} ${classes.text_center}`}
                  >
                    <label
                      className={classes.tooltip}
                      data-tooltip='Debt Validation Letter: The term "debt validation letter" 
                      refers to a letter that is sent to the bureau(s) or the creditor collect`ion 
                      agency requesting proof that the debt in question is valid and not outsi`de 
                      the statute of limitations for collecting the questionable item or debt.`&nbsp;'
                    >
                      ` What is Debt Validation Letter ?
                      <span class={classes.tooltiptext}>
                        {' '}
                        Debt Validation Letter: The term "debt validation
                        letter" refers to a letter that is sent to the bureau(s)
                        or the creditor collection agency requesting proof that
                        the debt in question is valid and not outside the
                        statute of limitations for collecting the questionable
                        item or debt.{' '}
                      </span>
                    </label>
                    <div
                      className={`${classes.our_services_text} ${classes.text_center} mt-20`}
                    >
                      <input
                        type="checkbox"
                        name="lettersCheck"
                        id="lettersCheck_1"
                        value="1"
                      />
                      &nbsp;&nbsp;
                      <label
                        className={classes.label_select}
                        for="lettersCheck_1"
                        id="lblletter_1"
                      >
                        Select
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className={classes.col_xl_4}>
                <div className={`${classes.our_services_wrapper} mb-30`}>
                  <div className={classes.our_services_content}>
                    <div className={classes.our_services_text}>
                      <h3>Debt Validation Letter</h3>
                    </div>
                  </div>
                  <div className={classes.our_services_img}>
                    <img
                      src="content/preview-letter-template.jpg"
                      alt="Letter Preview"
                    />
                  </div>
                  <div
                    className={`${classes.our_services_content} ${classes.text_center}`}
                  >
                    <label
                      className={classes.tooltip}
                      data-tooltip='Debt Validation Letter: The term "debt validation letter" 
                      refers to a letter that is sent to the bureau(s) or the creditor collect`ion 
                      agency requesting proof that the debt in question is valid and not outsi`de 
                      the statute of limitations for collecting the questionable item or debt.`&nbsp;'
                    >
                      ` What is Debt Validation Letter ?
                      <span class={classes.tooltiptext}>
                        {' '}
                        Debt Validation Letter: The term "debt validation
                        letter" refers to a letter that is sent to the bureau(s)
                        or the creditor collection agency requesting proof that
                        the debt in question is valid and not outside the
                        statute of limitations for collecting the questionable
                        item or debt.{' '}
                      </span>
                    </label>
                    <div
                      className={`${classes.our_services_text} ${classes.text_center} mt-20`}
                    >
                      <input
                        type="checkbox"
                        name="lettersCheck"
                        id="lettersCheck_1"
                        value="1"
                      />
                      &nbsp;&nbsp;
                      <label
                        className={classes.label_select}
                        for="lettersCheck_1"
                        id="lblletter_1"
                      >
                        Select
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className={classes.col_xl_4}>
                <div className={`${classes.our_services_wrapper} mb-30`}>
                  <div className={classes.our_services_content}>
                    <div className={classes.our_services_text}>
                      <h3>Medical Collection Letter</h3>
                    </div>
                  </div>
                  <div className={classes.our_services_img}>
                    <img
                      src="content/preview-letter-template.jpg"
                      alt="Letter Preview"
                    />
                  </div>
                  <div
                    className={`${classes.our_services_content} ${classes.text_center}`}
                  >
                    <label
                      className={classes.tooltip}
                      data-tooltip="Medical Collection Letter: If you believe your medical collections were reported inaccurately to the credit bureaus, you may dispute them with each credit bureau. Any medical collection you find questionable, you may be able to get removed or updated based on verification from the collection agency.
"
                    >
                      What is Medical Collection Letter ?
                      <span class={classes.tooltiptext}>
                        Medical Collection Letter: If you believe your medical
                        collections were reported inaccurately to the credit
                        bureaus, you may dispute them with each credit bureau.
                        Any medical collection you find questionable, you may be
                        able to get removed or updated based on verification
                        from the collection agency.
                      </span>
                    </label>
                    <div
                      className={`${classes.our_services_text} ${classes.text_center} mt-20`}
                    >
                      <input
                        type="checkbox"
                        name="lettersCheck"
                        id="lettersCheck_4"
                        value="4"
                      />
                      &nbsp;&nbsp;
                      <label
                        className={classes.label_select}
                        for="lettersCheck_4"
                        id="lblletter_4"
                      >
                        Select
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className={classes.col_xl_4}>
                <div className={`${classes.our_services_wrapper} mb-30`}>
                  <div className={classes.our_services_content}>
                    <div className={classes.our_services_text}>
                      <h3>Statue of Limitation Letter</h3>
                    </div>
                  </div>
                  <div className={classes.our_services_img}>
                    <img
                      src="content/preview-letter-template.jpg"
                      alt="Letter Preview"
                    />
                  </div>
                  <div
                    className={`${classes.our_services_content} ${classes.text_center}`}
                  >
                    <label
                      className={classes.tooltip}
                      data-tooltip="Statue of Limitation Letter: This letter is to inform the bureaus or credit agency that you are aware of your credit history and with the legal right as a citizen in the United States once a creditor is past the seven year mark you have right to dispute and or challenge any derogatory marks against your credit report.
"
                    >
                      What is Statue of Limitation Letter ?
                      <span class={classes.tooltiptext}>
                        Statue of Limitation Letter: This letter is to inform
                        the bureaus or credit agency that you are aware of your
                        credit history and with the legal right as a citizen in
                        the United States once a creditor is past the seven year
                        mark you have right to dispute and or challenge any
                        derogatory marks against your credit report.
                      </span>
                    </label>
                    <div
                      className={`${classes.our_services_text} ${classes.text_center} mt-20`}
                    >
                      <input
                        type="checkbox"
                        name="lettersCheck"
                        id="lettersCheck_5"
                        value="5"
                      />
                      &nbsp;&nbsp;
                      <label
                        className={classes.label_select}
                        for="lettersCheck_5"
                        id="lblletter_5"
                      >
                        Select
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className={classes.col_xl_4}>
                <div className={`${classes.our_services_wrapper} mb-30`}>
                  <div className={classes.our_services_content}>
                    <div className={classes.our_services_text}>
                      <h3>Student Loan Letter</h3>
                    </div>
                  </div>
                  <div className={classes.our_services_img}>
                    <img
                      src="content/preview-letter-template.jpg"
                      alt="Letter Preview"
                    />
                  </div>
                  <div
                    className={`${classes.our_services_content} ${classes.text_center}`}
                  >
                    <label
                      className={classes.tooltip}
                      data-tooltip="Student Loan Letter: If you've fallen behind on student loan payments, your debt could get sold to a collections agency. But before making any payments to a collector, it's important to double-check that they're accurate. To find out, you may send the collection agency a Student Loan letter to verify. If the Collection is inaccurate your item or debt may be updated or removed.&nbsp;

&nbsp;
"
                    >
                      <span class={classes.tooltiptext}>
                        Student Loan Letter: If you've fallen behind on student
                        loan payments, your debt could get sold to a collections
                        agency. But before making any payments to a collector,
                        it's important to double-check that they're accurate. To
                        find out, you may send the collection agency a Student
                        Loan letter to verify. If the Collection is inaccurate
                        your item or debt may be updated or removed.&nbsp;
                      </span>
                      What is Student Loan Letter ?
                    </label>
                    <div
                      className={`${classes.our_services_text} ${classes.text_center} mt-20`}
                    >
                      <input
                        type="checkbox"
                        name="lettersCheck"
                        id="lettersCheck_3"
                        value="3"
                      />
                      &nbsp;&nbsp;
                      <label
                        className={classes.label_select}
                        for="lettersCheck_3"
                        id="lblletter_3"
                      >
                        Select
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className={classes.col_xl_4}> */}
              {/* <div className={`${classes.our_services_wrapper} mb-30`}>
                  <div className={classes.our_services_content}>
                    <div className={classes.our_services_text}>
                      <h3>Forgiveness Goodwill Letter</h3>
                    </div>
                  </div>
                  <div className={classes.our_services_img}>
                    <img
                      src="content/preview-letter-template.jpg"
                      alt="Letter Preview"
                    />
                  </div>
                  <div
                    className={`${classes.our_services_content} ${classes.text_center}`}
                  >
                    <label
                      className={classes.tooltip}
                      data-tooltip="Forgiveness Goodwill Letter:&nbsp; Sometimes called a forgiveness removal letter, this letter is essentially to help update your credit report by politely asking for the bureau(s) and or creditors to remove a negative mark or item from your credit report(s). 
"
                    >
                      What is Forgiveness Goodwill Letter ?
                      <span class={classes.tooltiptext}>
                        Forgiveness Goodwill Letter:&nbsp; Sometimes called a
                        forgiveness removal letter, this letter is essentially
                        to help update your credit report by politely asking for
                        the bureau(s) and or creditors to remove a negative mark
                        or item from your credit report(s).
                      </span>
                    </label>
                    <div
                      className={`${classes.our_services_text} ${classes.text_center} mt-20`}
                    >
                      <input
                        type="checkbox"
                        name="lettersCheck"
                        id="lettersCheck_2"
                        value="2"
                      />
                      &nbsp;&nbsp;
                      <label
                        className={classes.label_select}
                        for="lettersCheck_2"
                        id="lblletter_2"
                      >
                        Select
                      </label>
                    </div>
                  </div>
                </div>
              </div> */}

              {letterCards}
            </div>
            <div className={`row ${classes.row_style}`}>
              <div className={classes.about_button}>
                <Link
                  className={classes.blue_btn}
                  to="login/"
                  onclick="letterSelection();"
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
      </main>
      <Footer />
    </div>
  );
};

export default Letters;
