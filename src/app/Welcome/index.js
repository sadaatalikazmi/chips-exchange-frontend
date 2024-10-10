import WOW from 'wowjs';
import Grid from '@material-ui/core/Grid';
import { Button } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './index.css';
import '../../static/css/animate.css';
import 'animate.css';

import Sidebar from '../../components/sidebar';
import { toggleLoader } from "../../store/actions/Auth";


class EnterPasscode extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  };

  componentDidMount() {
    new WOW.WOW({
      live: true,
    }).init();
  }



  render() {
    let { loading, isActive } = this.props;
    let { } = this.state;

    return (
      <div className={isActive ? "singup-page active" : "singup-page"}>
        <Sidebar />
        <div className='content'>
          <div className="signup-form">
            <h2>All set welcome !</h2>
            <p>Try to signIn for next step.</p>
            <div className='img-area'>
              <img src={require('../../static/images/welcome-img.png')} alt='' />
            </div>
            <h2 className='center-heding'>Your password has been <br /> successfully changed!</h2>
            <Button
              type="submit"
              disabled={loading}
            >
              {!loading ? 'Get Started' : <i className="fa fa-spinner fa-spin fa-1x fa-fw" />}
            </Button>
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


const mapDispatchToProps = { toggleLoader };
const mapStateToProps = ({ Auth, Sidebar }) => {
  let { loading } = Auth;
  let { isActive } = Sidebar;
  return { loading, isActive };
};

export default (EnterPasscode);
