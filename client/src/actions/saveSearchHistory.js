export const SAVETOUSERSEARCHHISTORY = 'UPDATEUSERSEARCHHISTORY';

export const saveToUserSearchHistory = (searchCityAndState) => {
	return {
		type: SAVETOUSERSEARCHHISTORY,
		searchCityAndState: searchCityAndState
	}
}