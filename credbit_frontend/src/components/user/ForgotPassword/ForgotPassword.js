import React, { useState } from 'react';
import classes from './ForgotPassword.module.css';
// import { Link } from 'react-router-dom';
import ButtonPreloader from '../../partials/ButtonPreloader/ButtonPreloader';
import AuthBase from '../AuthBase';

import { checkEmailValidity, updateClientInfo } from '../helpers/UserApiCalls';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from 'emailjs-com';

import blob from '../../images/blob-3.svg';
import illustration from '../../images/undraw_my_password_d6kg.svg';
import logo from '../../images/logo_credbit.png';

const options = {
	position: 'bottom-right',
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
};

const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const loadAButton = () => {
		if (!loading)
			return (
				<div className={classes.submit_button} onClick={handleSubmit}>
					Send Email
				</div>
			);
		else if (loading && !error)
			return (
				<div className={classes.loading_button}>
					<ButtonPreloader />
				</div>
			);
	};

	const showError = (err) => {
		setLoading(false);
		setError(true);
		console.log('ERR', err);
		toast.error(err, options);
	};

	const sendEmail = async (email, code) => {
		const reset_button = `<a href="http://localhost:3000/reset/${code}" style="background: #2d4390; border: 1px solid #2d4390; text-decoration: none !important; font-weight: 500; margin-top: 35px; color: #fff; text-transform: uppercase; font-size: 14px; padding: 10px 24px; display: inline-block; border-radius: 50px; cursor: pointer;" target="_blank" rel="noopener"> Reset Password</a>`;

		await emailjs
			.send(
				'service_5urr3fv',
				'template_38mh53q',
				{
					button: reset_button,
					user_email: email,
				},
				'user_Mha9ZCJVAxVI1Om3hrTGh'
			)
			.then(
				(result) => {
					console.log(result.text);
					toast.success('Please check your inbox', options);
					setLoading(false);
					setError(false);
				},
				(error) => {
					console.log('ERROR', error.text);
					showError("Couldn't send email. Try again later");
				}
			);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (email === '') {
			toast.error('Please enter an Email', options);
			return;
		}

		setLoading(true);
		setError(false);
		checkEmailValidity(email)
			.then((data) => {
				// ------------If there is some issue with Email----------------
				if (data.error) {
					showError(data.error);
				} else if (data.email === email) {
					// -----------------If Email is verified------------------

					if (typeof window !== undefined) {
						localStorage.setItem('email', email);
					}

					// Generate a 6 alphanumeric digits code
					const code = (
						Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5)
					).toUpperCase();

					// ---------------If URL exists----------------
					if (data.url) {
						// -------------Send code to backend---------------
						updateClientInfo({ security_code: code }, data.url)
							.then(async (data) => {
								// --------------If code is saved successfully, send an Email ---------------
								if (data.email) {
									// console.log('SUCCESS', data);
									sendEmail(data.email, data.security_code);
								} else if (data.error) {
									showError(data.error);
								}
							})
							.catch((err) => {
								showError(err);
							});
					} else {
						// ---------------Save code to local storage---------------
						if (typeof window !== undefined) {
							localStorage.setItem('security_code', code);
						}

						// --------------If code is saved successfully, send an Email ---------------
						if (data.email) {
							// console.log('SUCCESS', data);
							sendEmail(data.email, code);
						}
					}
				} else {
					showError('Something went wrong! Try again later');
				}
			})
			.catch((err) => {
				showError(err);
			});
	};

	return (
		<AuthBase
			classes={classes}
			blob={blob}
			illustration={illustration}
			logo={logo}
			label='Forgot Password'>
			<form className={classes.form}>
				<div className={classes.form_row}>
					<p>Please enter a registered Email</p>
				</div>
				<div className={classes.form_row}>
					<input
						type='email'
						className={classes.form_control}
						id='email'
						value={email}
						onChange={(event) => {
							setEmail(event.target.value);
						}}
						required
					/>
					<label htmlFor='email' className={classes.floating_label}>
						Email
					</label>
				</div>
				<div className={classes.form_row}>{loadAButton()}</div>
			</form>
			<ToastContainer />
		</AuthBase>
	);
};

export default ForgotPassword;
