import EventBus from "eventing-bus";
import { connect } from 'react-redux';
import Error from '@material-ui/icons/Error';
import { createBrowserHistory } from "history";
import { ToastContainer, toast } from 'react-toastify';
import CheckCircle from '@material-ui/icons/CheckCircle';
import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "../store/PrivateRoute";
import Preloader from '../components/preloader';
import ChipsExchange from './ChipsExchange';
import SignUp from './SignUp';
import SignIn from './SignIn';
import ForgotPassword from './ForgotPassword';
import EnterPasscode from './EnterPasscode';
import Welcome from './Welcome';
import ChipzBalance from './ChipzBalance';
import SelectCard from './SelectCard';
import TransactionHistory from './TransactionHistory';
import ChallengeDetails from './ChallengeDetails';
import NewPassword from "./NewPassword";

import { signOut, signIn } from '../store/actions/Auth';

import '../static/css/style.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import "react-toastify/dist/ReactToastify.css";

const hist = createBrowserHistory();
const BounceLoader = lazy(() => import("../components/bounceloader"));

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  };

  componentDidMount() {
    EventBus.on('tokenExpired', () => this.props.signOut());
    EventBus.on('info', (e) => toast.info(() => <div> <Error /> {e}</div>));
    EventBus.on('error', (e) => toast.error(() => <div> <Error /> {e}</div>));
    EventBus.on('success', (e) => toast.success(() => <div> <CheckCircle /> {e}</div>));
  };
  

  render() {
    return (
      <div>
        <Suspense fallback={<Preloader />}>
          <BounceLoader />
          <ToastContainer closeOnClick position="bottom-left" />
          <Router history={hist}>
            <Switch>
              <Route exact path='/' component={props => <ChipsExchange {...props} />} />
              <Route exact path='/ChipsExchange' component={props => <ChipsExchange {...props} />} />
              <Route exact path='/SignUp' component={props => <SignUp {...props} />} />
              <Route exact path='/SignIn' component={props => <SignIn {...props} />} />
              <Route exact path='/ForgotPassword' component={props => <ForgotPassword {...props} />} />
              <Route exact path='/enterPasscode' component={props => <EnterPasscode {...props} />} />
              <Route exact path='/newpassword' component={props => <NewPassword {...props} />} />
              <Route exact path='/Welcome' component={props => <Welcome {...props} />} />
              <PrivateRoute exact path='/ChipzBalance' component={props => <ChipzBalance {...props} />} />
              <PrivateRoute exact path='/TransactionHistory' component={props => <TransactionHistory {...props} />} />
              <PrivateRoute exact path='/ChallengeDetails' component={props => <ChallengeDetails {...props} />} />
              <PrivateRoute exact path='/SelectCard' component={props => <SelectCard {...props} />} />
            </Switch>
          </Router>
        </Suspense>
      </div>
    );
  }
}

const mapDispatchToProps = { signOut, signIn };

const mapStateToProps = ({ Auth }) => {
  let { publicAddress } = Auth;
  return { publicAddress }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);