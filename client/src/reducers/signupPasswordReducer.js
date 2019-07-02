import { CHANGESIGNUPPASSWORD } from '../actions/changeSignupPasswordAction';

export const signupPasswordReducer = (state = {signupPassword: ''}, action) => {
	switch (action.type) {
		case CHANGESIGNUPPASSWORD:
			// don't mutate state here
			var newObject = {signupPassword: action.signupPassword};
			return Object.assign({}, state, newObject);
		default:
			return state;
	}
};
