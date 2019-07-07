import axios from "axios";
export const SAVE_SEARCH_HISTORY = 'SAVE_SEARCH_HISTORY';
export const SAVE_SEARCH_HISTORY_SUCCESS = 'SAVE_SEARCH_HISTORY_SUCCESS';
export const SAVE_SEARCH_HISTORY_FAILURE = 'SAVE_SEARCH_HISTORY_FAILURE';

//takes recent search city, state and an e-mail
export const saveToUserSearchHistory = (searchCityAndState, email) => {
	return axios.post("/api/update-search-history", {
		searchCityAndState,
		email
	})
	.then(res => {
		dispatch(saveSearchHistorySucess(res.data));
	})
	.catch(err => {
		dispatch(saveSearchHistoryFailure(err));
	});
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
