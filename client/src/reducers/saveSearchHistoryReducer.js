import { 
  SAVETOUSERSEARCHHISTORY } from '../actions/saveSearchHistoryAction';


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
