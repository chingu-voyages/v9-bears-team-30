import { 
  PUT_SIGNUP_SUCCESS, 
  PUT_SIGNUP_FAILURE, 
  PUT_SIGNUP_STARTED } from '../actions/putSignupAction';

export const putSignupReducer = (state = {saving: false, newSignup: [], error: null}, action) => {
  switch (action.type) {
    case PUT_SIGNUP_STARTED:
      return {
        ...state,
        saving: true
      };
    case PUT_SIGNUP_SUCCESS:
      return {
        ...state,
        saving: false,
        error: null,
        newSignup: [...state.newSignup, action.payload]
      };
    case PUT_SIGNUP_FAILURE:
      return {
        ...state,
        saving: false,
        error: action.payload.error.response.data
      };
    default:
      return state;
  }
}
