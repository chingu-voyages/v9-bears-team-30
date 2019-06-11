import { combineReducers } from 'redux';
import { titleReducer } from './titleReducer';

export const rootReducer = combineReducers({
	title: titleReducer
});
