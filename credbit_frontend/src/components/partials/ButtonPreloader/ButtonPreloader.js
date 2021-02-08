import React from 'react';
import classes from './ButtonPreloader.module.css';

const ButtonPreloader = () => {
	return (
		<div className={classes.preloader}>
			<div className={classes.dots}>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>
	);
};

export default ButtonPreloader;
