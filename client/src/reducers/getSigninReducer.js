import { 
  GET_SIGNIN_SUCCESS, 
  GET_SIGNIN_FAILURE, 
  GET_SIGNIN_STARTED,
  UPDATE_SEARCH_HISTORY } from '../actions/getSigninAction';

const isEmpty = require("is-empty");

export const getSigninReducer = (state = {saving: false, isAuthenticated: false, user: null, userSearchHistory: [], error: null}, action) => {
  switch (action.type) {
    case GET_SIGNIN_STARTED:
      return {
        ...state,
        saving: true
      };
    case GET_SIGNIN_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        saving: false,
        isAuthenticated: !isEmpty(action.payload),
        error: null,
        user: action.payload.email,
        userSearchHistory: action.payload.searchHistory
      };
    case GET_SIGNIN_FAILURE:
      console.log(action.payload);
      return {
        ...state,
        saving: false,
        error: action.payload
      };
    case UPDATE_SEARCH_HISTORY:
      console.log(action.payload);
      return {
        ...state,
        saving: false,
        error: action.payload
      };
    default:
      return state;
  }
}
