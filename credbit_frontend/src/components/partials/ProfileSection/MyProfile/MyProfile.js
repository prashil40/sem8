import classes from './MyProfile.module.css';
import React, { useState, useEffect } from 'react';

const MyProfile = () => {
  const [values, setValues] = useState({});

  useEffect(() => {}, []);

  const getUserDetails = () => {};
  return (
    <div className="appointment-wrapper contact-form-page">
      <form className="appointment-form" name="profileForm" id="profileForm">
        <div className="row desktop">
          <div className={`${classes.col_xl_12} mt-30`}>
            <h4>MY PROFILE</h4>
            <hr style={{ margin: '10px 0px' }} />
          </div>
          <div className={classes.col_xl_12}>
            <div className={`${classes.col_xl_8}`}>
              <div className={`${classes.form_box} email-icon mb-30`}>
                {/* <input
                  style={{ width: '100%' }}
                  className={classes.text_input}
                  type="hidden"
                  name="client_id"
                  placeholder="Client ID"
                  defaultValue="2"
                /> */}
                <label className={classes.label}>Email</label>
                <input
                  style={{ width: '100%' }}
                  className={classes.text_input}
                  id="email"
                  type="email"
                  // className="emailbox"
                  name="client_email"
                  placeholder="Email Here"
                  autocomplete="off"
                  defaultValue="vkantliwala@gmail.com"
                  required
                  disabled={true}
                />
              </div>
            </div>
          </div>
          <div className={`${classes.col_xl_12} d-flex`}>
            <div className={classes.col_xl_4}>
              <div className={`${classes.form_box} user-icon mb-30`}>
                <label className={classes.label}>First name</label>
                <input
                  style={{ width: '100%' }}
                  className={classes.text_input}
                  id="firstName"
                  type="text"
                  name="client_fname"
                  placeholder="First Name"
                  defaultValue="Vishnuu"
                  required
                />
              </div>
            </div>
            <div className={classes.col_xl_4}>
              <div className={`${classes.form_box} user-icon mb-30`}>
                <label className={classes.label}>Middle name</label>
                <input
                  id="middleName"
                  style={{ width: '100%' }}
                  className={classes.text_input}
                  type="text"
                  name="client_mname"
                  placeholder="Middle Name(Optional)"
                  defaultValue="Bharatkumar"
                />
              </div>
            </div>
            <div className={classes.col_xl_4}>
              <div className={`${classes.form_box} user-icon mb-30`}>
                <label className={classes.label}>Last name</label>
                <input
                  id="lastName"
                  style={{ width: '100%' }}
                  className={classes.text_input}
                  type="text"
                  name="client_lname"
                  placeholder="Last Name"
                  defaultValue="Kantliwala"
                  required
                />
              </div>
            </div>
          </div>
          <div className={classes.col_xl_12}>
            <div className={classes.col_xl_4}>
              <div className={`${classes.form_box} phone-icon mb-30`}>
                <label className={classes.label}>Phone Number</label>
                <input
                  id="phone"
                  style={{ width: '100%' }}
                  className={classes.text_input}
                  type="number"
                  name="client_mob_number"
                  placeholder="Phone Number"
                  defaultValue="1234567890"
                  required
                />
              </div>
            </div>
          </div>
          <div className={classes.col_xl_12}>
            <div className={classes.col_xl_12}>
              <div className={`${classes.form_box} message-icon mb-30`}>
                <label className={classes.label}>Address</label>
                <input
                  id="address"
                  style={{ width: '100%' }}
                  className={classes.text_input}
                  type="text"
                  name="street_address"
                  placeholder="Street Address"
                  defaultValue="Test"
                  required
                />
              </div>
            </div>
          </div>
          <div className={`${classes.col_xl_12} d-flex`}>
            <div className={classes.col_xl_4}>
              <div className={`${classes.form_box} message-icon mb-30`}>
                <label className={classes.label}>City</label>
                <input
                  id="city"
                  style={{ width: '100%' }}
                  className={classes.text_input}
                  type="text"
                  name="client_city"
                  placeholder="City"
                  defaultValue="Surat"
                  required
                />
              </div>
            </div>
            <div className={classes.col_xl_4}>
              <label className={classes.label}>State</label>
              <div
                className={`${classes.form_box} statelist message-icon mb-30`}
              >
                <select
                  className={classes.listSelect}
                  name="client_state"
                  id="state"
                >
                  <option defaultValue="Gujarat">Gujarat</option>
                  <option value="Delhi">Delhi</option>
                </select>
              </div>
            </div>
            <div className={classes.col_xl_4}>
              <div className={`${classes.form_box} message-icon mb-30`}>
                <label className={classes.label}>Zipcode</label>
                <input
                  id="zipcode"
                  style={{ width: '100%' }}
                  className={classes.text_input}
                  type="text"
                  name="zip_code"
                  placeholder="Zip Code"
                  defaultValue="123456"
                  required
                />
              </div>
            </div>
          </div>
          <div className={classes.col_xl_12} style={{ display: 'inline-flex' }}>
            <div
              className={classes.col_xl_8}
              style={{
                'font-size': '12px',
                'text-align': 'right',
                'padding-top': '10px',
              }}
            >
              <label
                id="lblMsg"
                style={{
                  'font-style': 'italic',
                  color: 'green',
                  'margin-left': '10px',
                }}
              ></label>
            </div>
            <div className={classes.col_xl_4}>
              <button
                className="btn"
                type="submit"
                style={{ padding: '10px 40px' }}
              >
                <span className="btn-text mb-30">Save Changes</span>{' '}
                <span className="btn-border"></span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
