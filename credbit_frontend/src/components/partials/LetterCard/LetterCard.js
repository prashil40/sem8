import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LetterImage from '../../images/LetterImage.jpg';
import classes from './LetterCard.module.css';

const LetterCard = ({
  letter,
  letterIndex,
  setSelectedLetters = (f) => f,
  selectedLetters,
}) => {
  const title = letter.title;
  const short_desc = letter.short_desc;
  const status = letter.status;
  const index = letterIndex;

  const [selected, setSelected] = useState(false);

  useEffect(() => {
    const index = selectedLetters.indexOf(letter);
    console.log(
      'index and selected,selected letters',
      index,
      selected
      // selectedLetters
    );
    if (selected === true) {
      if (index === -1) {
        setSelectedLetters([...selectedLetters, letter]);
      }
    } else {
      if (index !== -1) {
        setSelectedLetters(
          selectedLetters.filter(
            (selectedLetter) => selectedLetter.id !== letter.id
          )
        );
      }
    }
    // console.log('Selected Letters', selectedLetters);
  }, [selected]);

  const handleSelect = () => {
    setSelected(!selected);
  };

  return (
    <div className={`${classes.col_xl_4} `}>
      <div
        className={` ${classes.card}  ${classes.card_select} ${
          selected ? classes.card_is_selected : ''
        }`}
      >
        <div className={`${classes.our_services_wrapper}`}>
          <div className={classes.our_services_content}>
            <div className={classes.our_services_text}>
              <h3>{title}</h3>
            </div>
          </div>
          <div className={classes.our_services_img}>
            <img src={LetterImage} alt="Letter Preview" />
          </div>
          <div
            className={`${classes.our_services_content} ${classes.text_center}`}
          >
            <label className={classes.tooltip}>
              What is {title} ?
              <span className={classes.tooltiptext}> {short_desc} </span>
            </label>
            {/* <div
            className={`${classes.our_services_text} ${classes.text_center} mt-20`}
          > */}
            {/* <input
              type="checkbox"
              name="lettersCheck"
              id={`lettersCheck_${index}`}
              value="1"
            />
            &nbsp;&nbsp;
            <label
              className={classes.label_select}
              for={`lettersCheck_${index}`}
              id={`labelLetter_${index}`}
            >
              Select
            </label> */}

            {/* </div> */}
          </div>
        </div>
        <button
          className={classes.cardSelectButton}
          // data-cardSelectButton
          onClick={() => {
            handleSelect();
          }}
        ></button>
      </div>
    </div>
  );
};
export default LetterCard;
