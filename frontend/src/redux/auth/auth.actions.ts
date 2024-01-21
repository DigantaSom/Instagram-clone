import { Dispatch } from 'react';

import { SignInFormFields, SignUpFormFields } from './auth.types';
import { SignInDispatchType, SignUpDispatchType } from './auth.types';
import { User } from '../user/user.types';

import constants from '../../utils/constants';

const signInAction =
  (data: SignInFormFields) =>
  async (dispatch: Dispatch<SignInDispatchType>) => {
    try {
      const res = await fetch(constants.API_BASE_URL + '/signin', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // sign-in using 'Basic Auth'
          Authorization: 'Basic ' + btoa(data.email + ':' + data.password),
        },
      });

      const token: string | null = res.headers.get('Authorization');
      localStorage.setItem('token', token || '');

      dispatch({
        type: 'SIGN_IN',
        payload: token,
      });

      console.log('Sign-in token:', token);
    } catch (error) {
      console.log('Error during sign-in: ', error);
    }
  };

const signUpAction =
  (data: SignUpFormFields) =>
  async (dispatch: Dispatch<SignUpDispatchType>) => {
    try {
      const res = await fetch(constants.API_BASE_URL + '/signup', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const user: User = await res.json();

      console.log('Signed up user:', user);

      dispatch({
        type: 'SIGN_UP',
        payload: user,
      });
    } catch (error) {
      console.log('Error during sign-in: ', error);
    }
  };

const authActions = {
  signInAction,
  signUpAction,
};

export default authActions;
