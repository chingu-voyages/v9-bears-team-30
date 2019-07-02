export const CHANGESIGNINPASSWORD = 'CHANGESIGNINPASSWORD';

export const changeSigninPassword = (signinPassword) => {
	return {
		type: CHANGESIGNINPASSWORD,
		signinPassword: signinPassword
	}
};
