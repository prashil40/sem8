import React, { useState, useEffect } from 'react';
// import React from 'react';
import Header from '../../partials/Header/Header';
import Footer from '../../partials/Footer/Footer';
import classes from './ProfileSection.module.css';
import { Link } from 'react-router-dom';
import MyProfile from './MyProfile/MyProfile';
import MyLetters from './MyLetters/MyLetters';
import LettersHistory from './LettersHistory/LettersHistory';
import Subscription from './Subscription/Subscription';
import ChangePassword from './ChangePassword/ChangePassword';
import Logout from './Logout/Logout';

const ProfileSection = () => {
  const [selectedMenu, selectMenu] = useState('My Profile');
  const [selectedComponent, selectComponent] = useState(<MyProfile />);
  const handleClick = (e) => {
    const item = e.target.innerText;
    console.log('On click', e.target.innerText);
    selectMenu(item);

    switch (item) {
      case 'My Profile':
        selectComponent(<MyProfile />);
        break;
      case 'My Letters':
        selectComponent(<MyLetters />);
        break;
      case 'Letters History':
        selectComponent(<LettersHistory />);
        break;
      case 'Subscription':
        selectComponent(<Subscription />);
        break;
      case 'Change Password':
        selectComponent(<ChangePassword />);
        break;
      case 'Logout':
        selectComponent(<Logout />);
        break;
    }
  };

  useEffect(() => {}, [selectedComponent]);

  const menu_items = [
    'My Profile',
    'My Letters',
    'Letters History',
    'Subscription',
    'Change Password',
    'Logout',
  ];

  let menuItems = menu_items.map((item, index) => {
    return (
      <li
        id={index}
        className={
          `${classes.menu_item} ` +
          (selectedMenu === item ? `${classes.active}` : '')
        }
      >
        <div onClick={(e) => handleClick(e)}>{item}</div>
      </li>
    );
  });

  let dynamicComponent = (
    <div className={classes.selected_menu}>
      {selectedMenu === 'My Profile' && <MyProfile />}
      {selectedMenu === 'My Letters' && <MyLetters />}
      {selectedMenu === 'Letters History' && <LettersHistory />}
      {selectedMenu === 'Subscription' && <Subscription />}
      {selectedMenu === 'Change Password' && <ChangePassword />}
      {selectedMenu === 'Logout' && <Logout />}
    </div>
  );

  return (
    <div>
      <main>
        <section className="blog-area pt-120 pb-80">
          <div className={`container ${classes.p_section}`}>
            <div className="row">
              <div className={classes.menu_container}>
                <div className="widget mb-40 mt-30">
                  <div className="widget-title-box mb-30">
                    <span className="animate-border"></span>
                    <h3 className="widget-title">Welcome User!</h3>
                  </div>
                  <ul className={`cat ${classes.menu_list}`}>
                    {/* <li
                      className={`active ${classes.menu_item}`}
                      onClick={(e) => handleClick(e)}
                    >
                      <div>My Profile </div>
                    </li>
                    <li>
                      <div>My Letters </div>
                    </li>
                    <li>
                      <div>Letters History</div>
                    </li>
                    <li>
                      <div>Subscription </div>
                    </li>
                    <li>
                      <div>Change Password </div>
                    </li>
                    <li>
                      <div>Logout </div>
                    </li> */}
                    {menuItems}
                  </ul>
                </div>
              </div>{' '}
              {dynamicComponent}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProfileSection;
