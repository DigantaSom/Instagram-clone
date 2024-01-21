import { Dispatch } from 'redux';
import constants from '../../utils/constants';

import { ReqUserDispatchType, User } from './user.types';

const getUserProfile =
  (jwt: string) => async (dispatch: Dispatch<ReqUserDispatchType>) => {
    try {
      const res = await fetch(constants.API_BASE_URL + '/api/users/req', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });

      const reqUser: User = await res.json();

      dispatch({
        type: 'REQ_USER',
        payload: reqUser,
      });
    } catch (error) {
      console.log('Error while getUserProfile:', error);
    }
  };

const userActions = {
  getUserProfile,
};

export default userActions;
