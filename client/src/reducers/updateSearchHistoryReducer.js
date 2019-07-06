import { 
  UPDATESEARCHHISTORY } from '../actions/updateSearchHistoryAction';

export const update = (state = {searchData: ''}, action) => {
  switch (action.type) {
    case UPDATESEARCHHISTORY:
      // don't mutate state here
      var newObject = {searchData: action.data};
      return Object.assign({}, state, newObject);
    default:
      return state;
  }
}
