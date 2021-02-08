import React, { useState, useRef } from 'react';
import classes from './Signup.module.css';
import { Link, Redirect } from 'react-router-dom';
import AuthBase from '../AuthBase';
import { signup } from '../helpers/UserApiCalls';

import blob from '../../images/blob-2.svg';
import illustration from '../../images/undraw_subscribe_vspl.svg';
import logo from '../../images/logo_credbit.png';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RedStar = () => {
	return <span style={{ color: 'red' }}>*</span>;
};

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

const defaultValues = {
	email: '',
	first_name: '',
	middle_name: '',
	last_name: '',
	phone: '',
	street: '',
	city: '',
	state: '',
	zip_code: '',
	password: '',
	confirm_password: '',
	error: '',
	allValid: false,
	match: '',
};

const Signup = () => {
	const [values, setValues] = useState(defaultValues);
	const refForm = useRef(null);

	const {
		email,
		first_name,
		middle_name,
		last_name,
		phone,
		street,
		city,
		state,
		zip_code,
		password,
		confirm_password,
		error,
		allValid,
		match,
	} = values;

	const loadAButton = () => {
		if (!error && allValid) {
			return <Redirect to='/signin' />;
		} else
			return (
				<div className={classes.submit_button} onClick={handleSubmit}>
					Register
				</div>
			);
	};

	const makePasswordsValid = () => {
		const form = refForm.current;
		// console.log('Matched', password, confirm_password);
		form['pass'].className = classes.form_control;
		form['conf_pass'].className = classes.form_control;
		setValues({
			...values,
			// error: false,
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
				// error: true,
				match: false,
			});
		else if (!regex.test(password))
			setValues({
				...values,
				// error: true,
				match: true,
			});
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
		// else {
		// 	console.log('Not Matched');
		// 	setValues({
		// 		...values,
		// 		error: true,
		// 		match: false,
		// 	});
		// }
	};

	// Higher order func
	const handleChange = (name) => (event) => {
		setValues({
			...values,
			error: false,
			[name]: event.target.value,
		});
	};

	const validateField = (field) => {
		// const form = refForm.current;
		if (field.id === 'm_name') {
			return;
		} else if (field.id === 'pass' || field.id === 'conf_pass') {
			validatePassword(true);
			/*
			if (!regex.test(field.value) || password !== confirm_password) {
				form['pass'].className = classes.invalid_control;
				form['conf_pass'].className = classes.invalid_control;
				if (password !== confirm_password)
					setValues({
						...values,
						error: true,
						match: false,
					});
				else
					setValues({
						...values,
						error: true,
						match: true,
					});
			} else {
				form['pass'].className = classes.form_control;
				form['conf_pass'].className = classes.form_control;
				setValues({
					...values,
					error: false,
					match: true,
				});
			}*/
		} else {
			if (field.value === '') {
				if (field.id === 'state') {
					field.className = classes.invalid_select_text;
				} else {
					field.className = classes.invalid_control;
				}
				setValues({
					...values,
					error: true,
				});
			} else {
				if (field.id === 'state') field.className = classes.select_text;
				else field.className = classes.form_control;
				setValues({
					...values,
					error: false,
				});
			}
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const form = refForm.current.elements;
		Array.from(form).forEach((element) => {
			validateField(element);
		});

		// if (error === '') toast.error('Please fill up mandatory fields', options);
		if (match === false) toast.error('Password and confirm password should be same', options);
		if (!regex.test(password)) toast.error('Password should match the criteria', options);
		if(phone.length !== 10) toast.error('Phone number should contain exactly 10 digits', options);
		if(zip_code.length !== 6) toast.error('Zipcode should contain exactly 6 digits', options);
		else if (error === false && error !== '' && match === true) {
			// toast.success('All field are valid', options);
			signup(values)
				.then((data) => {
					console.log('DATA', data);
					if (data.email === email) {
						setValues({
							...defaultValues,
							allValid: true,
							error: false,
							match: true,
						});
					} else {
						setValues({
							...values,
							error: true,
						});
						for (const key in data) {
							toast.error(data[key][0], options);
						}
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return (
		<AuthBase
			classes={classes}
			blob={blob}
			illustration={illustration}
			logo={logo}
			label='REGISTER'>
			<form className={classes.form} ref={refForm}>
				<div className={`${classes.form_row} ${classes.email_control}`}>
					<input
						type='email'
						className={classes.form_control}
						id='email'
						name='email'
						value={email}
						onChange={handleChange('email')}
						required
					/>
					<label htmlFor='email' className={classes.floating_label}>
						Email <RedStar />
					</label>
				</div>
				<div className={`${classes.form_row} ${classes.fname_control}`}>
					<input
						type='text'
						className={classes.form_control}
						id='f_name'
						name='f_name'
						value={first_name}
						onChange={handleChange('first_name')}
						required
					/>
					<label htmlFor='f_name' className={classes.floating_label}>
						First Name <RedStar />
					</label>
				</div>
				<div className={`${classes.form_row} ${classes.mname_control}`}>
					<input
						type='text'
						className={classes.form_control}
						id='m_name'
						name='m_name'
						value={middle_name}
						onChange={handleChange('middle_name')}
						required
					/>
					<label htmlFor='m_name' className={classes.floating_label}>
						Middle Name
					</label>
				</div>
				<div className={`${classes.form_row} ${classes.lname_control}`}>
					<input
						type='text'
						className={classes.form_control}
						id='l_name'
						name='l_name'
						value={last_name}
						onChange={handleChange('last_name')}
						required
					/>
					<label htmlFor='l_name' className={classes.floating_label}>
						Last Name <RedStar />
					</label>
				</div>
				<div className={`${classes.form_row} ${classes.phone_control}`}>
					<input
						type='tel'
						className={classes.form_control}
						id='phone'
						name='phone'
						value={phone}
						onChange={handleChange('phone')}
						required
					/>
					<label htmlFor='phone' className={classes.floating_label}>
						Phone Number <RedStar />
					</label>
				</div>
				<div className={`${classes.form_row} ${classes.street_control}`}>
					<input
						type='text'
						className={classes.form_control}
						id='street'
						name='street'
						value={street}
						onChange={handleChange('street')}
						required
					/>
					<label htmlFor='street' className={classes.floating_label}>
						Street <RedStar />
					</label>
				</div>
				<div className={`${classes.form_row} ${classes.city_control}`}>
					<input
						type='text'
						className={classes.form_control}
						id='city'
						name='city'
						value={city}
						onChange={handleChange('city')}
						required
					/>
					<label htmlFor='city' className={classes.floating_label}>
						City <RedStar />
					</label>
				</div>
				<div className={`${classes.form_row} ${classes.state_control}`} name='select_div'>
					<div className={classes.select}>
						<select
							className={classes.select_text}
							value={state}
							id='state'
							name='state'
							onChange={handleChange('state')}
							required>
							<option value='' disabled></option>
							<option value='Gujarat'>Gujarat</option>
							<option value='Maharashtra'>Maharashtra</option>
							<option value='Delhi'>Delhi</option>
						</select>
						<label className={classes.select_label}>
							State <RedStar />
						</label>
					</div>
				</div>
				<div className={`${classes.form_row} ${classes.zip_control}`}>
					<input
						type='text'
						className={classes.form_control}
						id='zip'
						name='zip'
						value={zip_code}
						onChange={handleChange('zip_code')}
						required
					/>
					<label htmlFor='zip' className={classes.floating_label}>
						Zipcode <RedStar />
					</label>
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
						Password <RedStar />
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
						Confirm Password <RedStar />
					</label>
				</div>
				<div className={`${classes.form_row} ${classes.submit_control}`}>{loadAButton()}</div>
			</form>
			<div className={classes.after_form_area}>
				<span>
					Already have an account? <Link to='/signin'>Login</Link>
				</span>
			</div>
			<ToastContainer
			// position='bottom-right'
			// autoClose={5000}
			// hideProgressBar={false}
			// newestOnTop={false}
			// closeOnClick
			// rtl={false}
			// pauseOnFocusLoss
			// draggable
			// pauseOnHover
			/>
		</AuthBase>
	);
};

export default Signup;
