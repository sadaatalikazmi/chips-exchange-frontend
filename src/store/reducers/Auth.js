import { setToken } from "../axios";

let initialState = {
  auth: localStorage.getItem('auth'),
  setLoader: { message: 'Please Wait...', status: false },
  getSubscription: {},
  signInSuccess: null,
  unexpectedError: null,
  transactions: [],
  transactionsLoading: false,
  transactionsError: null,
  username: null,
  forgotPasswordLoading: false,
  forgotPasswordError: null,
  chipsBalance: 0,
  chipsBalanceLoading: null,
  chipsBalanceError: null,
  userCards: null,
}

const Auth = (state = initialState, { type, payload }) => {
  switch (type) {

    case 'SIGN_IN_DATA':
      setToken(payload.token);
      localStorage.setItem('auth', payload.token);

      return {
        ...state,
        auth: payload.token,
      };

    case 'SIGN_UP_DATA':
      setToken(payload.token);
      localStorage.setItem('auth', payload.token);

      return {
        ...state,
        auth: payload.token,
      };

    case 'TOGGLE_LOADER':
      return {
        ...state,
        setLoader: payload,
      };

    case 'GET_SUBSCRIPTION':
      return {
        ...state,
        getSubscription: payload
      };

    case 'UNEXPECTED_ERROR':
      return {
        ...state,
        unexpectedError: payload,
      };

    case 'FETCH_TRANSACTION_HISTORY_REQUEST':
      return {
        ...state,
        transactionsLoading: true,
        transactionsError: null,
      };

    case 'FETCH_TRANSACTION_HISTORY_SUCCESS':
      return {
        ...state,
        transactionsLoading: false,
        transactions: payload,
      };

    case 'FETCH_TRANSACTION_HISTORY_FAILURE':
      return {
        ...state,
        transactionsLoading: false,
        transactionsError: payload,
      };

    case 'FETCH_CHIPS_BALANCE_REQUEST':
      return {
        ...state,
        chipsBalanceLoading: true,
        chipsBalanceError: null,
      };

    case 'FETCH_CHIPS_BALANCE_SUCCESS':
      return {
        ...state,
        chipsBalanceLoading: false,
        chipsBalance: payload,
      };

    case 'FETCH_CHIPS_BALANCE_FAILURE':
      return {
        ...state,
        chipsBalanceLoading: false,
        chipsBalanceError: payload,
      };

    case 'FORGOT_PASSWORD_SUCCESS':
      return {
        ...state,
        forgotPasswordLoading: false,
        forgotPassword: payload,
      };

    case 'FORGOT_PASSWORD_FAILURE':
      return {
        ...state,
        forgotPasswordLoading: false,
        forgotPasswordError: payload,
      };

    case 'SET_USER_NAME':
      return {
        ...state,
        username: payload,
      };

    case 'SIGN_OUT':
      localStorage.removeItem('auth');
      return initialState;

    case 'SET_USER_CARDS':
      return {
        ...state,
        userCards: payload,
      }

    default:
      return state;
  }
};

export default Auth;