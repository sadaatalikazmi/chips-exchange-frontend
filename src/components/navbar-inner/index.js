import EventBus from "eventing-bus";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import React, { Component } from 'react';
import { HashLink } from 'react-router-hash-link';
import { PopupButton } from '@typeform/embed-react';
import { signOut } from "../../store/actions/Auth";

import './index.css';
import { web3 } from '../../store/web3';
import { networkId } from '../../store/config';
import { signIn } from '../../store/actions/Auth';

class NavbarInner extends Component {
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
            <div className="chips-exchange-nav nav-two">
                <nav className='navbar sidenav' id="sidenav-1" data-mdb-hidden="false">
                    <div className='auto-container'>
                        <div className="inner-container">
                            <div className="row">
                                <div className='nav-links' id='navbarSupportedContent'>
                                    <div className="searchbox">
                                        {/* <Link className="btn-style-two" to="/SignUp">Sign up</Link>
                                        <Link className="btn-style-one" to="/SignIn">Sign in</Link> */}
                                        <div class="dropdown">
                                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <img src={require('../../static/images/user.png')} alt='' />

                                                <p>John D.</p>
                                            </button>
                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <a class="dropdown-item" href="/" onClick={() => this.props.signOut()}>signOut</a>
                                            </div>
                                        </div>
                                    </div>
                                </div >
                            </div >
                        </div >
                    </div >
                </nav>

            </div >
        );
    }
}

const mapDispatchToProps = {
    signOut
};

const mapStateToProps = ({ Auth }) => {
    let { } = Auth;
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(NavbarInner);