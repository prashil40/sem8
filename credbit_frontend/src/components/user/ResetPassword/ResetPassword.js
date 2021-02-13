import React, { useState, useRef, useEffect } from 'react';
import classes from './ResetPassword.module.css';
import { Link, Redirect } from 'react-router-dom';

import blob from '../../images/blob-4.svg';
import illustration from '../../images/undraw_authentication_fsn5.svg';
import logo from '../../images/logo_credbit.png';

import ButtonPreloader from '../../partials/ButtonPreloader/ButtonPreloader';
import AuthBase from '../AuthBase';

import { updateClientInfo, checkEmailValidity } from '../helpers/UserApiCalls';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Password regex
const regex = new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$');

const options = {
	position: 'bottom-right',
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
};

const ResetPassword = (props) => {
	const [values, setValues] = useState({
		password: '',
		confirm_password: '',
		match: '',
		error: '',
		success: false,
		loading: '',
	});
	const refForm = useRef(null);

	let email = '';
	useEffect(() => {
		if (typeof window !== undefined) {
			email = localStorage.getItem('email');
			if (!email) showError('Link is broken! Try again');
		}
	}, []);

	const { password, confirm_password, match, error, success, loading } = values;

	const token = props.match.params.token;

	const loadAButton = () => {
		if (success) {
			return <Redirect to='/signin' />;
		} else if (loading)
			return (
				<div className={classes.loading_button}>
					<ButtonPreloader />
				</div>
			);
		else if (!loading && error) {
			return <div className={classes.failure_button}>Some error occurred</div>;
		} else
			return (
				<div className={classes.submit_button} onClick={handleSubmit}>
					Reset
				</div>
			);
	};

	const makePasswordsValid = () => {
		const form = refForm.current;
		form['pass'].className = classes.form_control;
		form['conf_pass'].className = classes.form_control;
		setValues({
			...values,
			match: true,
		});
	};

	const makePasswordsInValid = () => {
		const form = refForm.current;
		// console.log('Invalid', password, confirm_password);
		form['pass'].className = classes.invalid_control;
		form['conf_pass'].className = classes.invalid_control;
		if (password !== confirm_password)
			setValues({
				...values,
				match: false,
			});
		else if (!regex.test(password))
			setValues({
				...values,
				match: true,
			});
	};

	const showError = (err) => {
		setValues({
			...values,
			loading: false,
			error: true,
		});
		console.log('ERR', err);
		toast.error(err, options);
	};

	const validatePassword = (onSubmit) => {
		if (!onSubmit && password === '' && confirm_password === '') {
			makePasswordsValid();
			return;
		}

		if ((password !== confirm_password && confirm_password !== '') || !regex.test(password)) {
			makePasswordsInValid();
		} else if (password === confirm_password && regex.test(password)) {
			makePasswordsValid();
		}
	};

	const handleChange = (name) => (event) => {
		setValues({
			...values,
			error: false,
			[name]: event.target.value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (typeof window !== undefined) {
			email = localStorage.getItem('email');
			if (!email) showError('Link is broken! Try again');
		}

		setValues({
			...values,
			loading: true,
			error: false,
		});

		if (match === false) showError('Password and confirm password should be same');
		if (!regex.test(password)) showError('Password should match the criteria');
		else if (error === false && error !== '' && match === true) {
			checkEmailValidity(email)
				.then((data) => {
					if (data.error) {
						showError(data.error);
					} else {
						if (data.email !== email || data.security_code !== token) {
							showError('Link is broken! Try again');
						}

						// -----------------Remove email from local storage and Reset the security code so user cannot reuse the link again ---------------------
						localStorage.removeItem('email');
						updateClientInfo({ password, security_code: '' }, data.url)
							.then((data) => {
								if (data.error) {
									showError(data.error);
								} else {
									setValues({
										...values,
										error: false,
										loading: false,
										success: true,
									});
								}
							})
							.catch((err) => showError(err));
					}
				})
				.catch((err) => showError(err));

			// setValues({
			// 	...values,
			// 	loading: false,
			// 	error: false,
			// });
		}
	};

	return (
		<AuthBase
			classes={classes}
			blob={blob}
			illustration={illustration}
			logo={logo}
			label='Reset Password'>
			<form className={classes.form} ref={refForm}>
				<div className={classes.form_row}>
					<p>Enter a new password</p>
				</div>
				<div className={`${classes.form_row} ${classes.pass_control}`}>
					<input
						type='password'
						title='Password should match criteria'
						className={classes.form_control}
						id='pass'
						name='pass'
						value={password}
						onChange={handleChange('password')}
						onBlur={() => validatePassword(false)}
						required
					/>
					<div className={classes.tool_tip}>
						<i className={classes.tool_tip_icon}>i</i>
						<p className={classes.tool_tip_info}>
							<span className={classes.info}>
								<span className={classes.info_title}>- Atleast 8 characters</span>
							</span>
							<span>
								<span className={classes.info_title}>
									- Must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
								</span>
							</span>
							<br />
							<span>
								<span className={classes.info_title}>- Can contain special characters</span>
							</span>
						</p>
					</div>
					<label htmlFor='pass' className={classes.floating_label}>
						Password
					</label>
				</div>
				<div
					className={`
					${classes.form_row} 
					${classes.cpass_control}`}>
					<input
						type='password'
						className={classes.form_control}
						id='conf_pass'
						name='conf_pass'
						value={confirm_password}
						onChange={handleChange('confirm_password')}
						onBlur={() => validatePassword(false)}
						required
					/>
					<label htmlFor='conf_pass' className={classes.floating_label}>
						Confirm Password
					</label>
				</div>
				<div className={classes.form_row}>{loadAButton()}</div>
			</form>
			<ToastContainer />
		</AuthBase>
	);
};

export default ResetPassword;
