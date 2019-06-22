import { 
  GET_SIGNIN_SUCCESS, 
  GET_SIGNIN_FAILURE, 
  GET_SIGNIN_STARTED } from '../actions/getSigninAction';
  
const isEmpty = require("is-empty");

export const getSigninReducer = (state = {saving: false, isAuthenticated: false, newSignin: [], error: null}, action) => {
  switch (action.type) {
    case GET_SIGNIN_STARTED:
      return {
        ...state,
        saving: true
      };
    case GET_SIGNIN_SUCCESS:
      return {
        ...state,
        saving: false,
        isAuthenticated: !isEmpty(action.payload),
        error: null,
        newSignin: [...state.newSignin, action.payload]
      };
    case GET_SIGNIN_FAILURE:
      return {
        ...state,
        saving: false,
        error: action.payload.error.response.data
      };
    default:
      return state;
  }
}
