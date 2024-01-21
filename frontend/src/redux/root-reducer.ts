import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './auth/auth.reducer';
import userReducer from './user/user.reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

export default rootReducer;
