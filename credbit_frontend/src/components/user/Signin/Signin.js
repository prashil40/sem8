import React from 'react';
import classes from './Signin.module.css';
import { Link } from 'react-router-dom';
import AuthBase from '../AuthBase';

import blob from '../../images/blob-1.svg';
import illustration from '../../images/undraw_Mailbox_re_dvds.svg';
import logo from '../../images/logo_credbit.png';
import eye_open from '../../images/eye-open.png';
import eye_close from '../../images/eye-close.png';

const Signin = () => {
	return (
		<AuthBase classes={classes} blob={blob} illustration={illustration} logo={logo} label='Login'>
			<div className={classes.container}>
				<form className={classes.form}>
					<div className={classes.form_row}>
						<input type='email' className={classes.form_control} id='email' required />
						<label htmlFor='email' className={classes.floating_label}>
							Email
						</label>
					</div>
					<div className={classes.form_row}>
						<input type='checkbox' className={classes.password__visibleToggle} defaultChecked />
						<div className={`${classes.password__visibleToggle_eye} ${classes.open}`}>
							<img src={eye_open} alt='eye open' />
						</div>
						<div className={`${classes.password__visibleToggle_eye} ${classes.close}`}>
							<img src={eye_close} alt='eye close' />
						</div>
						<input type='password' className={classes.form_control} id='pass' required />
						<label htmlFor='pass' className={classes.floating_label}>
							Password
						</label>
					</div>
					<div className={classes.form_row}>
						<div className={classes.submit_button}>Login</div>
					</div>
				</form>
				<div className={classes.after_form_area}>
					<span>
						Forgot password? <Link to=''>Reset</Link>
					</span>
					<div className={classes.divider_section}>
						<hr />
						<span>or</span>
					</div>
					<span>
						Create a new account <Link to=''>here</Link>
					</span>
				</div>
			</div>
		</AuthBase>
	);
};

export default Signin;
