import WOW from 'wowjs';
import Slider from "react-slick";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import Marquee from "react-fast-marquee";
import Typewriter from 'typewriter-effect';
import CountUp, { startAnimation } from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
import { Modal, ModalBody, ModalHeader} from "reactstrap";

import './index.css';
import '../../static/css/animate.css';
import 'animate.css';
import 'owl.carousel/dist/assets/owl.carousel.css';

import Preloader from '../../components/preloader';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { toggleLoader } from "../../store/actions/Auth";


class ChipsExchange extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeSection: '',
            isPrototype: true,
            isLoaded: true,
            sticky: false,
            isActiveMenu: 'machine',
            address: localStorage.getItem('publicAddress'),
           
        };
    };

    componentDidMount() {
        let images = document.getElementsByTagName("img");
        let loaded = images.length;

        for (var i = 0; i < images.length; i++) {
            if (images[i].complete) {
                loaded--;
            }
            else {
                images[i].addEventListener("load", () => {
                    loaded--;
                    if (loaded == 0) setTimeout(() => this.setState({ isLoaded: false }), 1000);
                });
            }
            if (loaded == 0) setTimeout(() => this.setState({ isLoaded: false }), 1000);
        }
        new WOW.WOW({
            live: true,
        }).init();
    }

    onScroll = () => {
        const { pageYOffset } = window;
        if (pageYOffset > 20) this.setState({ sticky: true });
        if (pageYOffset < 20) this.setState({ sticky: false });
    };

    setVisible = (active) => {
        let { activeSection } = this.state;
        if (activeSection == active) this.setState({ activeSection: '' });
        else this.setState({ activeSection: active });
    }

    render() {

        let { isLoaded, activeSection, sticky} = this.state;

        return (
            <div className='chips-exchange-page' onWheel={this.onScroll}>
                {isLoaded && <Preloader />}
                <div>
                    <Navbar sticky={sticky} {...this.props} activeSection={activeSection}  />
                    {/* Banner Section */}
                    <VisibilitySensor onChange={() => this.setVisible('Banner')}>
                        <section className='banner-sec' id='home'>
                            <div className="auto-container">
                                <div className='row'>
                                    <div className='col-lg-7 col-md-12'>
                                        <div className='text-box-banner'>
                                            <h1><span className='blue-text'>Trade</span> Chipz <br /> with <span className='blue-text'>Trusted</span> Platform</h1>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br /> Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                        </div>
                                    </div>
                                    <div className='col-lg-5 col-md-12'>
                                        <div className='img-box-banner'>
                                            <img src={require('../../static/images/background-banner.png')} alt='' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </VisibilitySensor>

                    <VisibilitySensor onChange={() => this.setVisible('Services')}>
                        <section className='whyus-sec' id='services'>
                            <div className="auto-container">
                                <div className='row'>
                                    <div className='col-lg-4 col-md-12'>
                                        <div className='sec-title'>
                                            <h5>Why Us</h5>
                                            <h2>Trusted Service </h2>
                                        </div>
                                    </div>
                                    <div className='col-lg-8 col-md-12'>
                                        <div className="counter-box">
                                            <div className="counter-inner">
                                                <div className='counter-start' >
                                                    <CountUp end={32} redraw={true}>
                                                        {({ countUpRef, start }) => (
                                                            <VisibilitySensor onChange={start} delayedCall>
                                                                <span className='CountUp' ref={countUpRef} />
                                                            </VisibilitySensor>
                                                        )}
                                                        <i>+</i>
                                                    </CountUp>
                                                </div>
                                                <p>Years Esperience</p>
                                            </div>
                                            <div className="counter-inner">
                                                <div className='counter-start' >
                                                    <CountUp end={249} redraw={true}>
                                                        {({ countUpRef, start }) => (
                                                            <VisibilitySensor onChange={start} delayedCall>
                                                                <span className='CountUp' ref={countUpRef} />
                                                            </VisibilitySensor>
                                                        )}
                                                    </CountUp>
                                                    <i>+</i>
                                                </div>
                                                <p>Professional Team</p>
                                            </div>
                                            <div className="counter-inner">
                                                <div className='counter-start' >
                                                    <CountUp end={2649} redraw={true}>
                                                        {({ countUpRef, start }) => (
                                                            <VisibilitySensor onChange={start} delayedCall>
                                                                <span className='CountUp' ref={countUpRef} />
                                                            </VisibilitySensor>
                                                        )}
                                                    </CountUp>
                                                    <i>+</i>
                                                </div>
                                                <p>Client Satisfication</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-6 col-md-12'>
                                        <div className='img-box'>
                                            <img src={require('../../static/images/why-us-img.png')} alt='' />
                                        </div>
                                    </div>
                                    <div className='col-lg-6 col-md-12'>
                                        <div className='text-box'>
                                            <div className='row'>
                                                <div className='col-lg-6 col-md-6 col-ms-12'>
                                                    <div className='experince-block'>
                                                        <div className='img-box'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="37" height="46" viewBox="0 0 37 46" fill="none">
                                                                <path d="M22.8333 2H6.16667C5.0616 2 4.00179 2.43899 3.22039 3.22039C2.43899 4.00179 2 5.0616 2 6.16667V39.5C2 40.6051 2.43899 41.6649 3.22039 42.4463C4.00179 43.2277 5.0616 43.6667 6.16667 43.6667H31.1667C32.2717 43.6667 33.3315 43.2277 34.1129 42.4463C34.8943 41.6649 35.3333 40.6051 35.3333 39.5V14.5L22.8333 2Z" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                                                <path d="M22.833 2V14.5H35.333" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                                                <path d="M26.9997 24.9166H10.333" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                                                <path d="M26.9997 33.25H10.333" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                                                <path d="M14.4997 16.5833H12.4163H10.333" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                                            </svg>
                                                        </div>
                                                        <div className='text-box'>
                                                            <h4>Experienced</h4>
                                                            <p>Turpis nisl praesent tempor congue magna neque amet.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-lg-6 col-md-6 col-ms-12'>
                                                    <div className='experince-block'>
                                                        <div className='img-box'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="37" height="46" viewBox="0 0 37 46" fill="none">
                                                                <path d="M22.8333 2H6.16667C5.0616 2 4.00179 2.43899 3.22039 3.22039C2.43899 4.00179 2 5.0616 2 6.16667V39.5C2 40.6051 2.43899 41.6649 3.22039 42.4463C4.00179 43.2277 5.0616 43.6667 6.16667 43.6667H31.1667C32.2717 43.6667 33.3315 43.2277 34.1129 42.4463C34.8943 41.6649 35.3333 40.6051 35.3333 39.5V14.5L22.8333 2Z" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                                                <path d="M22.833 2V14.5H35.333" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                                                <path d="M26.9997 24.9166H10.333" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                                                <path d="M26.9997 33.25H10.333" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                                                <path d="M14.4997 16.5833H12.4163H10.333" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                                            </svg>
                                                        </div>
                                                        <div className='text-box'>
                                                            <h4>Reliable</h4>
                                                            <p>Turpis nisl praesent tempor congue magna neque amet.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-lg-6 col-md-6 col-ms-12'>
                                                    <div className='experince-block'>
                                                        <div className='img-box'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="37" height="46" viewBox="0 0 37 46" fill="none">
                                                                <path d="M22.8333 2H6.16667C5.0616 2 4.00179 2.43899 3.22039 3.22039C2.43899 4.00179 2 5.0616 2 6.16667V39.5C2 40.6051 2.43899 41.6649 3.22039 42.4463C4.00179 43.2277 5.0616 43.6667 6.16667 43.6667H31.1667C32.2717 43.6667 33.3315 43.2277 34.1129 42.4463C34.8943 41.6649 35.3333 40.6051 35.3333 39.5V14.5L22.8333 2Z" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                                                <path d="M22.833 2V14.5H35.333" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                                                <path d="M26.9997 24.9166H10.333" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                                                <path d="M26.9997 33.25H10.333" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                                                <path d="M14.4997 16.5833H12.4163H10.333" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                                            </svg>
                                                        </div>
                                                        <div className='text-box'>
                                                            <h4>Capable</h4>
                                                            <p>Turpis nisl praesent tempor congue magna neque amet.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-lg-6 col-md-6 col-ms-12'>
                                                    <div className='experince-block'>
                                                        <div className='img-box'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="37" height="46" viewBox="0 0 37 46" fill="none">
                                                                <path d="M22.8333 2H6.16667C5.0616 2 4.00179 2.43899 3.22039 3.22039C2.43899 4.00179 2 5.0616 2 6.16667V39.5C2 40.6051 2.43899 41.6649 3.22039 42.4463C4.00179 43.2277 5.0616 43.6667 6.16667 43.6667H31.1667C32.2717 43.6667 33.3315 43.2277 34.1129 42.4463C34.8943 41.6649 35.3333 40.6051 35.3333 39.5V14.5L22.8333 2Z" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                                                <path d="M22.833 2V14.5H35.333" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                                                <path d="M26.9997 24.9166H10.333" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                                                <path d="M26.9997 33.25H10.333" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                                                <path d="M14.4997 16.5833H12.4163H10.333" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                                            </svg>
                                                        </div>
                                                        <div className='text-box'>
                                                            <h4>Flexible</h4>
                                                            <p>Turpis nisl praesent tempor congue magna neque amet.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </section>
                    </VisibilitySensor>

                    <VisibilitySensor onChange={() => this.setVisible('FAQs')}>
                        <section className='faqs-sec' id='faqs'>
                            <div className="auto-container">
                                <div className='row'>
                                    <div className='col-12'>
                                        <div className='sec-title'>
                                            <h5>FAQ</h5>
                                            <h2>Frequently Asked Question</h2>
                                        </div>
                                        <div class="tab-content" id="v-pills-tabContent">
                                            <div class="tab-pane fade show active p-5" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                                <div id="accordion">
                                                    <div class="card">
                                                        <div class="card-header" id="headingOne">
                                                            <h5 class="mb-0">
                                                                <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                                                What Areas Does Ploombr Service?
                                                                </button>
                                                            </h5>
                                                        </div>
                                                        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                                            <div class="card-body">
                                                                Sem morbi netus mauris purus eros blandit tristique at maecenas. Eu tellus enim cursus lectus nunc.Sem morbi netus mauris purus eros blandit tristique at maecenas. Eu tellus enim cursus lectus nunc.
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="card">
                                                        <div class="card-header" id="headingTwo">
                                                            <h5 class="mb-0">
                                                                <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                                So What Types of Services Does Ploombr Offer?
                                                                </button>
                                                            </h5>
                                                        </div>
                                                        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                                            <div class="card-body">
                                                            Sem morbi netus mauris purus eros blandit tristique at maecenas. Eu tellus enim cursus lectus nunc.Sem morbi netus mauris purus eros blandit tristique at maecenas. Eu tellus enim cursus lectus nunc.
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="card">
                                                        <div class="card-header" id="headingThree">
                                                            <h5 class="mb-0">
                                                                <button class="blue btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                                How to Change my Plans?
                                                                </button>
                                                            </h5>
                                                        </div>
                                                        <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                                                            <div class="card-body">
                                                            Sem morbi netus mauris purus eros blandit tristique at maecenas. Eu tellus enim cursus lectus nunc.Sem morbi netus mauris purus eros blandit tristique at maecenas. Eu tellus enim cursus lectus nunc.
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="card">
                                                        <div class="card-header" id="headingFour">
                                                            <h5 class="mb-0">
                                                                <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                                                Can I Get an Invoice for my Order?
                                                                </button>
                                                            </h5>
                                                        </div>
                                                        <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordion">
                                                            <div class="card-body">
                                                            Sem morbi netus mauris purus eros blandit tristique at maecenas. Eu tellus enim cursus lectus nunc.Sem morbi netus mauris purus eros blandit tristique at maecenas. Eu tellus enim cursus lectus nunc.
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </VisibilitySensor>
                </div>
            </div >
        );
    }
}

const mapDispatchToProps = { toggleLoader };

const mapStateToProps = ({ Auth }) => {
    let { publicAddress } = Auth;
    return { publicAddress }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChipsExchange);