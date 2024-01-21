import { legacy_createStore, applyMiddleware } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';

import rootReducer from './root-reducer';

const store = legacy_createStore(rootReducer, applyMiddleware(thunk) as any);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
