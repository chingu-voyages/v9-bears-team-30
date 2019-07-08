import { 
  SAVE_SEARCH_HISTORY_SUCCESS,
  SAVE_SEARCH_HISTORY_FAILURE } from '../actions/saveSearchHistoryAction';

//searchHistory is an array, when reducer receives save action, pushes search to end of array
export const saveSearchHistoryReducer = (state = { searchHistory: [], error: null }, action) => {
  switch (action.type) {
    case SAVE_SEARCH_HISTORY_SUCCESS :
      return {
        ...state,
        error: null,
        searchHistory: [...state.searchHistory, action.payload.newHistory]
      };
    case SAVE_SEARCH_HISTORY_FAILURE :
      return {
        ...state,
        error: action.payload.error.response.data
      };
    default:
      return state;
  }
}
