import axios from "axios";

export const PUTSIGNUP = 'PUTSIGNUP';
export const PUT_SIGNUP_SUCCESS = 'PUT_SIGNUP_SUCCESS';
export const PUT_SIGNUP_FAILURE = 'PUT_SIGNUP_FAILURE';
export const PUT_SIGNUP_STARTED = 'PUT_SIGNUP_STARTED';

//tutorial from https://alligator.io/redux/redux-thunk/
export const putSignup = (emailAndPassword) => {
	return dispatch => {

		//first dispatch an immediate synchronous action to the store to indicate that we’ve started saving 
		dispatch(putSignupStarted());
		
		return axios.post("http://localhost:5000/user/api/new-user", {
				emailAndPassword
		})
		.then(res => {
			dispatch(putSignupSucess(res.data));
		})
		.catch(err => {
			dispatch(putSignupFailure(err));
		});
	};
};

const putSignupStarted = () => ({
	type: PUT_SIGNUP_STARTED
});

const putSignupSucess = emailAndPassword => ({
	type: PUT_SIGNUP_SUCCESS,
	payload: {
		...emailAndPassword
	}
});

const putSignupFailure = error => ({
	type: PUT_SIGNUP_FAILURE,
	payload: {
		error
	}
});
