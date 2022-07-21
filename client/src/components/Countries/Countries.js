import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getCountries } from "../../redux/actions";
import CountryCard from '../CountryCard/CountryCard';
import style from './countries.module.css';


export default function Countries() {
  let countries = useSelector(state => state.countries);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState('ascAlph');

  useEffect(() => {
    dispatch(getCountries());
  },[dispatch]);
  

  //FALTA FILTRADO POR CONTINENTE Y ACTIVIDAD

  //ORDENAMIENTO
  if(order === 'ascAlph') {
    countries = countries.sort((a, b) => {
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });
  } else if (order === 'desAlph') {
    countries = countries.sort((a, b) => {
      return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
    });
  } else if(order === 'ascPop') {
    countries = countries.sort((a, b) => {
      if(a.population > b.population ) return 1;
      if(a.population < b.population ) return -1;
      return 0;
    });
  } else if(order === 'desPop') {
    countries = countries.sort((a, b) => {
      if(a.population < b.population ) return 1;
      if(a.population > b.population ) return -1;
      return 0;
    });
  }
  const handleOrder = (event) => {
    setCurrentPage(0);
    setOrder(event.target.value);
  }
  
  const filteredByName = countries.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  //PAGINACION
  const paginatedCountries = () => {
    if (search.length === 0) {
      if(currentPage === 0) return countries.slice(currentPage, currentPage + 9);
      return countries.slice(currentPage, currentPage + 10);
    }
    if(filteredByName) {
      if(currentPage === 0) return filteredByName.slice(currentPage, currentPage + 9);
      return filteredByName.slice(currentPage, currentPage + 10);
    }
  }
  const nextPage = () => {
    if(filteredByName.length > currentPage + 10) {
      setCurrentPage(currentPage + 10);
    }
  }
  const prevPage = () => {
    if(currentPage > 0) setCurrentPage(currentPage - 10);
  }
  const handleChange = (event) => {
    setCurrentPage(0);
    setSearch(event.target.value);
  }

  return (
    <div className={style.container}>
      <h2>Countries</h2>
      <input type='text' placeholder='Search country' onChange={handleChange} value={search}/>
      <div>
        <select value={order} onChange={handleOrder}>
          <option value='ascAlph' default>Ascending Alphabetic</option>
          <option value='desAlph'>Descending Alphabetic</option>
          <option value='ascPop'>Ascending Population</option>
          <option value='desPop'>Descending Population</option>
        </select>
      </div>
      <div className={style.box}>
        {countries && paginatedCountries().map(country => {
          return <CountryCard country={country}/>
        })}
      </div>
      <div>
        <button onClick={prevPage}>Back</button>
        <button onClick={nextPage}>Next</button>
      </div>
    </div>
  );
}