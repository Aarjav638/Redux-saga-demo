import {configureStore} from '@reduxjs/toolkit';
import crimeReducer from './services/crimeSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './services/crimeSaga';
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    crime: crimeReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
