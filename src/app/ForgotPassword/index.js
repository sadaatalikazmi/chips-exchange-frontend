import WOW from 'wowjs';
import Grid from '@material-ui/core/Grid';
import { Button } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import './index.css';
import '../../static/css/animate.css';
import 'animate.css';

import Sidebar from '../../components/sidebar';
import { toggleLoader, forgotPasswordRequest } from "../../store/actions/Auth";


class ForgotPassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
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
    const { email } = this.state;
    const { forgotPasswordRequest, toggleLoader, history } = this.props;

    toggleLoader(true);

    await forgotPasswordRequest({ data: { email }, history });

    toggleLoader(false);
  };



  render() {
    let { loading, isActive } = this.props;
    let { email } = this.state;

    return (
      <div className={isActive ? "singup-page active" : "singup-page"}>
        <Sidebar />
        <div className='content'>
          <div className="signup-form">
            <h2>Forgot Password</h2>
            <p>Enter your email below.</p>
            <div className='img-area'>
              <img src={require('../../static/images/forgot-img.png')} alt='' />
            </div>

            <ValidatorForm className="validatorForm" onSubmit={this.handleFormSubmit}>
              <Grid container spacing={1} className='group-input icon-input' alignItems="flex-end">
                <label>Email Address</label>
                <Grid className="signup-fields" item xs={12}>
                  <span className='email-icon'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.42806 2.15689e-07H7.37464C5.69042 -9.97341e-06 4.41562 -1.7526e-05 3.41638 0.0901828C2.6433 0.159031 2.01448 0.281213 1.50451 0.538183C1.43848 0.561455 1.37753 0.595395 1.3247 0.639031C1.23531 0.692364 1.14794 0.750546 1.06667 0.815516C0.494737 1.27127 0.23061 1.952 0.113785 2.78109C-0.000126217 3.5895 -6.99602e-05 4.58967 3.71304e-06 5.89937L7.49362e-06 6.00048L3.71304e-06 6.1016C-6.99603e-05 7.41129 -0.000126223 8.41146 0.113785 9.21987C0.23061 10.049 0.493721 10.7297 1.06667 11.1854C1.63962 11.6412 2.40559 11.8206 3.41638 11.9108C4.40544 12.0001 5.66447 12 7.3233 12L7.42806 12H8.57091L8.67573 12C10.3355 12 11.5935 12.0001 12.5836 11.9108C13.5934 11.8206 14.3604 11.6412 14.9333 11.1854C15.5052 10.7297 15.7694 10.049 15.8862 9.21987C16.0001 8.41147 16.0001 7.4113 16 6.10162V6.10158L16 6.00048L16 5.89938V5.89934C16.0001 4.58966 16.0001 3.5895 15.8862 2.78109C15.7694 1.952 15.5052 1.27127 14.9333 0.815516C14.8592 0.756364 14.7809 0.702061 14.7007 0.652607C14.6367 0.593455 14.5585 0.550789 14.4731 0.525577C13.9672 0.276365 13.3445 0.158062 12.5836 0.0901828C11.5834 -1.75167e-05 10.3095 -9.97342e-06 8.62436 2.15689e-07H8.57091H7.42806ZM7.42806 1.09091H8.57091C10.2816 1.09091 11.5596 1.09382 12.4759 1.17624C12.7268 1.19952 12.9412 1.22861 13.1362 1.26255C12.4068 1.83564 10.6423 3.22036 9.08901 4.43927C8.45307 4.93866 7.54691 4.93866 6.91098 4.43927C5.35771 3.22036 3.59314 1.83564 2.86375 1.26255C3.05778 1.22861 3.27314 1.19952 3.52305 1.17624C4.44038 1.09382 5.71733 1.09091 7.42806 1.09091ZM3.63589 3.28139C2.68729 2.53681 1.90304 1.92124 1.6955 1.75806C1.47404 1.98594 1.33283 2.31855 1.24648 2.92654C1.14693 3.63054 1.14286 4.64097 1.14286 6.00048C1.14286 7.36 1.14693 8.37139 1.24648 9.07442C1.34604 9.77745 1.51264 10.1207 1.79912 10.3486C2.08559 10.5765 2.60673 10.7423 3.52305 10.8247C4.44038 10.9071 5.71733 10.9101 7.42806 10.9101H8.57091C10.2816 10.9101 11.5596 10.9071 12.4769 10.8247C13.3933 10.7423 13.9144 10.5765 14.2009 10.3486C14.4873 10.1207 14.6539 9.77745 14.7535 9.07442C14.8531 8.37139 14.8571 7.36 14.8571 6.00048C14.8571 4.64097 14.852 3.63054 14.7535 2.92654C14.6672 2.31855 14.5249 1.98594 14.3045 1.75806C14.097 1.92123 13.3128 2.53675 12.3642 3.28127C11.5484 3.92163 10.611 4.65742 9.81434 5.28291C8.76291 6.10812 7.23707 6.10812 6.18565 5.28291C5.38903 4.65745 4.45169 3.92172 3.63589 3.28139Z" fill="#156CF7" />
                    </svg>
                  </span>
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
                  <span className='check-icon'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z" fill="#156CF7" />
                      <path d="M12.4411 9.38416L10.7466 11.0635C10.3913 11.4151 10.0373 11.7667 9.68402 12.1177C9.45804 12.3417 9.0734 12.3417 8.84608 12.1177C8.77675 12.0483 8.70743 11.9795 8.63943 11.9108C8.1488 11.4237 7.6595 10.938 7.16954 10.4502C6.93556 10.2189 6.95156 9.85473 7.16954 9.6201C7.38552 9.38614 7.78816 9.40267 8.00748 9.6201C8.07747 9.68884 8.1468 9.75757 8.2148 9.82631C8.56544 10.1739 8.91608 10.5236 9.26538 10.8712C9.82068 10.3207 10.3746 9.77211 10.9293 9.22158L11.9918 8.16809C12.2258 7.93611 12.5931 7.95197 12.8298 8.16809C13.0651 8.38421 13.0484 8.78207 12.8291 8.99951C12.7005 9.12707 12.5698 9.25661 12.4411 9.38416Z" fill="white" />
                    </svg>
                  </span>
                </Grid>
              </Grid>
              <Button
                type="submit"
                disabled={loading}
              >
                {!loading ? 'Reset Password' : <i className="fa fa-spinner fa-spin fa-1x fa-fw" />}
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

const mapDispatchToProps = { toggleLoader, forgotPasswordRequest };
const mapStateToProps = ({ Auth, Sidebar }) => {
  let { loading } = Auth;
  let { isActive } = Sidebar;
  return { loading, isActive };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
