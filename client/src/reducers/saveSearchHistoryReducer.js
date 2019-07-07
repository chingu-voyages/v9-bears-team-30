import { 
  SAVE_SEARCH_HISTORY, 
  SAVE_SEARCH_HISTORY_SUCCESS,
  SAVE_SEARCH_HISTORY_FAILURE } from '../actions/saveSearchHistoryAction';

//searchHistory is an array, when reducer receives save action, pushes search to end of array
export const saveSearchHistoryReducer = (state = {searchHistory: [], action) => {
  switch (action.type) {
    case SAVE_SEARCH_HISTORY :
    return { 
        ...state,
        searchHistory: [...state.searchHistory, action.searchCityAndState]
    }
    default:
      return state;
  }
}
