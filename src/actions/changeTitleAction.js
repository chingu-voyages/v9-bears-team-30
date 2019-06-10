export const CHANGE = 'CHANGE';

export const changeTitle = (title) => {
	return {
		type: CHANGE,
		title: title
	}
};