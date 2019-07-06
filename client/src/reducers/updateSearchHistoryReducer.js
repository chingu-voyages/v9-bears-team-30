import { 
  UPDATEUSSEARCHCITY,
  UPDATEUSSEARCHSTATE } from '../actions/updateSearchHistoryAction';

export const update = (state = {searchCity: '', searchState: ''}, action) => {
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
