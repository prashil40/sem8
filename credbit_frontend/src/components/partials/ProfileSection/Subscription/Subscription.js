import classes from './Subscription.module.css';

const Subscription = () => {
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
								<span>Start Date : 26-03-2021</span>
							</strong>
							<strong>
								<span>End Date : 26-04-2021</span>
							</strong>
						</div>
						<div className={classes.pricing}>
							<span><strong>₹ 200 </strong>/ monthly</span>
						</div>
            <div className={classes.letters_remaining}>
              <span>Letters Remaining : 17</span>
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
