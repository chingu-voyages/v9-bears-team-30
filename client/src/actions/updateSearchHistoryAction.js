export const UPDATEUSSEARCHCITY = 'UPDATEUSSEARCHCITY';
export const UPDATEUSSEARCHSTATE = 'UPDATEUSSEARCHSTATE';
export const UPDATEUSERSEARCHHISTORY = 'UPDATEUSERSEARCHHISTORY';

export const updateSearchCity = (cityName) => {
	return {
		type: UPDATEUSSEARCHCITY,
		searchCity: cityName
	}
};

export const updateSearchState = (stateName) => {
	return {
		type: UPDATEUSSEARCHSTATE,
		searchState: stateName
	}
};

export const updateUserSearchHistory = (searchCityAndState) => {
	return {
		type: UPDATEUSERSEARCHHISTORY,
		searchCityAndState: searchCityAndState
	}
}