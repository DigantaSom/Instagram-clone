import { UserActionTypes, UserState } from './user.types';

const initialState: UserState = {
  reqUser: null,
};

const userReducer = (
  state: UserState = initialState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case 'REQ_USER':
      return {
        ...state,
        reqUser: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
