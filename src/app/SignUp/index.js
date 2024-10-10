import WOW from 'wowjs';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import { Button } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import EventBus from "eventing-bus";
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalHeader} from "reactstrap";
import VisibilitySensor from 'react-visibility-sensor';

import './index.css';
import '../../static/css/animate.css';
import 'animate.css';
import Sidebar from "../../components/sidebar";

import { toggleLoader, signUp } from "../../store/actions/Auth";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSection: '',
            username: '',
            email: '',
            firstname: '',
            lastname: '',
            password: '',
            confirmPassword: '',
            agreeTerms: false,
            verifyAge: false,
            istemsAndConditionsModal: false,
        };
    }

    componentDidMount() {
        new WOW.WOW({
            live: true,
        }).init();
    }
    setVisible = (active) => {
        let { activeSection } = this.state;
        if (activeSection == active) this.setState({ activeSection: '' });
        else this.setState({ activeSection: active });
    }

    // componentWillReceiveProps({ signUpSuccess }) {
    //     if (signUpSuccess) this.setState({})
    // }
    toggletemsAndConditionsModal = () => this.setState({ istemsAndConditionsModal: !this.state.istemsAndConditionsModal });

    handleCheckboxChange = (name) => {
        this.setState((prevState) => ({ [name]: !prevState[name] }));
    };

    handleFormChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleFormSubmit = async () => {
        const { username, email, firstname, lastname, password, confirmPassword, agreeTerms, verifyAge } = this.state;
        const { signUp, toggleLoader, history } = this.props;


        toggleLoader(true);

        // Check if password and confirmPassword match
        if (password !== confirmPassword) {
            EventBus.publish("error", "Password and ConfirmPassword not match");
            toggleLoader(false);
            return;
        }

        if (!agreeTerms || !verifyAge) {
            EventBus.publish("error", "Please accept our terms and conditions");
            toggleLoader(false);
            return;
        }


        // Concatenate firstname and lastname
        const fullName = `${firstname} ${lastname}`;

        let data = { username, email, password, name: fullName };
        await signUp({ data, history });

        toggleLoader(false);

    };

    render() {
        const { loading, isActive } = this.props;
        const { username, email, firstname, lastname, password, confirmPassword, agreeTerms, verifyAge, istemsAndConditionsModal, activeSection } = this.state;

        return (
            <div className={isActive ? "singup-page active" : "singup-page"}>
                <Sidebar activeSection={activeSection}  />
                <VisibilitySensor onChange={() => this.setVisible('Singup')}>
                    <div className='content'>
                        <div className="signup-form">
                            <h2>Sign up</h2>
                            <p>Already have an account? <Link className="singin-btn" to="/SignIn">Sign In</Link></p>
                            <ValidatorForm className="validatorForm" onSubmit={this.handleFormSubmit}>
                                <Grid container spacing={1} className='group-input' alignItems="flex-end">
                                    <Grid className="signup-fields" item xs={12}>
                                        <CustomTextField
                                            fullWidth
                                            className="MyTextField"
                                            placeholder="User Name"
                                            autoComplete='off'
                                            name="username"
                                            type="text"
                                            value={username}
                                            margin="dense"
                                            onChange={this.handleFormChange}
                                            validators={['required']}
                                            errorMessages={['User Name can not be empty']}
                                        />
                                    </Grid>
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
                                </Grid>
                                <Grid container spacing={2} className='group-input' alignItems="flex-end">
                                    <Grid className="signup-fields" item xs={6}>
                                        <CustomTextField
                                            fullWidth
                                            className="MyTextField"
                                            placeholder="First name"
                                            autoComplete='off'
                                            name="firstname"
                                            type="text"
                                            value={firstname}
                                            margin="dense"
                                            onChange={this.handleFormChange}
                                            validators={['required']}
                                            errorMessages={['First name can not be empty']}
                                        />
                                    </Grid>
                                    <Grid className="signup-fields" item xs={6}>
                                        <CustomTextField
                                            fullWidth
                                            className="MyTextField"
                                            placeholder="Last name"
                                            autoComplete='off'
                                            name="lastname"
                                            type="text"
                                            value={lastname}
                                            margin="dense"
                                            onChange={this.handleFormChange}
                                            validators={['required']}
                                            errorMessages={['Last name can not be empty']}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1} className='group-input' alignItems="flex-end">
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
                                    <Grid className="signup-fields" item xs={12}>
                                        <CustomTextField
                                            fullWidth
                                            className="MyTextField"
                                            placeholder=" Confirm Password"
                                            autoComplete='off'
                                            name="confirmPassword"
                                            type="password"
                                            value={confirmPassword}
                                            margin="dense"
                                            onChange={this.handleFormChange}
                                            validators={['required']}
                                            errorMessages={[' Confirm Password can not be empty']}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} className='group-input' alignItems="flex-end">
                                    <Grid className="signup-fields" item xs={6}>
                                        <Checkbox
                                            checked={agreeTerms}
                                            onChange={() => this.handleCheckboxChange("agreeTerms")}
                                        />
                                        <label>You Agree <span className='singin-btn' onClick={this.toggletemsAndConditionsModal}>Terms and Services</span></label>
                                    </Grid>
                                    <Grid className="signup-fields" item xs={6}>
                                        <Checkbox
                                            checked={verifyAge}
                                            onChange={() => this.handleCheckboxChange("verifyAge")}
                                        />
                                        <label>Please verify your age is 18</label>
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                >
                                    {!loading ? 'Sign Up' : <i className="fa fa-spinner fa-spin fa-1x fa-fw" />}
                                </Button>
                            </ValidatorForm>
                        </div>
                    </div>
                </VisibilitySensor>
                {/* --------------- temsAndConditions! Modal--------------- */}
                <Modal isOpen={istemsAndConditionsModal} toggle={this.toggletemsAndConditionsModal} className={`main-modal trems-modal`}>
                  <ModalHeader toggle={this.toggletemsAndConditionsModal}></ModalHeader>
                  <ModalBody>
                      <div className='content-area'>
                          <h2>Terms and Services</h2>
                          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                          <p>YLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                      </div>
                  </ModalBody>
              </Modal>
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

const mapDispatchToProps = { toggleLoader, signUp, };
const mapStateToProps = ({ Auth, Sidebar }) => {
    const { loading } = Auth;
    const { isActive } = Sidebar;
    return { loading, isActive };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
