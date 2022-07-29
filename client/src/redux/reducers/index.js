const initialState = {
  isLoading: true,
  countries: [],
  country: {},
  countryDetail: {},
  activities: [],
  activity: []
};

function rootReducer(state = initialState, action) {
  switch(action.type) {
    case 'COUNTRY_LOADING': {
      return {
        ...state,
        isLoading: true
      }
    }
    case 'GET_COUNTRIES':
      return {
        ...state,
        countries: action.payload
      }
    case 'GET_COUNTRY':
      return {
        ...state,
        country: action.payload
      }
    case 'GET_COUNTRY_DETAIL':
      return {
        ...state,
        countryDetail: action.payload,
        isLoading: false
      }
    case 'ADD_ACTIVITY':
      return {
        ...state,
        activity: action.payload
      }
    case 'GET_ACTIVITIES': 
      return {
        ...state,
        activities: action.payload
      }
    default: 
      return {...state}
  }
}

export default rootReducer;