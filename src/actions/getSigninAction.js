import axios from "axios";

export const GETSIGNIN = 'GETSIGNIN';
export const GET_SIGNIN_SUCCESS = 'GET_SIGNIN_SUCCESS';
export const GET_SIGNIN_FAILURE = 'GET_SIGNIN_FAILURE';
export const GET_SIGNIN_STARTED = 'GET_SIGNIN_STARTED';

//tutorial from https://alligator.io/redux/redux-thunk/
export const getSignin = (emailAndPassword) => {
	return dispatch => {

		//first dispatch an immediate synchronous action to the store to indicate that we’ve started saving 
		dispatch(getSigninStarted());
		
		console.log(emailAndPassword)

		return axios.get("http://localhost:5000/user/api/signin", {
			params: {
				email: emailAndPassword.signinEmail,
				password: emailAndPassword.signinPassword
			}
		})
		.then(res => {
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
