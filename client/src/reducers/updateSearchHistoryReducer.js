import { 
  UPDATEUSSEARCHCITY,
  UPDATEUSSEARCHSTATE,
  UPDATEUSERSEARCHHISTORY } from '../actions/updateSearchHistoryAction';


export const updateSearchHistoryReducer = (state = {searchCity: 'New York', searchState: 'NY', searchCityAndState: {}}, action) => {
  switch (action.type) {
    case UPDATEUSSEARCHCITY:
      // don't mutate state here
      var newObject = {searchCity: action.searchCity};
      return Object.assign({}, state, newObject);
    case UPDATEUSSEARCHSTATE:
      // don't mutate state here
      var newObject = {searchState: action.searchState};
      return Object.assign({}, state, newObject);
    default:
      return state;
  }
}
