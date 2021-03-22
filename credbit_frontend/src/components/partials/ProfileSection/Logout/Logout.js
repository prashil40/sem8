import classes from './Logout.module.css';

const Logout = () => {
  return (
    <div>
      <form
        className="changepassword-form"
        name="changePasswordForm"
        id="changePasswordForm"
      >
        <div className="row">
          <div className={`${classes.col_xl_12} mt-30`}>
            <h4>LOGOUT</h4>
            <hr style={{ margin: '10px 0px' }} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Logout;
