import {
  SET_USER,
  RESET_USER,
} from '../actions/types';

export type userStateType = {
  isAuthenticated: boolean | undefined;
  id: number | undefined;
  username: string | undefined;
}

export type userActionType = {
  type: string;
  payload: Partial<userStateType>;
}

const initialState: userStateType = {
  isAuthenticated: false,
  id: 0,
  username: '',
};

function userReducer (state = initialState, action: userActionType): userStateType {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.payload,
      };
    case RESET_USER:
      return {
        ...initialState
      }
    default:
      return state
  }
}

export default userReducer;