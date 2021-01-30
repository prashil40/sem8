import React from 'react';
// import HeaderContacts from './HeaderContacts';
// import SocialMediaLinks from './SocialMediaLinks';
import Logo from './Logo';
import TheNavbar from './TheNavbar';

const TheHeader = () => (
	<header>
		{/* <div className='header-top-area grey-bg d-none d-md-block'>
			<div className='container'></div>
			<div className='row'>
				<div className='col-xl-8 col-lg-8 col-md-6 d-flex align-items-center'>
					<HeaderContacts />
				</div>

				<div className='col-xl-4 col-lg-4 col-md-6'>
					<div className='header-right f-right '>
						<SocialMediaLinks />
					</div>
				</div>
			</div>
		</div> */}

		<div id='sticky-header' className='main-menu-area'>
			<div className='container'>
				<div className='row'>
					<div className='col-xl-3 col-lg-3 d-flex align-items-center'>
						<Logo />
					</div>

					<div className='col-xl-9 col-lg-9'>
						<div className='main-menu text-right'>
							<TheNavbar />
						</div>
					</div>

					<div className='col-12'>
						<div className='mobile-menu'></div>
					</div>
				</div>
			</div>
		</div>
	</header>
);

export default TheHeader;
