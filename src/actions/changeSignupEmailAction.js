export const CHANGESIGNUPEMAIL = 'CHANGESIGNUPEMAIL';

export const changeSignupEmail = (signupEmail) => {
	return {
		type: CHANGESIGNUPEMAIL,
		signupEmail: signupEmail
	}
};
