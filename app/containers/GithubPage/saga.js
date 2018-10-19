import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import {
  apiRepos,
} from 'apis/github';
import {
  FETCH_REPOS,
} from './constants';
import {
  searchRepos,
} from './util';
import {
  stateAny,
} from './actions';


/**
 * Github repos request/response handler
 */
export function* getRepos() {
  const username = yield select(searchRepos);
  if (!username) {
    return;
  }
  yield put(stateAny({
    apiLoading: true,
    apiError: false,
  }));
  const payload = {
    apiLoading: false,
  };
  try {
    payload.repos = yield call(apiRepos, username);
  } catch (err) {
    payload.apiError = true;
  }
  yield put(stateAny(payload));
}
/**
 * Root saga manages watcher lifecycle
 */
export default function* watchRepos() {
  // Watches for FETCH_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(FETCH_REPOS, getRepos);
}
