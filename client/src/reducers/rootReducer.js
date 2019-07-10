import { combineReducers } from 'redux';
import { titleReducer } from './titleReducer';
import { signupEmailReducer } from './signupEmailReducer';
import { signupPasswordReducer } from './signupPasswordReducer';
import { putSignupReducer } from './putSignupReducer';
import { signinEmailReducer } from './signinEmailReducer';
import { signinPasswordReducer } from './signinPasswordReducer';
import { getSigninReducer } from './getSigninReducer';
import { updateSearchHistoryReducer } from './updateSearchHistoryReducer';
import { saveSearchHistoryReducer } from './saveSearchHistoryReducer';

export const rootReducer = combineReducers({
	title: titleReducer,
	signupEmail: signupEmailReducer,
	signupPassword: signupPasswordReducer,
	putSignup: putSignupReducer,
	signinEmail: signinEmailReducer,
	signinPassword: signinPasswordReducer,
	getSignin: getSigninReducer,
	updateSearchHistory: updateSearchHistoryReducer,
	searchHistory: saveSearchHistoryReducer
});
