import React from 'react';
import Header from '../partials/Header';
import { Link } from 'react-router-dom';
// import AboutArea from "../TheAboutArea";
// import ServiceArea from "../TheServiceArea";
import Slider from '../partials/Slider';
import Footer from '../partials/Footer';

const Home = () => {
	return (
		<div>
			<Header />
			<main>
				<Slider />
				<div>
					<div className='about-area pt-130 pb-100'>
						<div className='container'>
							<div className='row'>
								<div className='col-xl-4 col-lg-4 mb-30'>
									<div className='about-text'>
										<span>who we are</span>
										<h1>
											More than 23+ years we provide <span>IT solutions </span>
										</h1>
										<p>
											Sedut perspiciatis unde omnis iste natus error sitlupt tem accusantium
											doloremque laudantium totam remap eriaeaque ipsa quae ab illo inventore
											veritatis{' '}
										</p>
										<Link to='#'>Our Services</Link>
									</div>
								</div>
								<div className='col-xl-4 col-lg-4 mb-30'>
									<div className='about-img'>
										<img src='assets/img/about/about.jpg' alt='' />
									</div>
								</div>
								<div className='col-xl-4 col-lg-4 mb-30'>
									<div className='about-content'>
										<p>
											But I must explain to you how all this mistaken idea of denouncing pleasure
											and praising pain was born and I will give you a complete acount of the
											system, and expound the actual teacings of the great explorer of the truth,
											titer-builder of human happiness. No one rejects, dislikes, or avoids pleasure
											itself, because it is pleasure, but because those who do not know how to
											pursue pleasure rationally encounter
										</p>
										<div className='about-1-img'>
											<img src='assets/img/about/01.png' alt='' />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='about-area'>
						<div className='container'>
							<div className='row'>
								<div className='col-md-12'>
									<h2>The most affordable credit service solution!</h2>
								</div>
							</div>
							<div className='row'>
								<div className='col-xl-4 col-lg-4 mb-30'>
									<div className='about-img'>
										<img
											src='page/big_img/Xcel table graph996.jpeg'
											alt='Xcel table graph996.jpeg'
										/>
									</div>
								</div>
								<div className='col-xl-4 col-lg-4 mb-30'>
									<div className='about-text'>
										<p>
											Your credit score matters. We all deserve to get the things we want and need
											and we know having good&nbsp;credit helps.
										</p>
									</div>
									<div
										className='header-button d-none d-lg-block'
										// style="margin-left:0px;"
									>
										<Link className='btn' to='sign-up/'>
											<span className='btn-text'>
												Get Started <i className='far fa-long-arrow-right'></i>
											</span>{' '}
										</Link>
									</div>
								</div>
								<div className='col-xl-4 col-lg-4 mb-30'>
									<div className='about-img'>
										<img src='pageF/big_img/Xcel home photo500.png' alt='Xcel home photo500.png' />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					className='services-area pt-120 pb-100'
					// style="background-image:url(assets/img/bg/bg-1.jpg)"
				>
					<div className='container'>
						<div className='row'>
							<div className='col-xl-8 col-lg-8 offset-lg-2 offset-xl-2'>
								<div className='section-title text-center ml-50 mr-50 mb-80'>
									<span className='border-left-1'></span>
									<span>what we do</span>
									<span className='border-right-1'></span>
									<h1>We provide exclusive services for your busainess</h1>
								</div>
							</div>
						</div>
						<div className='row'>
							<div className='col-xl-4 col-lg-4 col-md-6 mb-30'>
								<div className='services-wrapper text-center'>
									<div className='services-img'>
										<img src='assets/img/icon/icon-01.png' alt='' />
									</div>
									<div className='services-text'>
										<h3>Web Development</h3>
										<p>
											It is a long established fact that a reader will be distracted by the readable
											content of a page when looking{' '}
										</p>
										<Link to='#'>
											{' '}
											<span className='services-button'>
												read more <i className='far fa-long-arrow-right'></i>
											</span>{' '}
										</Link>
									</div>
								</div>
							</div>
							<div className='col-xl-4 col-lg-4 col-md-6 mb-30'>
								<div className='services-wrapper text-center'>
									<div className='services-img'>
										<img src='assets/img/icon/icon-2.png' alt='' />
									</div>
									<div className='services-text'>
										<h3>Database Analysis</h3>
										<p>
											It is a long established fact that a reader will be distracted by the readable
											content of a page when looking{' '}
										</p>
										<Link to='#'>
											{' '}
											<span className='services-button'>
												read more <i className='far fa-long-arrow-right'></i>
											</span>{' '}
										</Link>
									</div>
								</div>
							</div>
							<div className='col-xl-4 col-lg-4 col-md-6 mb-30'>
								<div className='services-wrapper text-center'>
									<div className='services-img'>
										<img src='assets/img/icon/icon-3.png' alt='' />
									</div>
									<div className='services-text'>
										<h3>Server Security</h3>
										<p>
											It is a long established fact that a reader will be distracted by the readable
											content of a page when looking{' '}
										</p>
										<Link to='#'>
											{' '}
											<span className='services-button'>
												read more <i className='far fa-long-arrow-right'></i>
											</span>{' '}
										</Link>
									</div>
								</div>
							</div>
							<div className='col-xl-4 col-lg-4 col-md-6 mb-30'>
								<div className='services-wrapper text-center'>
									<div className='services-img'>
										<img src='assets/img/icon/icon-4.png' alt='' />
									</div>
									<div className='services-text'>
										<h3>UX/UI Strategy</h3>
										<p>
											It is a long established fact that a reader will be distracted by the readable
											content of a page when looking{' '}
										</p>
										<Link to='#'>
											{' '}
											<span className='services-button'>
												read more <i className='far fa-long-arrow-right'></i>
											</span>{' '}
										</Link>
									</div>
								</div>
							</div>
							<div className='col-xl-4 col-lg-4 col-md-6 mb-30'>
								<div className='services-wrapper text-center'>
									<div className='services-img'>
										<img src='assets/img/icon/icon-5.png' alt='' />
									</div>
									<div className='services-text'>
										<h3>Analysis For Tools</h3>
										<p>
											It is a long established fact that a reader will be distracted by the readable
											content of a page when looking{' '}
										</p>
										<Link to='#'>
											{' '}
											<span className='services-button'>
												read more <i className='far fa-long-arrow-right'></i>
											</span>{' '}
										</Link>
									</div>
								</div>
							</div>
							<div className='col-xl-4 col-lg-4 col-md-6 mb-30'>
								<div className='services-wrapper text-center'>
									<div className='services-img'>
										<img src='assets/img/icon/icon-6.png' alt='' />
									</div>
									<div className='services-text'>
										<h3>Marketing Strategy</h3>
										<p>
											It is a long established fact that a reader will be distracted by the readable
											content of a page when looking{' '}
										</p>
										<Link to='#'>
											{' '}
											<span className='services-button'>
												read more <i className='far fa-long-arrow-right'></i>
											</span>{' '}
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default Home;
