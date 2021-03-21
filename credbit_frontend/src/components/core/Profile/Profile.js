import React from 'react';
import Header from '../../partials/Header/Header';
import Footer from '../../partials/Footer/Footer';
import classes from './Profile.module.css';
import { Link } from 'react-router-dom';
import ProfileSection from '../../partials/ProfileSection/ProfileSection';

const Profile = () => {
  return (
    <div>
      <Header />
      <main>
        <div className={classes.breadcrumb_area}>
          <div className="container">
            <div className="row ">
              <div className={classes.col}>
                <div className={`${classes.breadcrumb_text} text_center`}>
                  <h1>My Profile</h1>
                  <ul className={classes.breadcrumb_menu}>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <span>My Profile</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <ProfileSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
