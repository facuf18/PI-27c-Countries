import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getCountries } from "../../redux/actions";
import style from './countries.module.css';
import CountryCard from '../CountryCard/CountryCard';


export default function Countries() {
  const countries = useSelector(state => state.countries);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(getCountries());
  },[dispatch]);
  
  
  const filteredByName = countries.filter(c => c.name.includes(search));


  //PAGINACION
  const paginatedCountries = () => {
    if (search.length === 0 ) {
      if(currentPage === 0) return countries.slice(currentPage, currentPage + 9);
      return countries.slice(currentPage, currentPage + 10);
    }

  
    if(filteredByName) {
      if(currentPage === 0) return filteredByName.slice(currentPage, currentPage + 9);
      return filteredByName.slice(currentPage, currentPage + 10);
    }
  }
  const nextPage = () => {
    setCurrentPage(currentPage + 10);
  }
  const prevPage = () => {
    if(currentPage > 0) setCurrentPage(currentPage - 10);
  }

  const handleChange = (e) => {
    setCurrentPage(0);
    console.log(e.taget.value)
    setSearch(e.taget.value);
  }

  return (
    <div className={style.container}>
      <h2>Countries</h2>
      <input type='text' placeholder="Search country" onChange={handleChange} />
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