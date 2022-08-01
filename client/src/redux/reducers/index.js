const initialState = {
  isLoadingCountries: true,
  isLoadingCountry: true,
  countries: [],
  country: {},
  countryDetail: {},
  activities: [],
  activity: []
};

function rootReducer(state = initialState, action) {
  switch(action.type) {
    case 'COUNTRIES_LOADING': {
      return {
        ...state,
        isLoadingCountries: true
      }
    }
    case 'COUNTRY_LOADING': {
      return {
        ...state,
        isLoadingCountry: true
      }
    }
    case 'GET_COUNTRIES':
      return {
        ...state,
        countries: action.payload,
        isLoadingCountries: false
      }
    case 'GET_COUNTRY':
      return {
        ...state,
        country: action.payload,
      }
    case 'GET_COUNTRY_DETAIL':
      return {
        ...state,
        countryDetail: action.payload,
        isLoadingCountry: false
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