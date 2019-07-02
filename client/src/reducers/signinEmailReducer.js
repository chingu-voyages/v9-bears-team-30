import { CHANGESIGNINEMAIL } from '../actions/changeSigninEmailAction';

export const signinEmailReducer = (state = {signinEmail: ''}, action) => {
	switch (action.type) {
		case CHANGESIGNINEMAIL:
			// don't mutate state here
			var newObject = {signinEmail: action.signinEmail};
			return Object.assign({}, state, newObject);
		default:
			return state;
	}
};
