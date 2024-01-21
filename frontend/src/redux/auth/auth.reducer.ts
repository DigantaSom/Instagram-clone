import { AuthState, AuthActionType } from './auth.types';

const initialState: AuthState = {
  signin: null,
  signup: null,
};

const authReducer = (
  state: AuthState = initialState,
  action: AuthActionType
): AuthState => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        signin: action.payload,
      };

    case 'SIGN_UP':
      return {
        ...state,
        signup: action.payload,
      };

    default:
      return initialState;
  }
};

export default authReducer;
