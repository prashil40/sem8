import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import classes from './Navbar.module.css';
import { isAuthenticated, signout } from '../../user/helpers/UserApiCalls';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const currentTab = (history, path) => {
	if (history.location.pathname === path) {
		return classes.active_link;
	} else {
		return classes.link;
	}
};

const Navbar = ({ history, path }) => {
	const loadALink = () => {
		if (!isAuthenticated()) {
			return (
				<Link className={classes.link} to='/signin'>
					Login
				</Link>
			);
		} else {
			return (
				<Link
					to={'/'}
					className={classes.link}
					onClick={() => {
						signout(() => {
							history.push('/');
						}).catch((err) => {
							toast.error(err, {
								position: 'bottom-right',
								autoClose: 5000,
								hideProgressBar: false,
								closeOnClick: true,
								pauseOnHover: true,
								draggable: true,
								progress: undefined,
							});
						});
					}}>
					Logout
				</Link>
			);
		}
	};

	return (
		<>
			<nav className={classes.navbar}>
				<ul className={classes.unordered_list}>
					<li className={`${classes.list_item} ${classes.nav_item}`}>
						<Link className={currentTab(history, '/working')} to='/'>
							How it works
						</Link>
					</li>
					<li className={`${classes.list_item} ${classes.nav_item}`}>
						<Link className={currentTab(history, '/pricing')} to='/'>
							Pricing
						</Link>
					</li>
					<li className={`${classes.list_item} ${classes.nav_item}`}>
						<Link className={currentTab(history, '/letters')} to='/'>
							Letters
						</Link>
					</li>
					<li className={`${classes.list_item} ${classes.nav_item}`}>
						<Link className={currentTab(history, '/about')} to='/'>
							About Us
						</Link>
					</li>
					<li className={`${classes.list_item} ${classes.nav_item}`}>
						<Link className={currentTab(history, '/contact')} to='/'>
							Contact Us
						</Link>
					</li>

					<li className={`${classes.list_item} ${classes.button}`}>{loadALink()}</li>
				</ul>
			</nav>
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
		</>
	);
};

export default withRouter(Navbar);
