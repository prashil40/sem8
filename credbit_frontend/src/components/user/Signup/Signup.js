import React from 'react';
import classes from './Signup.module.css';
import { Link } from 'react-router-dom';
import AuthBase from '../AuthBase';

import blob from '../../images/blob-2.svg';
import illustration from '../../images/undraw_subscribe_vspl.svg';
import logo from '../../images/logo_credbit.png';

const Signup = () => {
	return (
		<AuthBase classes={classes} blob={blob} illustration={illustration} logo={logo} label='Login'>
			<form className={classes.form}>
				<div className={`${classes.form_row} ${classes.email_control}`}>
					<input type='email' className={classes.form_control} id='email' required />
					<label htmlFor='email' className={classes.floating_label}>
						Email
					</label>
				</div>
				<div className={`${classes.form_row} ${classes.fname_control}`}>
					<input type='text' className={classes.form_control} id='f_name' required />
					<label htmlFor='f_name' className={classes.floating_label}>
						First Name
					</label>
				</div>
				<div className={`${classes.form_row} ${classes.mname_control}`}>
					<input type='text' className={classes.form_control} id='m_name' required />
					<label htmlFor='m_name' className={classes.floating_label}>
						Middle Name
					</label>
				</div>
				<div className={`${classes.form_row} ${classes.lname_control}`}>
					<input type='text' className={classes.form_control} id='l_name' required />
					<label htmlFor='l_name' className={classes.floating_label}>
						Last Name
					</label>
				</div>
				<div className={`${classes.form_row} ${classes.phone_control}`}>
					<input type='tel' className={classes.form_control} id='phone' required />
					<label htmlFor='phone' className={classes.floating_label}>
						Phone Number
					</label>
				</div>
				<div className={`${classes.form_row} ${classes.street_control}`}>
					<input type='text' className={classes.form_control} id='street' required />
					<label htmlFor='street' className={classes.floating_label}>
						Street
					</label>
				</div>
				<div className={`${classes.form_row} ${classes.city_control}`}>
					<input type='text' className={classes.form_control} id='city' required />
					<label htmlFor='city' className={classes.floating_label}>
						City
					</label>
				</div>
				<div className={`${classes.form_row} ${classes.state_control}`}>
					<div className={classes.select}>
						<select className={classes.select_text} defaultValue='' required>
							<option value='' disabled></option>
							<option value='1'>Gujarat</option>
							<option value='2'>Maharashtra</option>
							<option value='3'>Delhi</option>
						</select>
						<label className={classes.select_label}>State</label>
					</div>
				</div>
				<div className={`${classes.form_row} ${classes.zip_control}`}>
					<input type='text' className={classes.form_control} id='zip' required />
					<label htmlFor='zip' className={classes.floating_label}>
						Zipcode
					</label>
				</div>
				<div className={`${classes.form_row} ${classes.pass_control}`}>
					<input type='password' className={classes.form_control} id='pass' required />
					<label htmlFor='pass' className={classes.floating_label}>
						Password
					</label>
				</div>
				<div className={`${classes.form_row} ${classes.cpass_control}`}>
					<input type='password' className={classes.form_control} id='conf_pass' required />
					<label htmlFor='conf_pass' className={classes.floating_label}>
						Confirm Password
					</label>
				</div>
				<div className={`${classes.form_row} ${classes.submit_control}`}>
					<Link to='/'>
						<div className={classes.submit_button}>Register</div>
					</Link>
				</div>
			</form>
			<div className={classes.after_form_area}>
				<span>
					Already have an account? <Link to='/signin'>Login</Link>
				</span>
			</div>
		</AuthBase>
	);
};

export default Signup;
