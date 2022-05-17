import { combineReducers } from '@reduxjs/toolkit';
import nfdApi from '@services/api';
import authReducer from './auth';
import filterReducer from './filters';

const rootReducer = combineReducers({
  auth: authReducer,
  filters: filterReducer,
  [nfdApi.reducerPath]: nfdApi.reducer,
});

export default rootReducer;
