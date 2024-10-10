import WOW from 'wowjs';
import React, { Component } from 'react';
import {
    fetchTransactionHistoryRequest, fetchTransactionHistorySuccess, fetchTransactionHistoryFailure,
    fetchChipsBalanceRequest, fetchChipsBalanceSuccess, fetchChipsBalanceFailure, getUserName
} from '../../store/actions/Auth';
import VisibilitySensor from 'react-visibility-sensor';


import './index.css';
import '../../static/css/animate.css';
import 'animate.css';

import Sidebar from '../../components/sidebar';
import NavbarInner from '../../components/navbar-inner';
import { toggleLoader } from "../../store/actions/Auth";
import { connect } from 'react-redux';


class TransactionHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeSection: '',
        };
    };

    async componentDidMount() {
        new WOW.WOW({
            live: true,
        }).init();

        this.props.fetchTransactionHistoryRequest();
        this.props.fetchChipsBalanceRequest();
        this.props.getUserName();
    }
    setVisible = (active) => {
        let { activeSection } = this.state;
        if (activeSection == active) this.setState({ activeSection: '' });
        else this.setState({ activeSection: active });
    }

    render() {
        let { transactions, transactionsLoading, transactionsError, chipsBalance, chipsBalanceLoading, chipsBalanceError, username, isActive } = this.props;
        let { activeSection } = this.state;

        transactions = transactions.filter(transaction => transaction.gameStatus !== null);
        // Calculate the last transaction result
        let lastTransaction = transactions.length > 0 ? transactions[0] : null;
        let lastTransactionResult = lastTransaction ? lastTransaction.gameStatus : null;

        // Calculate the chips balance based on the last transaction result
        let calculatedChipsBalance;
        if (lastTransactionResult === 'winner') {
            calculatedChipsBalance = `${chipsBalance - lastTransaction.challenged_amount} + ${lastTransaction.challenged_amount}`;
        } else if (lastTransactionResult === 'loser') {
            calculatedChipsBalance = `${chipsBalance + lastTransaction.challenged_amount} - ${lastTransaction.challenged_amount}`;
        } else {
            calculatedChipsBalance = chipsBalance;
        }


        let chipsBalanceContent;

        if (chipsBalanceLoading) {
            chipsBalanceContent = <p>Loading chips balance...</p>;
        } else if (chipsBalanceError) {
            chipsBalanceContent = <p>Error loading chips balance: {chipsBalanceError}</p>;
        } else {
            chipsBalanceContent = (
                <h1>
                    {chipsBalance} <span>Chipz</span>
                </h1>
            );
        }


        return (
            <div className={isActive ? "transaction-history-page singup-page active" : "transaction-history-page singup-page"}>
                <Sidebar activeSection={activeSection}  />
                <VisibilitySensor onChange={() => this.setVisible('TransactionHistory')}>
                    <div className="content">
                        <NavbarInner />
                        <div className="transaction-box">
                            <div className='transaction-top-area'>
                                <h2>Transaction history</h2>
                                <p>{username}</p>
                                <span className='max-value'>Max. Challenge: 0000 BD</span>
                            </div>
                            <div className='chiz-area'>
                                <p>{calculatedChipsBalance}</p>
                                <h1>{chipsBalanceContent} <span>Chipz</span></h1>
                            </div>
                            {transactionsLoading ? (
                                <p>Loading challenges...</p>
                            ) : transactions.length === 0 ? (
                                <p>No transactions found</p>
                            ) : transactionsError ? (
                                <p>Error loading challenges: {transactionsError}</p>
                            ) : (
                                transactions.map(transaction => (
                                    <div key={transaction.id} className='chips-box'>
                                        <div className='left-area'>
                                            <h4>{transaction.gameName} <span>{transaction.gameStatus === 'winner' ? '(won)' : '(lost)'}</span></h4>
                                            <p>{transaction.createdAt}</p>
                                        </div>
                                        <div className='right-area'>
                                            <h4 className={transaction.gameStatus === 'winner' ? 'plus-trans' : 'minus-trans'}>
                                                <i className='icon'>
                                                    <img src={require('../../static/images/loader.png')} alt='' />
                                                </i> {transaction.challenged_amount}
                                            </h4>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </VisibilitySensor>
            </div>
        );
    }
}


const mapStateToProps = ({ Auth, Sidebar }) => {
    let { transactions, transactionsLoading, transactionsError, chipsBalance, chipsBalanceLoading, chipsBalanceError, username } = Auth;
    let { isActive } = Sidebar;
    return { transactions, transactionsLoading, transactionsError, chipsBalance, chipsBalanceLoading, chipsBalanceError, username, isActive };
};

const mapDispatchToProps = {
    toggleLoader,
    fetchTransactionHistoryRequest,
    fetchTransactionHistorySuccess,
    fetchTransactionHistoryFailure,
    fetchChipsBalanceRequest,
    fetchChipsBalanceSuccess,
    fetchChipsBalanceFailure,
    getUserName
};


export default connect(mapStateToProps, mapDispatchToProps)(TransactionHistory);
