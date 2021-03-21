const MyProfile = () => {
  return (
    <div className="appointment-wrapper contact-form-page">
      <form className="appointment-form" name="profileForm" id="profileForm">
        <div className="row desktop">
          <div className="col-lg-12">
            <h4>CUSTOMER INFORMATION</h4>
            <hr />
          </div>
          <div className="col-lg-12">
            <div className="col-lg-8">
              <div className="form-box email-icon mb-30">
                <input
                  type="hidden"
                  name="client_id"
                  placeholder="Client ID"
                  value="2"
                />
                <input
                  type="email"
                  className="emailbox"
                  name="client_email"
                  placeholder="Email Here"
                  autocomplete="off"
                  value="vkantliwala@gmail.com"
                  required
                  readonly
                />
              </div>
            </div>
          </div>
          <div className="col-lg-12 displayStyle">
            <div className="col-lg-4 col-sm-12 col-xs-12">
              <div className="form-box user-icon mb-30">
                <input
                  type="text"
                  name="client_fname"
                  placeholder="First Name"
                  value="Vishnuu"
                  required
                />
              </div>
            </div>
            <div className="col-lg-4 col-sm-12 col-xs-12">
              <div className="form-box user-icon mb-30">
                <input
                  type="text"
                  name="client_mname"
                  placeholder="Middle Name(Optional)"
                  value="Bharatkumar"
                />
              </div>
            </div>
            <div className="col-lg-4 col-sm-12 col-xs-12">
              <div className="form-box user-icon mb-30">
                <input
                  type="text"
                  name="client_lname"
                  placeholder="Last Name"
                  value="Kantliwala"
                  required
                />
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="col-lg-12">
              <div className="form-box phone-icon mb-30">
                <input
                  type="number"
                  name="client_mob_number"
                  placeholder="Phone Number"
                  value="1234567890"
                  required
                />
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="col-lg-12">
              <div className="form-box message-icon mb-30">
                <input
                  type="text"
                  name="street_address"
                  placeholder="Street Address"
                  value="Test"
                  required
                />
              </div>
            </div>
          </div>
          <div className="col-lg-12 displayStyle">
            <div className="col-lg-4">
              <div className="form-box message-icon mb-30">
                <input
                  type="text"
                  name="client_city"
                  placeholder="City"
                  value="Surat"
                  required
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="form-box statelist message-icon mb-30">
                <select name="client_state">
                  <option value="U.S. Virgin Islands">
                    U.S. Virgin Islands
                  </option>
                </select>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="form-box message-icon mb-30">
                <input
                  type="text"
                  name="zip_code"
                  placeholder="Zip Code"
                  value="123456"
                  required
                />
              </div>
            </div>
          </div>
          <div
            className="col-lg-12 "
            //   style="display:inline-flex;"
          >
            <div
              className="col-lg-8"
              //   style="font-size:12px;text-align:right;padding-top:10px;"
            >
              <label
                id="lblMsg"
                // style="font-style:italic;color:green;margin-left:10px"
              ></label>
            </div>
            <div className="col-lg-4">
              <button
                className="btn"
                type="submit"
                // style="padding:10px 40px;"
              >
                <span className="btn-text">Save Changes</span>{' '}
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
