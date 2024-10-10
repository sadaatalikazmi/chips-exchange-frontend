export const signOut = () => {
  console.log("***signout");
  return ({
  type: 'SIGN_OUT',
})};


export const toggleLoader = (data) => ({
  type: 'TOGGLE_LOADER',
  payload: data,
});

export const innerForm = (data) => ({
  type: 'INNER_FORM',
  payload: data,
});

export const setSubscription = (data) => ({
  type: 'SET_SUBSCRIPTION',
  payload: data,
});

export const getSubscription = (data) => ({
  type: 'GET_SUBSCRIPTION',
  payload: data,
});

export const signUp = (data) => ({
  type: 'SIGN_UP',
  payload: data,
});

export const signUpData = (data) => ({
  type: 'SIGN_UP_DATA',
  payload: data,
});

export const signIn = (data) => ({
  type: 'SIGN_IN',
  payload: data,
});

export const signInData = (data) => ({
  type: 'SIGN_IN_DATA',
  payload: data,
});

export const challengeDetails = (data) => ({
  type: "CHALLENGE_DETAILS",
  payload: data,
})

export const challengeDetailsError = (data) => ({
  type: "CHALLENGE_DETAILS_ERROR",
  payload: data,
})

export const fetchTransactionHistoryRequest = () => ({
  type: 'FETCH_TRANSACTION_HISTORY_REQUEST',
});

export const fetchTransactionHistorySuccess = (data) => ({
  type: 'FETCH_TRANSACTION_HISTORY_SUCCESS',
  payload: data,
});

export const fetchTransactionHistoryFailure = (error) => ({
  type: 'FETCH_TRANSACTION_HISTORY_FAILURE',
  payload: error,
});

export const fetchChipsBalanceRequest = () => ({
  type: 'FETCH_CHIPS_BALANCE_REQUEST',
});

export const fetchChipsBalanceSuccess = (data) => ({
  type: 'FETCH_CHIPS_BALANCE_SUCCESS',
  payload: data,
});

export const fetchChipsBalanceFailure = (error) => ({
  type: 'FETCH_CHIPS_BALANCE_FAILURE',
  payload: error,
});

export const forgotPasswordRequest = (data) => ({
  type: 'FORGOT_PASSWORD_REQUEST',
  payload: data,
});

export const forgotPasswordSuccess = (data) => ({
  type: 'FORGOT_PASSWORD_SUCCESS',
  payload: data,
});

export const forgotPasswordFailure = (error) => ({
  type: 'FORGOT_PASSWORD_FAILURE',
  payload: error,
});

export const enterPasscodeRequest = (data) => ({
  type: 'ENTER_PASSCODE_REQUEST',
  payload: data,
});

export const NewPaswordRequest = (data) => ({
  type: 'NEW_PASSWORD_REQUEST',
  payload: data,
});

export const getUserName = () => ({
  type: 'USER_NAME',
});

export const setUserName = (data) => ({
  type: 'SET_USER_NAME',
  payload: data,
});

export const getUserCards = () => ({
  type: 'GET_USER_CARDS'
});

export const setUserCards = (data) => ({
  type: 'SET_USER_CARDS',
  payload: data
});

export const purchaseChips = (data) => ({
  type: 'PURCHASE_CHIPS',
  payload: data,
});

export const refundChips = (data) => ({
  type: 'REFUND_CHIPS',
  payload: data,
});