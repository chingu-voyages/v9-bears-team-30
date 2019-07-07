import axios from "axios";
export const SAVE_SEARCH_HISTORY = 'SAVE_SEARCH_HISTORY';
export const SAVE_SEARCH_HISTORY_SUCCESS = 'SAVE_SEARCH_HISTORY_SUCCESS';
export const SAVE_SEARCH_HISTORY_FAILURE = 'SAVE_SEARCH_HISTORY_FAILURE';

//takes recent search city, state and an e-mail
export const saveToUserSearchHistory = (searchCityAndState, email) => {
	console.log('save history action called')
	return dispatch => {

		return axios.put("user/api/update-search-history", {
			searchCityAndState,
			email
		})
		.then(res => {
			console.log('save success: '+(JSON.stringify(res.data)));
			dispatch(saveSearchHistorySucess(res.data));
		})
		.catch(err => {
			console.log('save fail');
			dispatch(saveSearchHistoryFailure(err));
		});
	}
}

const saveSearchHistorySucess = newHistory => ({
	type: SAVE_SEARCH_HISTORY_SUCCESS,
	payload: {
		...newHistory
	}
});

const saveSearchHistoryFailure = error => ({
	type: SAVE_SEARCH_HISTORY_FAILURE,
	payload: {
		error
	}
});
