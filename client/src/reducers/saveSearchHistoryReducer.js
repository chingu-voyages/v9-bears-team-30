import { 
  SAVE_SEARCH_HISTORY } from '../actions/saveSearchHistoryAction';

//searchHistory is an array, when reducer receives save action, pushes search to end of array
export const saveSearchHistoryReducer = (state = {searchHistory: [], action) => {
  switch (action.type) {
    case SAVETOUSERSEARCHHISTORY :
    return { 
        ...state,
        searchHistory: [...state.searchHistory, action.searchCityAndState]
    }
    default:
      return state;
  }
}
