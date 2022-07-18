const axios = require('axios');
const { Country } = require('../db.js');

const getCountriesFromApi = async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3/all');
    const countries = response.data.map(res => {
      return {
        id: res.cca3,
        name: res.name.common,
        flag_img: res.flags[1],
        continent: res.continents[0],
        capital: res.capital ? res.capital[0] : 'No Capital',
        subregion: res.subregion,
        area: res.area,
        population: res.population,
      }
    });
    return countries;
  } catch (err) {
    throw new Error(err);
  }
}

const setCountriesToDb = async () => {
  try {
    const countries = await getCountriesFromApi();
    await Promise.all(
      countries.map(async country => {
        console.log(country);
        await Country.create(country);
      })
    );
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = setCountriesToDb;