import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {CrimeState, Crime} from '../constants/types';

const initialState: CrimeState = {
  data: [],
  loading: false,
  error: '',
};

const crimeSlice = createSlice({
  name: 'crime',
  initialState,
  reducers: {
    fetchCrimeRequest(state: CrimeState) {
      state.loading = true;
      state.error = '';
      state.data = [];
    },
    fetchCrimeSuccess(state: CrimeState, action: PayloadAction<Crime[]>) {
      state.data = action.payload;
      state.loading = false;
      state.error = '';
    },
    fetchCrimeFailure(state: CrimeState, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
      state.data = [];
    },
  },
});

export const {fetchCrimeRequest, fetchCrimeSuccess, fetchCrimeFailure} =
  crimeSlice.actions;
export default crimeSlice.reducer;
