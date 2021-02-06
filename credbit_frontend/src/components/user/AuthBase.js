import React from 'react';

const AuthBase = ({ children, classes, blob, illustration, logo, label }) => {
	return (
		<section className={classes.section}>
			<div className={classes.illustration_area}>
				<img src={blob} alt='blob' className={classes.blob} />
				<img src={illustration} alt='Illustration' />
			</div>
			<div className={classes.form_area}>
				<div className={classes.container_label}>
					<img src={logo} alt='logo' />
					<span>{label}</span>
				</div>
				<div className={classes.container}>{children}</div>
			</div>
		</section>
	);
};

export default AuthBase;
