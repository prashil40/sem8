import React from 'react';

const TheNavbar = () => {
	return (
		<nav id='mobile-menu'>
			<ul>
				<li className='active'>
					<Link to='./'>How it works</Link>
				</li>
				<li>
					<Link to='./'>Pricing</Link>
				</li>
				<li>
					<Link to='./'>Letters</Link>
				</li>
				<li>
					<Link to='./'>About Us</Link>
				</li>
				<li>
					<Link to='./'>Contact Us</Link>
				</li>

				<li className='respLogin'>
					<Link to='login/'>Login</Link>
				</li>
			</ul>
		</nav>
	);
};

export default TheNavbar;
