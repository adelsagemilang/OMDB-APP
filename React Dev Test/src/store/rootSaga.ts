import { all, fork } from 'redux-saga/effects';

// modules
import HomeSaga from './home/sagas';

export function* rootSaga() {
  yield all([fork(HomeSaga)]);
}
