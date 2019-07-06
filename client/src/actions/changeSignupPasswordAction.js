export const CHANGESIGNUPPASSWORD = 'CHANGESIGNUPPASSWORD';

export const changeSignupPassword = (signupPassword) => {
	return {
		type: CHANGESIGNUPPASSWORD,
		signupPassword: signupPassword
	}
};
