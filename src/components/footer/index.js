import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import ReactPixel from 'react-facebook-pixel';

import './index.css';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    };

    componentDidMount() {
        const options = {
            autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
            debug: false, // enable logs
        };
        ReactPixel.init('346684867338733', options);
        ReactPixel.pageView();
    };

    

    render() {
        
        return (
            <div>

                <div className='footer-chips-exchange' id='footer-main'>
                    <div className="auto-container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col">
                                <div className="footer-widget text-center">
                                    <div className='logo-footer'>
                                        {/* <img src={require('../../static/images/footer-logo.png')} alt='' /> */}
                                    </div>
                                    {/* <p>OurStudio is a digital agency UI / UX Design and Website Development located in Ohio, United States of America</p> */}
                                    <ul className='social-footer'>
                                        <li>
                                            <a className='social-item' href="https://www.facebook.com/profile.php?id=100093437673359" target='_blank'>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="144px" height="144px"><path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z" /><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z" /></svg>
                                            </a>
                                        </li>
                                        <li>
                                            <a className='social-item' href="https://twitter.com/ChipsExchange" target='_blank'>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="144px" height="144px"><path fill="#03A9F4" d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429" /></svg>
                                            </a>
                                        </li>
                                        <li>
                                            <a className='social-item' href="https://www.linkedin.com/company/94795702" target='_blank'>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="144px" height="144px"><path fill="#0078d4" d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z" /><path d="M30,35v-9c0-1.103-0.897-2-2-2s-2,0.897-2,2v9h-6V18h6v1.027C27.04,18.359,28.252,18,29.5,18	c3.584,0,6.5,2.916,6.5,6.5V35H30z M13,35V18h2.966C14.247,18,13,16.738,13,14.999C13,13.261,14.267,12,16.011,12	c1.696,0,2.953,1.252,2.989,2.979C19,16.733,17.733,18,15.988,18H19v17H13z" opacity=".05" /><path d="M30.5,34.5V26c0-1.378-1.121-2.5-2.5-2.5s-2.5,1.122-2.5,2.5v8.5h-5v-16h5v1.534	c1.09-0.977,2.512-1.534,4-1.534c3.309,0,6,2.691,6,6v10H30.5z M13.5,34.5v-16h5v16H13.5z M15.966,17.5	c-1.429,0-2.466-1.052-2.466-2.501c0-1.448,1.056-2.499,2.511-2.499c1.436,0,2.459,1.023,2.489,2.489	c0,1.459-1.057,2.511-2.512,2.511H15.966z" opacity=".07" /><path fill="#fff" d="M14,19h4v15h-4V19z M15.988,17h-0.022C14.772,17,14,16.11,14,14.999C14,13.864,14.796,13,16.011,13	c1.217,0,1.966,0.864,1.989,1.999C18,16.11,17.228,17,15.988,17z M35,24.5c0-3.038-2.462-5.5-5.5-5.5	c-1.862,0-3.505,0.928-4.5,2.344V19h-4v15h4v-8c0-1.657,1.343-3,3-3s3,1.343,3,3v8h4C35,34,35,24.921,35,24.5z" /></svg>
                                            </a>
                                        </li>
                                        <li>
                                            <a className='social-item' href="https://www.instagram.com/ChipsExchange/" target='_blank'>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="144px" height="144px"><radialGradient id="yOrnnhliCrdS2gy~4tD8ma" cx="19.38" cy="42.035" r="44.899" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fd5" /><stop offset=".328" stop-color="#ff543f" /><stop offset=".348" stop-color="#fc5245" /><stop offset=".504" stop-color="#e64771" /><stop offset=".643" stop-color="#d53e91" /><stop offset=".761" stop-color="#cc39a4" /><stop offset=".841" stop-color="#c837ab" /></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8ma)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z" /><radialGradient id="yOrnnhliCrdS2gy~4tD8mb" cx="11.786" cy="5.54" r="29.813" gradientTransform="matrix(1 0 0 .6663 0 1.849)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4168c9" /><stop offset=".999" stop-color="#4168c9" stop-opacity="0" /></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8mb)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z" /><path fill="#fff" d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z" /><circle cx="31.5" cy="16.5" r="1.5" fill="#fff" /><path fill="#fff" d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z" /></svg>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* <div className="col-lg-2 col-md-6 col-sm-6 col">
                                <div className="footer-widget">
                                    <h4>About</h4>
                                    <ul className='links-footer'>
                                        <li><Link className='social-item' to="#">About Us</Link></li>
                                        <li><Link className='social-item' to="#">Jobs</Link></li>
                                        <li><Link className='social-item' to="#">Blog</Link></li>
                                    </ul>
                                </div>
                            </div> */}
                            {/* <div className="col-lg-2 col-md-6 col-sm-6 col">
                                <div className="footer-widget">
                                    <h4>Awesome Talents</h4>
                                    <ul className='links-footer'>
                                        <li><button className='social-item' >React JS</button></li>
                                        <li><button className='social-item' onClick={this.toggleShareModal}>Node JS</button></li>
                                        <li><button className='social-item' onClick={this.toggleShareModal}>Java</button></li>
                                        <li><button className='social-item' onClick={this.toggleShareModal}>Python</button></li>
                                        <li><button className='social-item' onClick={this.toggleShareModal}>GPT3</button></li>
                                        <li><button className='social-item' onClick={this.toggleShareModal}>AI</button></li>
                                        <li><button className='social-item' onClick={this.toggleShareModal}>Front End</button></li>
                                        <li><button className='social-item' onClick={this.toggleShareModal}>Back End</button></li>
                                        <li><button className='social-item' onClick={this.toggleShareModal}>IOS</button></li>
                                    </ul>
                                </div>
                            </div> */}

                            {/* <div className="col-lg-2 col-md-6 col-sm-6 col">
                                <div className="footer-widget">
                                    <h4>Industries</h4>
                                    <ul className='links-footer'>
                                        <li><button className='social-item'>Airline</button></li>
                                        <li><button className='social-item'>Finance</button></li>
                                        <li><button className='social-item'>Industry</button></li>
                                        <li><button className='social-item'>Automotive</button></li>
                                        <li><button className='social-item'>Healthcare</button></li>
                                    </ul>
                                </div>
                            </div> */}

                            {/* <div className="col-lg-2 col-md-6 col-sm-6 col">
                                <div className="footer-widget">
                                    <h4>Contact</h4>
                                    <ul className='links-footer'>
                                        <li><Link className='social-item' to="#">Support</Link></li>
                                    </ul>
                                </div>
                            </div> */}

                            <div className="col-12">
                                <div className='bottom-footer'>
                                    <div className='row'>
                                        <div className='col-lg-12 col-md-12 col'>
                                            <div className='left-content text-center'>
                                                <p>Copyright &#169;  Chips Exchange</p>
                                            </div>
                                        </div>
{/* 
                                        <div className='col-lg-6 col-md-6 col'>
                                            <div className='right-content'>
                                                <div class="dropdown">
                                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        EN
                                                    </button>
                                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <a class="dropdown-item" href="#">EN</a>
                                                        <a class="dropdown-item" href="#">AR</a>
                                                        <a class="dropdown-item" href="#">AUS</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="whatsapp-swipe">
                    <ul>
                        <li><a href="https://join.skype.com/invite/ySs2qnjVjkmR" target="_blank" className="skype-icon" rel="nofollow noopener"></a></li>
                        <li><a href="http://t.me/ChipsExchange" target="_blank" className="telegram-icon" rel="nofollow noopener"></a></li>
                        <li><a href="https://wa.me/14244274212" target="_blank" className="whatsapp-icon" rel="nofollow noopener"></a></li>
                    </ul>
                </div>
            </div>
            
        );
    }
}

export default Footer;