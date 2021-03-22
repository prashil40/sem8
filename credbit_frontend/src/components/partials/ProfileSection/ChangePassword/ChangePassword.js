import classes from './ChangePassword.module.css';

const ChangePassword = () => {
  return (
    <div>
      <form
        className="changepassword-form"
        name="changePasswordForm"
        id="changePasswordForm"
      >
        <div className="row">
          <div className={`${classes.col_xl_12} mt-30`}>
            <h4>CHANGE PASSWORD</h4>
            <hr style={{ margin: '10px 0px' }} />
          </div>
        </div>
        <div className="container">
          <div className={classes.passwordContainer}>
            <div className={`${classes.col_xl_4} ${classes.password}`}>
              <input
                type="password"
                name=""
                placeholder="Old Password"
                style={{ width: '100%' }}
              />
            </div>
            <div className={`${classes.col_xl_4} ${classes.password}`}>
              <input
                type="password"
                name=""
                placeholder="New Password"
                style={{ width: '100%' }}
              />
            </div>
            <div className={`${classes.col_xl_4} ${classes.password}`}>
              <input
                type="password"
                style={{ width: '100%' }}
                name=""
                placeholder="Confirm New Password"
              />
            </div>
            {/* <div > */}
            <div className={classes.btn}>Change Password</div>
            {/* </div> */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
