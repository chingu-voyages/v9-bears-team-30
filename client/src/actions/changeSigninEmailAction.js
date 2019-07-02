export const CHANGESIGNINEMAIL = 'CHANGESIGNINEMAIL';

export const changeSigninEmail = (signinEmail) => {
	return {
		type: CHANGESIGNINEMAIL,
		signinEmail: signinEmail
	}
};
