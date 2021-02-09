import React from 'react';
import classes from './ForgotPassword.module.css';
// import { Link } from 'react-router-dom';

import blob from '../../images/blob-3.svg';
import illustration from '../../images/undraw_my_password_d6kg.svg';
import logo from '../../images/logo_credbit.png';

const ForgotPassword = () => {
	return (
		<section className={classes.section}>
			<div className={classes.illustration_area}>
				<img src={blob} alt='blob' className={classes.blob} />
				<img src={illustration} alt='Forgot Password illustration' />
			</div>
			<div className={classes.form_area}>
				<div className={classes.container_label}>
					<img src={logo} alt='logo' />
					<span>Forgot Password</span>
				</div>
				<div className={classes.container}>
					<form className={classes.form}>
						<div className={classes.form_row}>
							<p>Please enter a registered Email</p>
						</div>
						<div className={classes.form_row}>
							<input type='email' className={classes.form_control} id='email' required />
							<label htmlFor='email' className={classes.floating_label}>
								Email
							</label>
						</div>
						<div className={classes.form_row}>
							<div className={classes.submit_button}>Send Email</div>
							{/*
              <div className={classes.failure_button}>
                User doesn't exist
              </div>
              <div className={classes.success_button}>
                Check your inbox
              </div>
              */}
						</div>
					</form>
				</div>
			</div>
		</section>
	);
};

export default ForgotPassword;
