export const getCountries = () => {
  return function(dispatch) {
    return fetch('http://localhost:3001/countries')
      .then(res => res.json())
      .then(countries => {
        dispatch({ type: 'GET_COUNTRIES', payload: countries });
      });
  }
}

export const getCountry = (name) => {
  return function(dispatch) {
    return fetch(`http://localhost:3001/countries?name=${name}`)
      .then(res => res.json)
      .then(country => {
        dispatch({ type: 'GET_COUNTRY', payload: country });
      });
  }
}

export const getCountryDetail = (id) => {
  return function(dispatch) {
    return fetch(`http://localhost:3001/countries/${id}`)
      .then(res => res.json())
      .then(country => {
        dispatch({ type: 'GET_COUNTRY_DETAIL', payload: country });
      });
  }
}