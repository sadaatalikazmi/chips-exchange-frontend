import WOW from 'wowjs';
import Grid from '@material-ui/core/Grid';
import { Button } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import VisibilitySensor from 'react-visibility-sensor';

import './index.css';
import '../../static/css/animate.css';
import 'animate.css';
import Sidebar from '../../components/sidebar';
import NavbarInner from '../../components/navbar-inner';
import { toggleLoader, fetchChipsBalanceRequest, fetchChipsBalanceSuccess, fetchChipsBalanceFailure } from "../../store/actions/Auth";


class ChipzBalance extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeSection: '',
            transactionMode: 'buy',
            amountType: '',
            amount: '',
            chipz: '',
            refundType: '',
        };
    };

    componentDidMount() {
        new WOW.WOW({
            live: true,
        }).init();

        this.props.fetchChipsBalanceRequest();
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.state.amountType !== prevState.amountType) {
            if (this.state.amountType !== 'other') this.setState({ amount: this.state.amountType, chipz: Math.round((this.state.amountType * (8521 / 4.5))) });
            else this.setState({ amount: '', chipz: '' });
        }
    }

    handleTabSelect = (selectedTab) => {
        if (selectedTab === 'buy') this.setState({ transactionMode: selectedTab, refundType: '' });
        else if (selectedTab === 'refund') this.setState({ transactionMode: selectedTab, amountType: '', amount: '', chipz: '' });
    };

    handleAmountTypeSelect = (selectedAmountType) => this.setState({ amountType: selectedAmountType });
    handleAmountChange = (event) => this.setState({ amount: event.target.value, chipz: Math.round((event.target.value * (8521 / 4.5))) });
    handleRefundTypeChange = (selectedRefundType) => this.setState({ refundType: selectedRefundType });

    handleBuyChipz = () => {
        if (this.state.amount === '' || this.state.amount === null || this.state.amount === undefined) toast.error('Please select amount');
        else this.props.history.push({
            pathname: '/SelectCard',
            state: {
                transactionMode: this.state.transactionMode,
                amount: this.state.amount,
            }
        });
    };

    setVisible = (active) => {
        let { activeSection } = this.state;
        if (activeSection == active) this.setState({ activeSection: '' });
        else this.setState({ activeSection: active });
    }

    handleRefundChipz = () => {
        if (this.state.refundType === '' || this.state.refundType === null || this.state.refundType === undefined) toast.error('Please select a refund type');
        else this.props.history.push({
            pathname: '/SelectCard',
            state: {
                transactionMode: this.state.transactionMode,
                refundType: this.state.refundType,
            }
        });
    };

    render() {
        let { loading, chipsBalance, chipsBalanceLoading, chipsBalanceError, isActive } = this.props;
        let { transactionMode, amountType, amount, chipz, refundType, activeSection } = this.state;

        let chipsBalanceContent;
        if (chipsBalanceLoading) chipsBalanceContent = <p>Loading chips balance...</p>;
        else if (chipsBalanceError) chipsBalanceContent = <p>Error loading chips balance: {chipsBalanceError}</p>;
        else {
            chipsBalanceContent = (
                <h1>
                    {chipsBalance} <span>Chipz</span>
                </h1>
            );
        }

        return (
            <div className={isActive ? "challenge-details-page singup-page transaction-history-page active" : "challenge-details-page singup-page transaction-history-page"}>
                <Sidebar activeSection={activeSection}  />
                <VisibilitySensor onChange={() => this.setVisible('ChipzBalance')}>
                    <div className="content">
                        <NavbarInner />
                        <div className="transaction-box signup-form">
                            <div className='challenge-top-area'>
                                <h2>Chipz Balance</h2>
                            </div>
                            <div className='balnce-box'>
                                <h1>{chipsBalanceContent}</h1>
                                <p>Giles Posture</p>
                            </div>
                            <Tabs
                                defaultActiveKey="buy"
                                id="uncontrolled-tab-example"
                                className="mb-3"
                                onSelect={this.handleTabSelect}
                            >
                                <Tab eventKey="buy" title="Buy">
                                    <div className='amount-box style-two'>
                                        <h4>Choose Amount</h4>
                                        <ul className='list-x'>
                                            <li><button className={this.state.amountType === '5' && 'active'} onClick={() => this.handleAmountTypeSelect('5')}>$5</button></li>
                                            <li><button className={this.state.amountType === '10' && 'active'} onClick={() => this.handleAmountTypeSelect('10')}>$10</button></li>
                                            <li><button className={this.state.amountType === '20' && 'active'} onClick={() => this.handleAmountTypeSelect('20')}>$20</button></li>
                                            <li><button className={this.state.amountType === '50' && 'active'} onClick={() => this.handleAmountTypeSelect('50')}>$50</button></li>
                                            <li><button className={this.state.amountType === '100' && 'active'} onClick={() => this.handleAmountTypeSelect('100')}>$100</button></li>
                                            <li><button className={this.state.amountType === '250' && 'active'} onClick={() => this.handleAmountTypeSelect('250')}>$250</button></li>
                                            <li><button className={this.state.amountType === 'other' && 'active'} onClick={() => this.handleAmountTypeSelect('other')}>Other</button></li>
                                        </ul>
                                        <ValidatorForm className="validatorForm">
                                            <Grid container spacing={1} className='group-input' alignItems="flex-end">
                                                <Grid className="signup-fields" item xs={12}>
                                                    <CustomTextField
                                                        fullWidth
                                                        className="MyTextField"
                                                        placeholder="Minimum 5 Chips"
                                                        autoComplete='off'
                                                        disabled={this.state.amountType !== 'other'}
                                                        // label="Maximum"
                                                        name="amount"
                                                        type='number'
                                                        value={this.state.amountType === 'other' && this.state.amount}
                                                        margin="dense"
                                                        onChange={(event) => this.handleAmountChange(event)}
                                                        // validators={['required']}
                                                        errorMessages={['Maximum can not be empty']}
                                                    />
                                                    <span>USD $</span>
                                                </Grid>
                                            </Grid>
                                            <p>~ {this.state.chipz !== '' ? this.state.chipz : '0'} Bodega Chipz`</p>

                                            <Button
                                                type="submit"
                                                disabled={loading}
                                                onClick={() => this.handleBuyChipz()}
                                            >
                                                {!loading ? 'Buy chipz' : <i className="fa fa-spinner fa-spin fa-1x fa-fw" />}
                                            </Button>
                                        </ValidatorForm>
                                    </div>
                                </Tab>
                                <Tab eventKey="refund" title="Refund">
                                    <div className='amount-box style-two'>
                                        <div className='btns-group'>
                                            <button
                                                className={`refund-btn ${this.state.refundType === 'partial' ? 'active' : ''}`}
                                                onClick={() => this.setState({ refundType: 'partial' })}
                                            >
                                                <i>Refund 50%</i>
                                                <span>$0,00</span>
                                            </button>
                                            <button
                                                className={`refund-btn ${this.state.refundType === 'full' ? 'active' : ''}`}
                                                onClick={() => this.setState({ refundType: 'full' })}
                                            >
                                                <i>Refund 100%</i>
                                                <span>$0,00</span>
                                            </button>
                                        </div>
                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            onClick={() => this.handleRefundChipz()}
                                        >
                                            {!loading ? 'REFUND CHIPZ' : <i className="fa fa-spinner fa-spin fa-1x fa-fw" />}
                                        </Button>
                                    </div>
                                </Tab>
                            </Tabs>

                        </div >
                    </div >
                </VisibilitySensor>
            </div >
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

const mapDispatchToProps = { toggleLoader, fetchChipsBalanceRequest, fetchChipsBalanceSuccess, fetchChipsBalanceFailure };
const mapStateToProps = ({ Auth, Sidebar }) => {
    let { loading, chipsBalance, chipsBalanceLoading, chipsBalanceError } = Auth;
    let { isActive } = Sidebar;
    return { loading, chipsBalance, chipsBalanceLoading, chipsBalanceError, isActive };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChipzBalance);