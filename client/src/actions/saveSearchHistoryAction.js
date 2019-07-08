import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
export const SAVE_SEARCH_HISTORY = 'SAVE_SEARCH_HISTORY';
export const SAVE_SEARCH_HISTORY_SUCCESS = 'SAVE_SEARCH_HISTORY_SUCCESS';
export const SAVE_SEARCH_HISTORY_FAILURE = 'SAVE_SEARCH_HISTORY_FAILURE';

//takes recent search city, state and an e-mail
//sends the search to the user's search history in the database
export const saveToUserSearchHistory = (searchCityAndState, email) => {
	console.log('save history action called: '+searchCityAndState.searchCity+', '+searchCityAndState.searchState)
	return dispatch => {

		//send call to backend
		return axios.put("user/api/update-search-history", {
			searchCityAndState,
			email
		})
		.then(res => {
			//sends new search history to redux store for saving
			dispatch(saveSearchHistorySucess(res.data.data.searchHistory));
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