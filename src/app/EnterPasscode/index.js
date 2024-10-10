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
import { toggleLoader, enterPasscodeRequest } from "../../store/actions/Auth";


class EnterPasscode extends Component {

  constructor(props) {
    console.log("***props ", props);
    super(props);
    this.state = {
      digit1: '',
      digit2: '',
      digit3: '',
      digit4: '',
    };
  };

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
    console.log("***here", this.props?.location?.state?.email);
    const { digit1, digit2, digit3, digit4 } = this.state;
    const { enterPasscodeRequest, toggleLoader, history } = this.props;

    // Concatenate firstname and lastname
    const passcode = `${digit1}${digit2}${digit3}${digit4}`;

    toggleLoader(true);

    await enterPasscodeRequest({ data: { passcode, email: this.props?.location?.state?.email }, history });

    toggleLoader(false);
  };

  handleInput = (event, nextField) => {
    const value = event.target.value;
    if (value && nextField) {
      document.getElementsByName(nextField)[0].focus();
    }
  };



  render() {
    let { loading, isActive } = this.props;
    let { digit1, digit2, digit3, digit4 } = this.state;

    return (
      <div className={isActive ? "singup-page active" : "singup-page"}>
        <Sidebar />
        <div className='content'>
          <div className="signup-form">
            <h2>Enter your passcode</h2>
            <p>We’ve sent the code to your registered email. </p>
            <div className='img-area'>
              <img src={require('../../static/images/passcode-img.png')} alt='' />
            </div>

            <ValidatorForm className="validatorForm" onSubmit={this.handleFormSubmit}>
              <Grid container spacing={1} className='group-input' alignItems="flex-end">
                <Grid className="signup-fields passcode-fields" item xs={12}>

                  <CustomTextField
                    fullWidth
                    className="MyTextField"
                    placeholder=""
                    autoComplete='off'
                    name="digit1"
                    type="number"
                    value={digit1}
                    margin="dense"
                    onChange={this.handleFormChange}
                    onInput={(e) => this.handleInput(e, 'digit2')}
                    validators={['required']}
                    errorMessages={['Pass code can not be empty']}
                    maxLength="1"
                  />
                  <CustomTextField
                    fullWidth
                    className="MyTextField"
                    placeholder=""
                    autoComplete='off'
                    name="digit2"
                    type="number"
                    value={digit2}
                    margin="dense"
                    onChange={this.handleFormChange}
                    onInput={(e) => this.handleInput(e, 'digit3')}
                    validators={['required']}
                    errorMessages={['Pass code can not be empty']}
                    maxLength="1"
                  />
                  <CustomTextField
                    fullWidth
                    className="MyTextField"
                    placeholder=""
                    autoComplete='off'
                    name="digit3"
                    type="number"
                    value={digit3}
                    margin="dense"
                    onChange={this.handleFormChange}
                    onInput={(e) => this.handleInput(e, 'digit4')}
                    validators={['required']}
                    errorMessages={['Pass code can not be empty']}
                    maxLength="1"
                  />
                  <CustomTextField
                    fullWidth
                    className="MyTextField"
                    placeholder=""
                    autoComplete='off'
                    name="digit4"
                    type="text"
                    value={digit4}
                    margin="dense"
                    onChange={this.handleFormChange}
                    validators={['required']}
                    errorMessages={['Pass code can not be empty']}
                    maxLength="1"
                  />

                </Grid>
              </Grid>
              <p className='recive-code-text'>Didn’t receive code? <Link className='recive-code' to="/forgotPassword"> Resend Code</Link></p>
              <Button
                type="submit"
                disabled={loading}
              >
                {!loading ? 'Verify Password' : <i className="fa fa-spinner fa-spin fa-1x fa-fw" />}
              </Button>
            </ValidatorForm>
          </div>
        </div>
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

const mapDispatchToProps = { toggleLoader, enterPasscodeRequest };
const mapStateToProps = ({ Auth, Sidebar }) => {
  let { loading } = Auth;
  let { isActive } = Sidebar;
  return { loading, isActive };
};

export default connect(mapStateToProps, mapDispatchToProps)(EnterPasscode);
