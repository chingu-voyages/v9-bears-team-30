export const UPDATEUSSEARCHCITY = 'UPDATEUSSEARCHCITY';
export const UPDATEUSSEARCHSTATE = 'UPDATEUSSEARCHSTATE';

export const updateSearchCity = (cityName) => {
	return {
		type: UPDATEUSSEARCHCITY,
		searchCity: city
	}
};

export const updateSearchState = (stateName) => {
	return {
		type: UPDATEUSSEARCHSTATE,
		searchState: stateName
	}
};