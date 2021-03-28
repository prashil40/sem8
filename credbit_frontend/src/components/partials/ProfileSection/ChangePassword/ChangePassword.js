import classes from './ChangePassword.module.css';
import { Link } from 'react-router-dom';

const ChangePassword = () => {
  return (
    <div>
      <form
        className="changepassword-form"
        name="changePasswordForm"
        id="changePasswordForm"
      >
        <div className="row">
          <div className={`${classes.col_xl_12_header} mt-30`}>
            <h3>CHANGE PASSWORD</h3>
            <hr style={{ margin: '10px 0px' }} />
          </div>
        </div>
        <div className="container">
          <div className={classes.passwordContainer}>
            <div className={`${classes.col_xl_4} ${classes.password}`}>
              <input
                type="password"
                name=""
                className={classes.form_control}
                placeholder="Old Password"
                style={{ width: '100%' }}
              />
            </div>
            <div className={`${classes.col_xl_4} ${classes.password}`}>
              <input
                type="password"
                name=""
                className={classes.form_control}
                placeholder="New Password"
                style={{ width: '100%' }}
              />
            </div>
            <div className={`${classes.col_xl_4} ${classes.password}`}>
              <input
                type="password"
                style={{ width: '100%' }}
                name=""
                className={classes.form_control}
                placeholder="Confirm New Password"
              />
            </div>
            {/* <div > */}
            <div className={`${classes.blue_btn}`}>
              <span>Change Password</span>
            </div>
            {/* </div> */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
