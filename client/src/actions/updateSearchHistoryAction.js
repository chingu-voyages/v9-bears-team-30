export const UPDATESEARCHHISTORY = 'UPDATESEARCHHISTORY';

export const updateSearchHistory = (searchData) => {
	return {
		type: UPDATESEARCHHISTORY,
		searchData: searchData
	}
};
