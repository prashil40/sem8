import classes from './MyProfile.module.css';
import React, { useState, useEffect } from 'react';

const MyProfile = () => {
	const [values, setValues] = useState({});

	useEffect(() => {
		if (typeof window !== undefined) {
			let data = JSON.parse(localStorage.getItem('token')).user;
			setValues(data);
		}
	}, []);

	const getUserDetails = () => {};
	return (
		<div className='appointment-wrapper contact-form-page'>
			<form className='appointment-form' name='profileForm' id='profileForm'>
				<div className='row desktop'>
					<div className={`${classes.col_xl_12_header} mt-30`}>
						<h3>PROFILE</h3>
						<hr style={{ margin: '10px 0px' }} />
					</div>
					<div className={classes.col_xl_12}>
						<div className={`${classes.col_xl_8}`}>
							<div className={`${classes.form_box} email-icon mb-30`}>
								{/* <input
                  style={{ width: '100%' }}
                  className={classes.text_input}
                  type="hidden"
                  name="client_id"
                  placeholder="Client ID"
                  defaultValue="2"
                /> */}
								<label className={classes.label}>Email</label>
								<input
									style={{ width: '100%' }}
									className={classes.form_control}
									id='email'
									type='email'
									// className="emailbox"
									name='client_email'
									placeholder='Email Here'
									autocomplete='off'
									required
									disabled={true}
									defaultValue={values.email}
								/>
							</div>
						</div>
					</div>
					<div className={`${classes.col_xl_12} d-flex`}>
						<div className={classes.col_xl_4}>
							<div className={`${classes.form_box} user-icon mb-30`}>
								<label className={classes.label}>First name</label>
								<input
									style={{ width: '100%' }}
									className={classes.form_control}
									id='firstName'
									type='text'
									name='client_fname'
									placeholder='First Name'
									defaultValue={values.first_name}
									required
								/>
							</div>
						</div>
						<div className={classes.col_xl_4}>
							<div className={`${classes.form_box} user-icon mb-30`}>
								<label className={classes.label}>Middle name</label>
								<input
									id='middleName'
									style={{ width: '100%' }}
									className={classes.form_control}
									type='text'
									name='client_mname'
									placeholder='Middle Name(Optional)'
									defaultValue={values.middle_name}
								/>
							</div>
						</div>
						<div className={classes.col_xl_4}>
							<div className={`${classes.form_box} user-icon mb-30`}>
								<label className={classes.label}>Last name</label>
								<input
									id='lastName'
									style={{ width: '100%' }}
									className={classes.form_control}
									type='text'
									name='client_lname'
									placeholder='Last Name'
									defaultValue={values.last_name}
									required
								/>
							</div>
						</div>
					</div>
					<div className={classes.col_xl_12}>
						<div className={classes.col_xl_4}>
							<div className={`${classes.form_box} phone-icon mb-30`}>
								<label className={classes.label}>Phone Number</label>
								<input
									id='phone'
									style={{ width: '100%' }}
									className={classes.form_control}
									type='tel'
									name='client_mob_number'
									placeholder='Phone Number'
									defaultValue={values.phone}
									required
								/>
							</div>
						</div>
					</div>
					<div className={classes.col_xl_12}>
						<div className={classes.col_xl_12}>
							<div className={`${classes.form_box} message-icon mb-30`}>
								<label className={classes.label}>Address</label>
								<input
									id='address'
									style={{ width: '100%' }}
									className={classes.form_control}
									type='text'
									name='street_address'
									placeholder='Street Address'
									defaultValue={values.street}
									required
								/>
							</div>
						</div>
					</div>
					<div className={`${classes.col_xl_12} d-flex`}>
						<div className={classes.col_xl_4}>
							<div className={`${classes.form_box} message-icon mb-30`}>
								<label className={classes.label}>City</label>
								<input
									id='city'
									style={{ width: '100%' }}
									className={classes.form_control}
									type='text'
									name='client_city'
									placeholder='City'
									defaultValue={values.city}
									required
								/>
							</div>
						</div>
						<div className={classes.col_xl_4}>
							<div className={`${classes.form_box} statelist message-icon mb-30 ${classes.select}`}>
								<label className={`${classes.label} ${classes.select_label}`}>State</label>
								<select
									className={`${classes.listSelect} ${classes.select_text}`}
									name='client_state'
									id='state'>
									<option defaultValue='Gujarat'>Gujarat</option>
									<option value='Delhi'>Delhi</option>
								</select>
							</div>
						</div>
						<div className={classes.col_xl_4}>
							<div className={`${classes.form_box} message-icon mb-30`}>
								<label className={classes.label}>Zipcode</label>
								<input
									id='zipcode'
									style={{ width: '100%' }}
									className={classes.form_control}
									type='text'
									name='zip_code'
									placeholder='Zip Code'
									defaultValue={values.zip_code}
									required
								/>
							</div>
						</div>
					</div>
					<div className={classes.col_xl_12} style={{ display: 'inline-flex' }}>
						<div
							className={classes.col_xl_4}
							style={{
								'font-size': '12px',
								'text-align': 'right',
								'padding-top': '10px',
							}}>
							<label
								id='lblMsg'
								style={{
									'font-style': 'italic',
									color: 'green',
									'margin-left': '10px',
								}}></label>
						</div>
						<div className={`${classes.blue_btn}`} type='submit'>
							{/* <div
                className="btn"
                type="submit"
                style={{ padding: '10px 40px' }}
              > */}
							<span className='btn-text'>Save Changes</span>{' '}
							{/* <span className="btn-border"></span> */}
							{/* </div> */}
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default MyProfile;
