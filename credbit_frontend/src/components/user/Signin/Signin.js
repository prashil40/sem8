import React, { useState } from 'react';
import classes from './Signin.module.css';
import { Link, Redirect } from 'react-router-dom';

import AuthBase from '../AuthBase';
import ButtonPreloader from '../../partials/ButtonPreloader/ButtonPreloader';

import { signin, authenticate, isAuthenticated } from '../helpers/UserApiCalls';

import blob from '../../images/blob-1.svg';
import illustration from '../../images/undraw_Mailbox_re_dvds.svg';
import logo from '../../images/logo_credbit.png';
import eye_open from '../../images/eye-open.png';
import eye_close from '../../images/eye-close.png';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signin = () => {
	const [values, setValues] = useState({
		email: 'test1@gmail.com',
		password: 'Test123456789',
		error: false,
		loading: false,
		visible: false,
	});

	const { email, password, error, loading, visible } = values;

	const loadAButton = () => {
		if (!loading)
			return (
				<div className={classes.submit_button} onClick={handleSubmit}>
					Login
				</div>
			);
		else if (loading && !error)
			return (
				<div className={classes.loading_button}>
					<ButtonPreloader />
				</div>
			);
	};

	const performRedirect = () => {
		console.log(isAuthenticated());
		if (isAuthenticated()) {
			return <Redirect to='/' />;
		}
	};

	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		setValues({
			...values,
			error: false,
			loading: true,
		});

		signin({ email, password })
			.then((data) => {
				console.log('DATA', data);
				if (data.token) {
					authenticate(data, () => {
						console.log('TOKEN ADDED');
						setValues({
							...values,
							didRedirect: true,
						});
					});
				} else {
					setValues({
						...values,
						error: true,
						msg: data.error,
						loading: false,
					});

					toast.error(data.error, {
						position: 'bottom-right',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
				}
			})
			.catch((e) => {
				setValues({
					...values,
					error: true,
					loading: false,
				});
				console.log(e);
			});
	};

	return (
		<AuthBase classes={classes} blob={blob} illustration={illustration} logo={logo} label='Login'>
			<form className={classes.form}>
				<div className={classes.form_row}>
					<input
						type='email'
						className={classes.form_control}
						id='email'
						required
						value={email}
						onChange={handleChange('email')}
					/>
					<label htmlFor='email' className={classes.floating_label}>
						Email
					</label>
				</div>
				<div className={classes.form_row}>
					<input
						type='checkbox'
						className={classes.password__visibleToggle}
						defaultChecked
						onClick={() => {
							setValues({ ...values, visible: !visible });
						}}
					/>
					<div className={`${classes.password__visibleToggle_eye} ${classes.open}`}>
						<img src={eye_open} alt='eye open' />
					</div>
					<div className={`${classes.password__visibleToggle_eye} ${classes.close}`}>
						<img src={eye_close} alt='eye close' />
					</div>
					<input
						type={visible ? 'text' : 'password'}
						className={classes.form_control}
						id='pass'
						required
						value={password}
						onChange={handleChange('password')}
					/>
					<label htmlFor='pass' className={classes.floating_label}>
						Password
					</label>
				</div>
				{/* <div className='form_row'>
					{error && (
						<div className={classes.error_msg}>
							<span>{msg}</span>
						</div>
					)}
				</div> */}
				<div className={classes.form_row}>{loadAButton()}</div>
			</form>
			<div className={classes.after_form_area}>
				<span>
					Forgot password? <Link to='/forgot'>Reset</Link>
				</span>
				<div className={classes.divider_section}>
					<hr />
					<span>or</span>
				</div>
				<span>
					Create a new account <Link to='/signup'>here</Link>
				</span>
			</div>
			<ToastContainer
				position='bottom-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			{performRedirect()}
			{/* {email}
      {password} */}
		</AuthBase>
	);
};

export default Signin;
