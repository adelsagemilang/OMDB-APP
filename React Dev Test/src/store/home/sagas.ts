import { all, call, put, fork, takeEvery } from 'redux-saga/effects';
import { callApi } from 'utils/services';
import { SearchActions } from './types';
import { getSearchAsync } from './actions';

function* getData(action) {
  const params = action.payload;
  params.apiKey = process.env.REACT_APP_API_KEY;
  const args = {
    method: 'GET',
    params,
  };

  try {
    const res = yield call(callApi, args);
    yield put(getSearchAsync.success(res));
  } catch (err) {
    console.log(err);
  }
}

function* watchFetchRequest() {
  yield takeEvery(SearchActions.GET_DATA_REQUEST, getData);
}

function* HomeSaga() {
  yield all([fork(watchFetchRequest)]);
}

export default HomeSaga;
