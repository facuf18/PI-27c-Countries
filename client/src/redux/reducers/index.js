const initialState = {
  countries: [],
  country: {},
  countryDetail: {}
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
    default: 
      return {...state}
  }
}