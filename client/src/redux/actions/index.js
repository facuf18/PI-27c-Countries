export const getCountries = () => {
  return async function(dispatch) {
    return await fetch('https://find-your-country.herokuapp.com/countries')
      .then(res => res.json())
      .then(countries => {
        dispatch({ type: 'COUNTRIES_LOADING' });
        dispatch({ type: 'GET_COUNTRIES', payload: countries });
      });
  }
}

export const getCountry = (name) => {
  return async function(dispatch) {
    return await fetch(`https://find-your-country.herokuapp.com/countries?name=${name}`)
      .then(res => res.json())
      .then(country => {
        dispatch({ type: 'GET_COUNTRY', payload: country });
      });
  }
}

export const getCountryDetail = (id) => {
  return async function(dispatch) {
    return await fetch(`https://find-your-country.herokuapp.com/countries/${id}`)
      .then(res => res.json())
      .then(country => {
        dispatch({ type: 'COUNTRY_LOADING' });
        dispatch({ type: 'GET_COUNTRY_DETAIL', payload: country });
      });
  }
}

export const addActivity = (activity) => {
  return async function(dispatch) {
    return await fetch('https://find-your-country.herokuapp.com/activities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(activity)
    })
    .then(res => res.json())
    .then(data => {
      dispatch({ type: 'ADD_ACTIVITY', payload: data });
    });
  }
}

export const getActivities = () => {
  return async function(dispatch) {
    return await fetch('https://find-your-country.herokuapp.com/activities')
      .then(res => res.json())
      .then(activities => {
        dispatch({ type: 'GET_ACTIVITIES', payload: activities });
      });
  }
}