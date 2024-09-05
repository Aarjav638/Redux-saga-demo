import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchCrimeRequest,
  fetchCrimeSuccess,
  fetchCrimeFailure,
} from './crimeSlice';
import {Crime} from '../constants/types';

function* fetchCrimeSaga(): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.get,
      'https://data.cityofchicago.org/resource/ijzp-q8t2.json?$query=SELECT%0A%20%20%60id%60%2C%0A%20%20%60case_number%60%2C%0A%20%20%60date%60%2C%0A%20%20%60block%60%2C%0A%20%20%60iucr%60%2C%0A%20%20%60primary_type%60%2C%0A%20%20%60description%60%2C%0A%20%20%60location_description%60%2C%0A%20%20%60arrest%60%2C%0A%20%20%60domestic%60%2C%0A%20%20%60beat%60%2C%0A%20%20%60district%60%2C%0A%20%20%60ward%60%2C%0A%20%20%60community_area%60%2C%0A%20%20%60fbi_code%60%2C%0A%20%20%60x_coordinate%60%2C%0A%20%20%60y_coordinate%60%2C%0A%20%20%60year%60%2C%0A%20%20%60updated_on%60%2C%0A%20%20%60latitude%60%2C%0A%20%20%60longitude%60%2C%0A%20%20%60location%60%0AORDER%20BY%20%60date%60%20DESC%20NULL%20FIRST',
    );
    yield put(fetchCrimeSuccess(response.data as Crime[]));
  } catch (error: any) {
    yield put(fetchCrimeFailure(error.message));
  }
}

function* watchFetchCrime() {
  yield takeLatest(fetchCrimeRequest.type, fetchCrimeSaga);
}

export default function* rootSaga() {
  yield watchFetchCrime();
}
