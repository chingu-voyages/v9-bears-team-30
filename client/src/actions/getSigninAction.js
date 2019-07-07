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

		//first dispatch an immediate synchronous action to the store to indicate that we’ve started signing in 
		dispatch(getSigninStarted());

		return axios.get("/user/api/signin", {
			params: {
				email: emailAndPassword.signinEmail,
				password: emailAndPassword.signinPassword
			}
		})
		.then(res => {
			//save to local storage
			console.log(res.data);
			const { token } = res.data;
			localStorage.setItem("jwtToken", token);
			//set token to Auth header
			setAuthToken(token);
			//decode token to get user data
			const decoded = jwt_decode(token);
			decoded.email=emailAndPassword.signinEmail;
			//set current user
			//dispatch(setCurrentUser(decoded));
			dispatch(getSigninSucess(decoded));
		})
		.catch(err => {
			dispatch(getSigninFailure(err));
		});
	};
};

const getSigninStarted = () => ({
	type: GET_SIGNIN_STARTED
});

export const getSigninSucess = decoded => ({
	type: GET_SIGNIN_SUCCESS,
	payload: decoded
});

const getSigninFailure = error => ({
	type: GET_SIGNIN_FAILURE,
	payload: {
		error
	}
});

//log user out
export const logoutUser = () => dispatch => {

    console.log('logoutUser action called');
	//remove token from local storage
	localStorage.removeItem("jwtToken");
	//remove auth header for future requests
	setAuthToken(false);
	//set current user to empty object which will set isAuthenticated to false
	dispatch(getSigninSucess({}));
}