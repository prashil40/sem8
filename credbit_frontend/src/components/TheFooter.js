import React from 'react';
import TheCopyrightSection from './TheCopyrightSection';
import SocialMediaLinks from './SocialMediaLinks';

const TheFooter = () => {
	return (
		<footer>
			<div class='footer-area grey-bg pt-80 pb-30'>
				<div class='container'>
					<div class='row'>
						<div class='col-xl-3 col-lg-3 col-md-4'>
							<div class='footer-wrapper mb-30'>
								<div class='footer-logo'>
									<Link to='index.html'>
										<img src='assets/img/logo/logo.png' alt='' />
									</Link>
								</div>
								<div class='footer-text'>
									<p>
										At vero eoset accusamus et iusto odio dignissimos ducimus
										qui blpraesentium voluptatum deleniti atque corrupti quos
										dolores et quas molestias excepturi{' '}
									</p>
								</div>
								<SocialMediaLinks />
							</div>
						</div>
						<div class='col-xl-2 col-lg-2 col-md-4'>
							<div class='footer-wrapper mb-30'>
								<h4 class='footer-title'>Our Services</h4>
								<ul class='fotter-menu'>
									<li>
										<Link to='#'>User Strategy </Link>
									</li>
									<li>
										<Link to='#'>Product Designing </Link>
									</li>
									<li>
										<Link to='#'>Marketing Strategy</Link>
									</li>
									<li>
										<Link to='#'>IT Consultancy</Link>
									</li>
									<li>
										<Link to='#'>Server Security</Link>
									</li>
									<li>
										<Link to='#'>Product Marketing</Link>
									</li>
								</ul>
							</div>
						</div>
						<div class='col-xl-2 col-lg-2 col-md-4'>
							<div class='footer-wrapper mb-30'>
								<h4 class='footer-title'>Quick Links</h4>
								<ul class='fotter-menu'>
									<li>
										<Link to='#'>About Us</Link>
									</li>
									<li>
										<Link to='#'>Need Link Consultant?</Link>
									</li>
									<li>
										<Link to='#'>Our Services</Link>
									</li>
									<li>
										<Link to='#'>Have Any Questions?</Link>
									</li>
									<li>
										<Link to='#'>Meet Our Team</Link>
									</li>
									<li>
										<Link to='#'>Contact Us</Link>
									</li>
								</ul>
							</div>
						</div>
						<div class='col-xl-2 col-lg-2 col-md-6'>
							<div class='footer-wrapper mb-30'>
								<h4 class='footer-title'>Contact Us</h4>
								<div class='footer-info'>
									<p>But I must explain to you how all this mistaken</p>
								</div>
								<ul class='contact-link'>
									<li>
										<div class='contact-address-icon'>
											<i class='far fa-phone'></i>
										</div>
										<div class='contact-address-text'>
											<h4>+812 (345) 778 88</h4>
										</div>
									</li>
									<li>
										<div class='contact-address-icon'>
											<i class='far fa-envelope-open'></i>
										</div>
										<div class='contact-address-text'>
											<h4>support@gmail.com</h4>
										</div>
									</li>
									<li>
										<div class='contact-address-icon'>
											<i class='far fa-map-marker-alt'></i>
										</div>
										<div class='contact-address-text'>
											<h4>227 Marion Street, Columbia</h4>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div class='footer-bottom-area pt-50'>
					<div class='container'>
						<TheCopyrightSection />
					</div>
				</div>
			</div>
		</footer>
	);
};

export default TheFooter;
