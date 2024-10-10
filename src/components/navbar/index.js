import EventBus from "eventing-bus";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import React, { Component } from 'react';
import { HashLink } from 'react-router-hash-link';
import { PopupButton } from '@typeform/embed-react';

import './index.css';
import { signIn } from '../../store/actions/Auth';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
    };


    render() {
        let { activeSection, sticky } = this.props;
        let { isOpen } = this.state;
        return (
            <div className={`chips-exchange-nav ${sticky && 'sticky-nav'}`}>
                <nav className='navbar navbar-expand-lg sidenav' id="sidenav-1" data-mdb-hidden="false">
                    <div className=" inner-container">
                        <Link className='navbar-brand' to='/'><img src={require('../../static/images/logo.png')} alt='' /></Link>
                        <button onClick={() => this.setState({ isOpen: true })} className='navbar-toggler' type='button' data-toggle='collapse'
                            data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false'
                            aria-label='Toggle navigation' aria-haspopup="true">
                            <i class='icon' aria-hidden='true'><img src={require('../../static/images/mobile-menu.png')} alt='' /></i>
                        </button>
                        <div className='collapse navbar-collapse nav-links' id='navbarSupportedContent'>
                            <div className="mobile-menu-logo">
                                <Link className='navbar-brand' to='/'><img src={require('../../static/images/logo.png')} alt='' /></Link>
                                <button onClick={() => this.setState({ isOpen: true })} className='navbar-toggler' type='button' data-toggle='collapse'
                                    data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false'
                                    aria-label='Toggle navigation' aria-haspopup="true">
                                    <i class='icon' aria-hidden='true'><img src={require('../../static/images/menu-close.png')} alt='' /></i>
                                </button>
                            </div>
                            <ul className='navbar-nav sidenav-menu'>
                                <li className='nav-item'>
                                    <HashLink smooth to="#home" className={`nav-link ${activeSection == 'Banner' && 'active'}`}>
                                        Home
                                    </HashLink>
                                </li>
                                <li className='nav-item'>
                                    <HashLink smooth to="#services" className={`nav-link ${activeSection == 'Services' && 'active'}`}>
                                        Services
                                    </HashLink>
                                </li>
                                <li className='nav-item'>
                                    <HashLink smooth to="#faqs" className={`nav-link ${activeSection == 'FAQs' && 'active'}`}>
                                        FAQs
                                    </HashLink>
                                </li>
                            </ul>
                            <div className="searchbox">
                                <Link className="btn-style-two" to="/SignUp">Sign up</Link>
                                <Link className="btn-style-one" to="/SignIn">Sign in</Link>
                                {/* <div class="dropdown">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <img src={require('../../static/images/user.png')} alt='' />
                                        
                                        <p>John D.</p>
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item" href="#">Logout</a>
                                    </div>
                                </div> */}
                            </div>
                        </div >
                    </div >
                </nav>

            </div >
        );
    }
}

const mapDispatchToProps = {
};

const mapStateToProps = ({ Auth }) => {
    let { } = Auth;
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);