import { CHANGESIGNUPEMAIL } from '../actions/changeSignupEmailAction';

export const signupEmailReducer = (state = {signupEmail: ''}, action) => {
	switch (action.type) {
		case CHANGESIGNUPEMAIL:
			// don't mutate state here
			var newObject = {signupEmail: action.signupEmail};
			return Object.assign({}, state, newObject);
		default:
			return state;
	}
};
