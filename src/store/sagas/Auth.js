import axios from 'axios';
import EventBus from 'eventing-bus';
import { all, takeEvery, call, put } from 'redux-saga/effects';
import {
  challengeDetailsError, fetchTransactionHistorySuccess, fetchTransactionHistoryFailure,
  signInData, signUpData, fetchChipsBalanceSuccess, fetchChipsBalanceFailure, forgotPasswordFailure, setUserName, setUserCards
} from "../actions/Auth";

function* innerFormData({ payload }) {
  const { error, response } = yield call(postCall, { path: '/users/info', payload });
  if (error) EventBus.publish('error', error['response']['data']['message'])
  else if (response) EventBus.publish('success', response['data']['message']);
};

function* setSubscription({ payload }) {
  const { error, response } = yield call(postCall, { path: '/users/subscription', payload });
  if (error) EventBus.publish("error", error['response']['data']['message']);
  else if (response) EventBus.publish("success", response['data']['message']);
};

function* signIn({ payload }) {
  try {
    const { error, response } = yield call(postCall, { path: 'user/signin', payload: payload.data });
    console.log(error);
    if (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred during signin.';
      EventBus.publish('error', errorMessage);
    } else if (response) {
      yield put(signInData(response.data.body));
      setTimeout(() => payload.history.push('/TransactionHistory'), 1000);
    }
  } catch (error) {
    console.error('Unexpected error during signin:', error);
  }
}

function* challengeDetails({ payload }) {
  try {
    const { error, response } = yield call(putCall, { path: 'user/update-chips-limits', payload });
    console.log(error);
    if (error) {
      setTimeout(() => payload.history.push('/TransactionHistory'), 1000);
      const errorMessage = error.response?.data?.message || 'An error occurred during update the challenge chips limit';
      EventBus.publish('error', errorMessage);
      yield put(challengeDetailsError(errorMessage));
    } else if (response) {
      const successMessage = response.data?.message || 'Chips Limit updated successfully.';
      EventBus.publish('success', successMessage);
    }
  } catch (error) {
    console.error('Unexpected error during signin:', error);
    yield put(challengeDetailsError('An unexpected error occurred.'));
  }
}

function* fetchTransactionHistoryRequest() {
  try {
    const { error, response } = yield call(getCall, 'challenge/challenges');

    if (error) {
      yield put(fetchTransactionHistoryFailure(error.message));
    } else if (response) {
      yield put(fetchTransactionHistorySuccess(response.data.body));
    }
  } catch (error) {
    console.error('Unexpected error during transaction history fetch:', error);
    yield put(fetchTransactionHistoryFailure('An unexpected error occurred.'));
  }
}

function* fetchChipsBalanceRequest() {
  try {
    const { error, response } = yield call(getCall, 'user/chips-balance');

    if (error) {
      yield put(fetchChipsBalanceFailure(error.message));
    } else if (response) {
      yield put(fetchChipsBalanceSuccess(response.data.body.chips));
    }
  } catch (error) {
    console.error('Unexpected error during transaction history fetch:', error);
    yield put(fetchChipsBalanceFailure('An unexpected error occurred.'));
  }
}

function* forgotPasswordRequest({ payload }) {
  try {
    const { error, response } = yield call(postCall, { path: 'user/forgotPassword', payload: payload.data });

    if (error) {
      EventBus.publish('error', error.response.data.message);
    } else if (response) {
      const successMessage = response.data?.message || 'Forgot password email send successfully.';
      console.log(response.data.message);
      EventBus.publish('success', successMessage);
      setTimeout(() => payload.history.push({
        pathname: `/enterPasscode`,
        state: { email: payload.data.email }
      }), 1000);
      // yield put(forgotPasswordSuccess(response.data.body))
    }
  } catch (error) {
    console.error('Unexpected error during forgot password.', error);
    yield put(forgotPasswordFailure('Unexpected error during forgot password.'));
  }
}

function* enterPasscodeRequest({ payload }) {
  console.log('*** payload: ', payload);
  try {
    const { error, response } = yield call(postCall, { path: 'user/enterPasscode', payload: payload.data });

    if (error) {
      EventBus.publish('error', error.response.data.message);
    } else if (response) {
      const successMessage = response.data?.message || 'Passcode verified successfully.';
      console.log(response.data.message);
      EventBus.publish('success', successMessage);
      setTimeout(() => payload.history.push({
        pathname: `/newpassword`,
        state: { email: payload.data.email }
      }), 1000);
    }
  } catch (error) {
    console.error('Unexpected error during passcode verification', error);
  }
}

function* NewPaswordRequest({ payload }) {
  try {
    const { error, response } = yield call(postCall, { path: 'user/setNewPassword', payload: payload.data });

    if (error) {
      EventBus.publish('error', error.response.data.message);
    } else if (response) {
      const successMessage = response.data?.message || 'Passcode verified successfully.';
      EventBus.publish('success', successMessage);
      setTimeout(() => payload.history.push('/SignIn'), 1000);
    }
  } catch (error) {
    console.error('Unexpected error during passcode verification', error);
  }
}



function* signUp({ payload }) {
  try {
    const { error, response } = yield call(postCall, { path: 'user/signup', payload: payload.data });

    if (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred during signup.';
      EventBus.publish('error', errorMessage);
    } else if (response) {
      const successMessage = response.data?.message || 'User signed up successfully.';
      EventBus.publish('success', successMessage);
      yield put(signUpData(response.data.body));
      setTimeout(() => payload.history.push('/ChallengeDetails'), 500);
    }
  } catch (error) {
    console.error('Unexpected error during signup:', error);
    yield put({ type: 'UNEXPECTED_ERROR', payload: 'An unexpected error occurred.' });
  }
}

function* getUserName() {
  try {
    const { error, response } = yield call(getCall, 'user/get-user-name');

    if (error) {
      console.error(error.response.data.message);
    } else if (response) {
      yield put(setUserName(response.data.body.username));
    }
  } catch (error) {
    console.error('Unexpected error getting the username', error);
  }
}

function* getUserCards() {
  const { error, response } = yield call(getCall, 'transaction/getUserCards');
  if (error) EventBus.publish('error', error.response.data.message);
  else if (response) yield put(setUserCards(response.data.body));
}

function* purchaseChips({ payload: props }) {
  try {
    const { requestData: payload, successCallBack, failCallBack } = props;
    const { error, response } = yield call(postCall, { path: 'transaction/purchaseChips', payload });
    if (error) {
      failCallBack();
      EventBus.publish('error', error.response.data.message);
    } else if (response) {
      successCallBack(response.data.body);
      EventBus.publish('success', response.data.message);
    }
  } catch (error) { console.error('Unexpected error during signin:', error) }
}

function* refundChips({ payload: props }) {
  try {
    const { requestData: payload, successCallBack, failCallBack } = props;
    const { error, response } = yield call(postCall, { path: 'transaction/refundChips', payload });
    if (error) {
      failCallBack();
      EventBus.publish('error', error.response.data.message);
    } else if (response) {
      successCallBack(response.data.body);
      EventBus.publish('success', response.data.message);
    }
  } catch (error) { console.error('Unexpected error during signin:', error) }
}

function* actionWatcher() {
  yield takeEvery('SIGN_UP', signUp); // signup Action
  yield takeEvery('SIGN_IN', signIn); // signin Action
  yield takeEvery('INNER_FORM', innerFormData);
  yield takeEvery('SET_SUBSCRIPTION', setSubscription);
  yield takeEvery('FETCH_TRANSACTION_HISTORY_REQUEST', fetchTransactionHistoryRequest);
  yield takeEvery('FETCH_CHIPS_BALANCE_REQUEST', fetchChipsBalanceRequest);
  yield takeEvery('FORGOT_PASSWORD_REQUEST', forgotPasswordRequest);
  yield takeEvery('ENTER_PASSCODE_REQUEST', enterPasscodeRequest);
  yield takeEvery('CHALLENGE_DETAILS', challengeDetails); // signin Action
  yield takeEvery('USER_NAME', getUserName);
  yield takeEvery('NEW_PASSWORD_REQUEST', NewPaswordRequest);
  yield takeEvery('GET_USER_CARDS', getUserCards);
  yield takeEvery('PURCHASE_CHIPS', purchaseChips);
  yield takeEvery('REFUND_CHIPS', refundChips);
};

export default function* rootSaga() {
  yield all([actionWatcher()]);
};

function postCall({ path, payload }) {
  return axios
    .post(path, payload)
    .then(response => ({ response }))
    .catch(error => {
      if (error.response.status === 401) EventBus.publish("tokenExpired");
      return { error };
    });
};

function getCall(path) {
  return axios
    .get(path)
    .then(response => ({ response }))
    .catch(error => {
      if (error.response.status === 401) EventBus.publish("tokenExpired");
      return { error };
    });
};

function deleteCall(path) {
  return axios
    .delete(path)
    .then(response => ({ response }))
    .catch(error => {
      if (error.response.status === 401) EventBus.publish("tokenExpired");
      return { error };
    });
};

function putCall({ path, payload }) {
  return axios
    .put(path, payload)
    .then(response => ({ response }))
    .catch(error => {
      if (error.response.status === 401) EventBus.publish("tokenExpired");
      return { error };
    });
};
