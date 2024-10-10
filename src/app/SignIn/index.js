import WOW from 'wowjs';
import Grid from '@material-ui/core/Grid';
import { Button } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './index.css';
import '../../static/css/animate.css';
import 'animate.css';

import Sidebar from '../../components/sidebar';
import { toggleLoader, signIn } from "../../store/actions/Auth";


class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            redirectHome: false,
        };
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
        const { email, password } = this.state;
        const { signIn, toggleLoader, history } = this.props;

        toggleLoader(true);

        const data = { email, password };

        await signIn({ data, history });

        toggleLoader(false);
    };

    render() {
        const { loading, isActive } = this.props;
        const { email, password } = this.state;


        return (
            <div className={isActive ? "singup-page active" : "singup-page"}> 
                <Sidebar />
                <div className='content'>
                    <div className="signup-form">
                        <h2>Sign in</h2>
                        <ValidatorForm className="validatorForm" onSubmit={this.handleFormSubmit}>
                            <Grid container spacing={1} className='group-input' alignItems="flex-end">
                                <Grid className="signup-fields" item xs={12}>
                                    <CustomTextField
                                        fullWidth
                                        className="MyTextField"
                                        placeholder="Email address"
                                        autoComplete='off'
                                        name="email"
                                        type="email"
                                        value={email}
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
                                        placeholder="Password"
                                        autoComplete='off'
                                        name="password"
                                        type="password"
                                        value={password}
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
                                {!loading ? 'Log In' : <i className="fa fa-spinner fa-spin fa-1x fa-fw" />}
                            </Button>
                        </ValidatorForm>
                        <p className='forgetpass'><Link className="singin-btn" to="/ForgotPassword">Forgot password?</Link></p>
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

const mapDispatchToProps = { toggleLoader, signIn };
const mapStateToProps = ({ Auth, Sidebar }) => {
    let { loading } = Auth;
    let {isActive} = Sidebar;
    return { loading, isActive };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
