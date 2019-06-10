import { CHANGE } from '../actions/changeTitleAction';

export const titleReducer = (state = {title: 'My title'}, action) => {
	switch (action.type) {
		case CHANGE:
			// don't mutate state here
			var newObject = {title: action.title};
			return Object.assign({}, state, newObject);
		default:
			return state;
	}
};