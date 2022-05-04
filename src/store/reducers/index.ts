import { combineReducers } from '@reduxjs/toolkit';
import nfdApi from '@services/api';
import authReducer from './auth';

const rootReducer = combineReducers({
  auth: authReducer,
  [nfdApi.reducerPath]: nfdApi.reducer,
});

export default rootReducer;
