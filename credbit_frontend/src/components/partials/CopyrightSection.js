import React from 'react';
import { Link } from 'react-router-dom';

const CopyrightSection = () => (
	<div className='footer-bg-bottom'>
		<div className='row'>
			<div className='col-xl-8 col-lg-8 col-md-8'>
				<div className='copyright'>
					<p>
						<i className='far fa-copyright'></i> Copyright 2019 Zekio. All rights reserved.
					</p>
				</div>
			</div>

			<div className='col-xl-4 col-lg-4 col-md-4'>
				<div className='footer-bottem-text text-md-right'>
					<p>
						Design By <Link to='#'>BDevs</Link>
					</p>
				</div>
			</div>
		</div>
	</div>
);

export default CopyrightSection;
