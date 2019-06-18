import { CHANGESIGNINPASSWORD } from '../actions/changeSigninPasswordAction';

export const signinPasswordReducer = (state = {signinPassword: ''}, action) => {
	switch (action.type) {
		case CHANGESIGNINPASSWORD:
			// don't mutate state here
			var newObject = {signinPassword: action.signinPassword};
			return Object.assign({}, state, newObject);
		default:
			return state;
	}
};
