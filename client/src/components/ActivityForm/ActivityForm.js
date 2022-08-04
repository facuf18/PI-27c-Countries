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
  } else if(!form.difficulty.trim()) {
    errors.difficulty = 'Please, select a difficulty level';
  } else if(!form.duration.trim()) {
    errors.duration = 'Plase, enter the activity duration in minutes';
  } else if(!form.season.trim()) {
    errors.season = 'Please, select a season';
  }else if(form.countries.length === 0) {
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
      <form className={style.formContainer} onSubmit={handleSubmit} method='POST'>
        <div className={style.inputDiv}>
          <label for='name'>Name</label>
          <input 
            type='text'
            name='name' 
            value={form.name} 
            onBlur={handleBlur} 
            onChange={handleChange} 
            required
          />
          {errors.name && <p className={style.error}>{errors.name}</p>}
        </div>
        <div className={style.selectDiv}>
          <label for='difficulty'>Difficulty</label>
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
          {errors.difficulty && <p className={style.error}>{errors.difficulty}</p>}
        </div>
        <div className={style.inputDiv}>
          <label for='duration'>Duration (minutes)</label>
          <input 
            type='text' 
            name='duration' 
            value={form.duration} 
            onBlur={handleBlur} 
            onChange={handleChange} 
            required 
          />
          {errors.duration && <p className={style.error}>{errors.duration}</p>}
        </div>
        <div className={style.selectDiv}>
          <label for='season'>Season</label>
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
          {errors.season && <p className={style.error}>{errors.season}</p>}
        </div>
        <div className={style.selectDiv}>
          <label for='countries'>Countries</label>
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
          {errors.countries && <p className={style.error}>{errors.countries}</p>}
        </div>
        <div className={style.countriesDiv}>
          <p>Added countries:</p>
          <div className={style.countryContainer}>
            {form.countries && form.countries.map(c => {
              return <span className={style.countrySpan} key={c}>{c}</span>
            })}
          </div>
        </div>
        <div className={style.addButton}>
          <button type='submit'>Add</button>
        </div>
      </form>
    </div>
  );
}