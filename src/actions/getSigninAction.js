import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

export const GETSIGNIN = 'GETSIGNIN';
export const GET_SIGNIN_SUCCESS = 'GET_SIGNIN_SUCCESS';
export const GET_SIGNIN_FAILURE = 'GET_SIGNIN_FAILURE';
export const GET_SIGNIN_STARTED = 'GET_SIGNIN_STARTED';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

//tutorial from https://alligator.io/redux/redux-thunk/
//auth from https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-2-frontend-6eac4e38ee82
export const getSignin = (emailAndPassword) => {
	return dispatch => {

		//first dispatch an immediate synchronous action to the store to indicate that we’ve started saving 
		dispatch(getSigninStarted());

		return axios.get("http://localhost:5000/user/api/signin", {
			params: {
				email: emailAndPassword.signinEmail,
				password: emailAndPassword.signinPassword
			}
		})
		.then(res => {
			//save to local storage
			const { token } = res.data;
			localStorage.setItem("jwtToken", token);
			//set token to Auth header
			setAuthToken(token);
			//decode token to get user data
			const decoded = jwt_decode(token);
			//set current user
			//dispatch(setCurrentUser(decoded));
			dispatch(getSigninSucess(res.data));
		})
		.catch(err => {
			dispatch(getSigninFailure(err));
		});
	};
};

const getSigninStarted = () => ({
	type: GET_SIGNIN_STARTED
});

const getSigninSucess = emailAndPassword => ({
	type: GET_SIGNIN_SUCCESS,
	payload: {
		...emailAndPassword
	}
});

const getSigninFailure = error => ({
	type: GET_SIGNIN_FAILURE,
	payload: {
		error
	}
});

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: GET_SIGNIN_SUCCESS,
    payload: decoded
  };
};

//log user out
export const logoutUser = () => dispatch => {
	//remove token from local storage
	localStorage.removeItem("jwtToken");
	//remove auth header for future requests
	setAuthToken(false);
	//set current user to empty object which will set isAuthenticated to false
	dispatch(setCurrentUser({}));
}