import { User } from '../user/user.types';

// --------- Auth Redux Types ---------

export interface AuthState {
  signin: string | null; // for token
  signup: User | null;
}

export const SIGN_UP = 'SIGN_UP';
export const SIGN_IN = 'SIGN_IN';

export interface SignUpDispatchType {
  type: typeof SIGN_UP;
  payload: User;
}

export interface SignInDispatchType {
  type: typeof SIGN_IN;
  payload: string | null; // token
}

export type AuthActionType = SignUpDispatchType | SignInDispatchType;

// --------- Other Auth Types ---------

export interface SignInFormFields {
  email: string;
  password: string;
}

export interface SignUpFormFields extends SignInFormFields {
  username: string;
  name: string;
}
