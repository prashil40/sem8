import React from 'react';
import classes from './ResetPassword.module.css';
// import { Link } from 'react-router-dom';

import blob from '../../images/blob-4.svg';
import illustration from '../../images/undraw_authentication_fsn5.svg';
import logo from '../../images/logo_credbit.png';

const ResetPassword = () => {
	return (
		<section className={classes.section}>
			<div className={classes.illustration_area}>
				<img src={blob} alt='blob' className={classes.blob} />
				<img src={illustration} alt='Reset Password illustration' />
			</div>
			<div className={classes.form_area}>
				<div className={classes.container_label}>
					<img src={logo} alt='logo' />
					<span>Reset Password</span>
				</div>
				<div className={classes.container}>
					<form className={classes.form}>
						<div className={classes.form_row}>
							<p>Enter a new password</p>
						</div>
						<div className={classes.form_row}>
							<input type='password' className={classes.form_control} id='pass' required />
							<label htmlFor='pass' className={classes.floating_label}>
								Password
							</label>
						</div>
						<div className={classes.form_row}>
							<input type='password' className={classes.form_control} id='cpass' required />
							<label htmlFor='cpass' className={classes.floating_label}>
								Confirm Password
							</label>
						</div>
						<div className={classes.form_row}>
							<div className={classes.submit_button}>Reset</div>
							{/*
              <div className={classes.failure_button}>
                Passwords should match
              </div>
              <div className={classes.success_button}>
                Go to Login Page
              </div>
              */}
						</div>
					</form>
				</div>
			</div>
		</section>
	);
};

export default ResetPassword;
