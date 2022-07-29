import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../../redux/actions";
import { useForm } from "../../hooks/useForm";
import style from './activityForm.module.css'

const initialForm = {
  name: '',
  difficulty: '',
  duration: '',
  season: '',
  countries: []
};

const validationsForm = (form) => {
  let errors = {};
  let regexName =  /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;


  if(!form.name.trim()) {
    errors.name = 'Please, enter the activity name';
  } else if(!regexName.test(form.name.trim())) {
    errors.name = 'The field name only admits words and blank spaces'
  }

  if(!form.difficulty.trim()) {
    errors.difficulty = 'Please, select a difficulty level';
  }

  if(!form.duration.trim()) {
    errors.duration = 'Plase, enter the activity duration in minutes';
  }

  if(!form.season.trim()) {
    errors.season = 'Please, select a season';
  }

  if(form.countries.length === 0) {
    errors.countries = 'Please, select at least one country';
  }

  return errors;
}

export default function ActivityForm() {
  const allCountries = useSelector(state => state.countries);
  const dispatch = useDispatch();

  const {
    form,
    errors,
    handleChange,
    handleBlur,
    handleSubmit
  } = useForm(initialForm, validationsForm);

  useEffect(() => {
    dispatch(getCountries());
  },[dispatch]);

  return (
    <div className={style.container}>
      <h2>Activity</h2>
      <form onSubmit={handleSubmit} method='POST'>
        <div>
          <label for='name'>Name:</label>
          <input 
            type='text'
            name='name' 
            value={form.name} 
            onBlur={handleBlur} 
            onChange={handleChange} 
            required
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label for='difficulty'>Difficulty:</label>
          <select 
            type='text' 
            name='difficulty' 
            value={form.difficulty} 
            onBlur={handleBlur} 
            onChange={handleChange} 
            required
          >
            <option value=''>Select difficulty</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          {errors.difficulty && <p>{errors.difficulty}</p>}
        </div>
        <div>
          <label for='duration'>Duration:</label>
          <input 
            type='text' 
            name='duration' 
            value={form.duration} 
            onBlur={handleBlur} 
            onChange={handleChange} 
            required 
          />
          {errors.duration && <p>{errors.duration}</p>}
        </div>
        <div>
          <label for='season'>Season:</label>
          <select 
            type='text' 
            name='season' 
            value={form.season} 
            onBlur={handleBlur} 
            onChange={handleChange} 
            required
          >
            <option value=''>Select season</option>
            <option value='Summer'>Summer</option>
            <option value='Autumn'>Autumn</option>
            <option value='Winter'>Winter</option>
            <option value='Spring'>Spring</option>
          </select>
          {errors.season && <p>{errors.season}</p>}
        </div>
        <div>
          <label for='countries'>Countries:</label>
          <select 
            type='text' 
            name='countries' 
            value={form.countries} 
            onBlur={handleBlur}
            onChange={handleChange}
          >
            <option value=''>Select countries</option>
            {allCountries && allCountries.map(country => {
              return <option key={country.id} value={country.id}>{country.name}</option>
            })}
          </select>
          {errors.countries && <p>{errors.countries}</p>}
          <div>
            <p>Added countries:</p>
            {form.countries && form.countries.map(c => {
              return <span key={c}>{c}</span>
            })}
          </div>
        </div>
        <button type='submit'>Add</button>
      </form>
    </div>
  );
}