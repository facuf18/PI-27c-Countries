const initialState = {
  countries: [],
  country: {},
  countryDetail: {},
  activities: [],
  activity: []
};

export default function rootReducer(state = initialState, action) {
  switch(action.type) {
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
        countryDetail: action.payload
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