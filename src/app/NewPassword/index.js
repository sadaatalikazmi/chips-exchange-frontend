import WOW from 'wowjs';
import Grid from '@material-ui/core/Grid';
import { Button } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import React, { Component } from 'react';
import EventBus from 'eventing-bus';
import { connect } from 'react-redux';

import './index.css';
import '../../static/css/animate.css';
import 'animate.css';

import Sidebar from '../../components/sidebar';
import { toggleLoader, NewPaswordRequest } from "../../store/actions/Auth";


class NewPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPassword: '',
            confirmNewPassword: '',
        }
    }


    componentDidMount() {
        new WOW.WOW({
            live: true,
        }).init();
    }

    handleFormChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleFormSubmit = async () => {
        const { newPassword, confirmNewPassword } = this.state;
        const { NewPaswordRequest, toggleLoader, history } = this.props;

        toggleLoader(true);

        // Check if password and confirmPassword match
        if (newPassword !== confirmNewPassword) {
            EventBus.publish("error", "Password and ConfirmPassword not match");
            toggleLoader(false);
            return;
        }

        await NewPaswordRequest({ data: { email: this.props?.location?.state?.email, newPassword }, history });

        toggleLoader(false);
    };

    render() {
        const { loading } = this.props;
        const { newPassword, confirmNewPassword } = this.state;


        return (
            <div className='singup-page'>
                <Sidebar />
                <div className='content'>
                    <div className="signup-form">
                        <h2>New Password</h2>
                        <ValidatorForm className="validatorForm" onSubmit={this.handleFormSubmit}>
                            <Grid container spacing={1} className='group-input' alignItems="flex-end">
                                <Grid className="signup-fields" item xs={12}>
                                    <CustomTextField
                                        fullWidth
                                        className="MyTextField"
                                        placeholder="Enter New Password"
                                        autoComplete='off'
                                        name="newPassword"
                                        type="password"
                                        value={newPassword}
                                        margin="dense"
                                        onChange={this.handleFormChange}
                                        validators={['required']}
                                        errorMessages={['Email address can not be empty']}
                                    />
                                </Grid>
                                <Grid className="signup-fields" item xs={12}>
                                    <CustomTextField
                                        fullWidth
                                        className="MyTextField"
                                        placeholder="Confirm New Password"
                                        autoComplete='off'
                                        name="confirmNewPassword"
                                        type="password"
                                        value={confirmNewPassword}
                                        margin="dense"
                                        onChange={this.handleFormChange}
                                        validators={['required']}
                                        errorMessages={['Password can not be empty']}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                disabled={loading}
                            >
                                {!loading ? 'Set New Password' : <i className="fa fa-spinner fa-spin fa-1x fa-fw" />}
                            </Button>
                        </ValidatorForm>
                    </div>
                </div>
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

const mapDispatchToProps = { toggleLoader, NewPaswordRequest };
const mapStateToProps = ({ Auth }) => {
    let { loading } = Auth;
    return { loading };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPassword);
