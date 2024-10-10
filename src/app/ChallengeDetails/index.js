import WOW from 'wowjs';
import Grid from '@material-ui/core/Grid';
import { Button } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import VisibilitySensor from 'react-visibility-sensor';


import './index.css';
import '../../static/css/animate.css';
import 'animate.css';
import Sidebar from '../../components/sidebar';
import NavbarInner from '../../components/navbar-inner';
import { toggleLoader, challengeDetails, getUserName, fetchChipsBalanceRequest, fetchChipsBalanceSuccess, fetchChipsBalanceFailure } from "../../store/actions/Auth";


class ChallengeDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeSection: '',
            MaximumChips: '',
            MinimumChips: ''
        };
    };

    componentDidMount() {
        new WOW.WOW({
            live: true,
        }).init();

        this.props.getUserName();
    }

    handleFormChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleMultiplierClick = (multiplier) => {
        const { MinimumChips, MaximumChips } = this.state;
        this.setState({
            MinimumChips: MinimumChips * multiplier,
            MaximumChips: MaximumChips * multiplier,
        });
    }

    setVisible = (active) => {
        let { activeSection } = this.state;
        if (activeSection == active) this.setState({ activeSection: '' });
        else this.setState({ activeSection: active });
    }


    handleFormSubmit = async () => {
        const { MinimumChips, MaximumChips } = this.state;
        const { challengeDetails, toggleLoader } = this.props;

        toggleLoader(true);

        await challengeDetails({ minChipsLimit: MinimumChips, maxChipsLimit: MaximumChips });

        toggleLoader(false);

    }


    render() {
        let { loading, username, isActive, chipsBalance, chipsBalanceLoading, chipsBalanceError, } = this.props;
        let { MinimumChips, MaximumChips, activeSection } = this.state;

        let chipsBalanceContent;

        if (chipsBalanceLoading) {
            chipsBalanceContent = <p>Loading chips balance...</p>;
        } else if (chipsBalanceError) {
            chipsBalanceContent = <p>Error loading chips balance: {chipsBalanceError}</p>;
        } else {
            chipsBalanceContent = chipsBalance;
        }

        return (
            <div className={isActive ? "challenge-details-page singup-page transaction-history-page active" : "challenge-details-page singup-page transaction-history-page"}> 
                <Sidebar activeSection={activeSection}  />
                <VisibilitySensor onChange={() => this.setVisible('ChallengeDetails')}>
                    <div className="content">
                        <NavbarInner />
                        <div className="transaction-box signup-form">
                            <div className='challenge-top-area'>
                                <h2>Challenge Details</h2>
                                <p>{username}</p>
                            </div>
                            <ValidatorForm className="validatorForm" onSubmit={this.handleFormSubmit}>
                                <div className='changes-limit-box'>
                                    <h4>Challenge Limits</h4>
                                    <Grid container spacing={2} className='group-input' alignItems="flex-end">
                                        <Grid className="signup-fields" item xs={6}>
                                            <CustomTextField
                                                fullWidth
                                                className="MyTextField"
                                                placeholder="0000 Chipz"
                                                autoComplete='off'
                                                label="Maximum"
                                                name="MaximumChips"
                                                type="text"
                                                value={MaximumChips}
                                                margin="dense"
                                                onChange={this.handleFormChange}
                                                validators={['required']}
                                                errorMessages={['Maximum can not be empty']}
                                            />
                                        </Grid>
                                        <Grid className="signup-fields" item xs={6}>
                                            <CustomTextField
                                                fullWidth
                                                className="MyTextField"
                                                placeholder="0000 Chipz"
                                                autoComplete='off'
                                                label="Minimum"
                                                name="MinimumChips"
                                                type="text"
                                                value={MinimumChips}
                                                margin="dense"
                                                onChange={this.handleFormChange}
                                                validators={['required']}
                                                errorMessages={['Minimum can not be empty']}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className='amount-box'>
                                    <ul className='list-x'>
                                        <li><button type="button" onClick={() => this.handleMultiplierClick(5)}>5x</button></li>
                                        <li><button type="button" onClick={() => this.handleMultiplierClick(10)}>10x</button></li>
                                        <li><button type="button" onClick={() => this.handleMultiplierClick(20)}>20x</button></li>
                                        <li><button type="button" onClick={() => this.handleMultiplierClick(50)}>50x</button></li>
                                        <li><button type="button" onClick={() => this.handleMultiplierClick(100)}>100x</button></li>
                                        <li><button type="button" onClick={() => this.handleMultiplierClick(250)}>250x</button></li>
                                        <li><button type="button" >other</button></li>
                                    </ul>
                                </div>
                                <div className='quantity-box'>
                                    <h2>Quantity <span>Chipz {chipsBalanceContent}</span></h2>
                                </div>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                >
                                    {!loading ? 'Done' : <i className="fa fa-spinner fa-spin fa-1x fa-fw" />}
                                </Button>
                            </ValidatorForm>

                        </div>
                    </div>
                </VisibilitySensor>
            </div>
        );
    }
}

const CustomTextField = withStyles({
    root: {
        '& .MuiInputBase-input': {
            color: '#fff', // Text color
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: '#fff', // Semi-transparent underline
        },
        '& .MuiInput-underline:hover:before': {
            borderBottomColor: '#fff', // Solid underline on hover
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#fa6634', // Solid underline on focus
        },
    },
    input: {
        '&:-webkit-autofill': {
            transitionDelay: '9999s',
            transitionProperty: 'background-color, color',
        }
    }
})(TextValidator);

const mapDispatchToProps = { toggleLoader, challengeDetails, getUserName, fetchChipsBalanceRequest, fetchChipsBalanceSuccess, fetchChipsBalanceFailure, };
const mapStateToProps = ({ Auth, Sidebar }) => {
    let { loading, username, chipsBalance, chipsBalanceLoading, chipsBalanceError } = Auth;
    let {isActive} = Sidebar;
    return { loading, username, chipsBalance, chipsBalanceLoading, chipsBalanceError, isActive };
};


export default connect(mapStateToProps, mapDispatchToProps)(ChallengeDetails);