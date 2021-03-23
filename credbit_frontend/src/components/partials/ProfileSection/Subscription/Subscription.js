import classes from './Subscription.module.css';

const Subscription = () => {
  return (
    <div>
      <form
        className="changepassword-form"
        name="changePasswordForm"
        id="changePasswordForm"
      >
        <div className="row">
          <div className={`${classes.col_xl_12_header} mt-30`}>
            <h3>SUBSCRIPTION</h3>
            <hr style={{ margin: '10px 0px' }} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Subscription;
