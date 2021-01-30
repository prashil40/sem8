import React from 'react';
import { Link } from 'react-router-dom';

const SocialMediaLinks = () => (
	<div className='footer-icon'>
		<Link to='#'>
			<i className='fab fa-facebook-f'></i>
		</Link>

		<Link to='#'>
			<i className='fab fa-twitter'></i>
		</Link>

		<Link to='#'>
			<i className='fab fa-instagram'></i>
		</Link>

		<Link to='#'>
			<i className='fab fa-youtube'></i>
		</Link>
	</div>
);

export default SocialMediaLinks;
