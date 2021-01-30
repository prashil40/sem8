import React from 'react';

const HeaderContacts = () => {
	return (
		<div className='header-info'>
			<span>
				<i className='far fa-map-marker-alt'> </i> 15 Hamston Street, West
			</span>
			<span className='header-ph'>
				<i className='far fa-phone'> </i> 812 (345) 6789
			</span>
			<span className='header-en'>
				<i className='far fa-envelope-open'></i> support@gmail.com
			</span>
		</div>
	);
};

export default HeaderContacts;
