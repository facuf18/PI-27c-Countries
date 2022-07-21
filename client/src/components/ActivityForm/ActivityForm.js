import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addActivity, getCountries } from "../../redux/actions";

export default function ActivityForm() {
  const allCountries = useSelector(state => state.countries);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries());
  },[dispatch]);

  const [data, setData] = useState({
    name: '',
    difficulty: '',
    duration: '',
    season: '',
    countries: []
  });

  const handleChange = (event) => {
    if(event.target.name === 'countries' && event.target.value !== '') {
      setData({
        ...data,
        countries: data.countries.concat(event.target.value)
      })
    } else if (event.target.name !== 'countries' && event.target.value !== ''){
      setData({
        ...data,
        [event.target.name]: event.target.value
      });
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(data);
    dispatch(addActivity(data));
    event.target.reset();
    setData({
      name: '',
      difficulty: '',
      duration: '',
      season: '',
      countries: []
    });
  }

  return (
    <div>
      <h2>Activity form</h2>
      <form onSubmit={handleSubmit} method='POST'>
        <div>
          <label for='name'>Name:</label>
          <input type='text' required name='name' value={data.name} onChange={handleChange} />
        </div>
        <div>
          <label for='difficulty'>Difficulty:</label>
          <select type='text' required name='difficulty' value={data.difficulty} onChange={handleChange}>
            <option value=''>Select difficulty</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <div>
          <label for='duration'>Duration:</label>
          <input type='text' required name='duration' value={data.duration} onChange={handleChange} />
        </div>
        <div>
          <label for='season'>Season:</label>
          <select type='text' required name='season' value={data.season} onChange={handleChange}>
            <option value=''>Select season</option>
            <option value='Summer'>Summer</option>
            <option value='Autumn'>Autumn</option>
            <option value='Winter'>Winter</option>
            <option value='Spring'>Spring</option>
          </select>
        </div>
        <div>
          <label for='countries'>Countries:</label>
          <select type='text' name='countries' value={data.countries} onChange={handleChange}>
            <option value=''>Select countries</option>
            {allCountries && allCountries.map(country => {
              return <option key={country.id} value={country.id}>{country.name}</option>
            })}
          </select>
          <div>
            <p>Added countries:</p>
            {data.countries && data.countries.map(c => {
              return <span>{c}</span>
            })}
          </div>
        </div>
        <button type='submit'>Add</button>
      </form>
    </div>
  );
}