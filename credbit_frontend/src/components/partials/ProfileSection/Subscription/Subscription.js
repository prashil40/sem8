import classes from './Subscription.module.css';
import { getClientSub, getClientLetterSub } from '../../../core/helpers/SubscriptionAPICalls'
import { getPricing } from '../../../core/helpers/PricingApiCall'
import { useEffect } from 'react';
import { useState } from 'react';

const Subscription = () => {
	const [sub, setSub] = useState({});
	const [letterSub, setLetterSub] = useState({});
	const [pricing, setPricing] = useState({});
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('token')).user;
		getClientSub(user._id)
			.then(data => {
				console.log("SUB", data);
				setSub(data[0]);

				getPricing(data[0].pricing_url)
					.then(data => {
						console.log('PRICING', data);
						setPricing(data);
					})
			})
			.catch(err => console.error(err));
		
			getClientLetterSub(user.letter_sub_url)
			.then(data => {
				console.log("LETTER SUB", data);
				setLetterSub(data);
			})
			.catch(err => console.error(err));
		
	}, [])

	return (
		<div>
			<form className='changepassword-form' name='changePasswordForm' id='changePasswordForm'>
				<div className='row'>
					<div className={`${classes.col_xl_12_header} mt-30`}>
						<h3>SUBSCRIPTIONS</h3>
						<hr style={{ margin: '10px 0px' }} />
					</div>
				</div>

				<section>
					<div className={classes.subscription}>
						<div className={classes.dates}>
							<strong>
								<span>Start Date : {new Date(Date.parse(sub.period_start)).toLocaleDateString()}</span>
							</strong>
							<strong>
								<span>End Date : {new Date(Date.parse(sub.period_end)).toLocaleDateString()}</span>
							</strong>
						</div>
						<div className={classes.pricing}>
							<span><strong>₹ {pricing.amount} </strong>/ monthly</span>
						</div>
						<div className={classes.letters_remaining}>
							<span>Total Letters : {letterSub.initial_letters_count}</span>
            </div>
            <div className={classes.letters_remaining}>
              <span>Letters Remaining : {letterSub.letters_count}</span>
            </div>

            <div className={classes.deactivate_btn}>
              Deactivate
            </div>
          </div>
				</section>
			</form>
		</div>
	);
};

export default Subscription;
