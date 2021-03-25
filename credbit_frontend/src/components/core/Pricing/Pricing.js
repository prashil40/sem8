import React, { useState, useEffect } from 'react';
import Header from '../../partials/Header/Header';
import Footer from '../../partials/Footer/Footer';
import classes from './Pricing.module.css';
import { Link } from 'react-router-dom';
// import LetterCard from '../../partials/LetterCard/LetterCard';
// import { getLetters } from '../helpers/LetterApiCall';
import { getPricings } from '../helpers/PricingApiCall';
import PricingCard from '../../partials/PricingCard/PricingCard';
import illustration from '../../images/undraw_server_down_s4lk.svg';

const Pricing = () => {
	const [pricings, setPricings] = useState([]);
	const [error, setError] = useState(false);

	let pricingCard = pricings.map((pricing, index) => {
		return <PricingCard key={index} pricing={pricing} pricingIndex={index}  />;
	});

	const loadAllPricings = () => {
		getPricings()
			.then((data) => {
				if (data.error) {
					setError(data.error);
					console.log(error);
				} else {
					setPricings(data);
				}
			})
			.catch((err) => {
				setError(true);
				console.log(err);
			});
	};

	useEffect(() => {
		loadAllPricings();
	}, []);
	return (
		<div>
			<Header />
			<main>
				{!error && (
					<div className={`${classes.pricing_area} pt-120`}>
						<div className={classes.container}>
							<div className='row'>{pricingCard}</div>
						</div>
					</div>
				)}
				{error && (
					<div className={classes.error_area}>
						<img src={illustration} alt='Error Illustration' />
						<span>Server Down. Try again later!</span>
					</div>
				)}
			</main>
			<Footer />
		</div>
	);
};

export default Pricing;
