import { combineReducers } from 'redux';
import { titleReducer } from './titleReducer';
import { signupEmailReducer } from './signupEmailReducer';
import { signupPasswordReducer } from './signupPasswordReducer';
import { putSignupReducer } from './putSignupReducer';

export const rootReducer = combineReducers({
	title: titleReducer,
	signupEmail: signupEmailReducer,
	signupPassword: signupPasswordReducer,
	putSignup: putSignupReducer
});
