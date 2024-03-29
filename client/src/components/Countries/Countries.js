import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getActivities, getCountries } from "../../redux/actions";
import CountryCard from '../CountryCard/CountryCard';
import Loader from "../Loader/Loader";
import style from './countries.module.css';


export default function Countries() {
  let countries = useSelector(state => state.countries);
  let isLoading = useSelector(state => state.isLoadingCountries);
  let activities = useSelector(state => state.activities);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState('ascAlph');
  const [continent, setContinent] = useState('all');
  const [activity, setActivity] = useState('');

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  },[dispatch]);
  

  //FILTRO ACTIVIDAD
  const handleActivityFilter = (e) => {
    setCurrentPage(0);
    setActivity(e.target.value);
  }
  if(activity !== '') {
    let filterByActivity = activities.filter(a => a.name === activity);
    countries = filterByActivity[0].countries;
  }


  //FILTRO CONTINENTE
  const handleContinentFilter = (e) => {
    setCurrentPage(0);
    setContinent(e.target.value);
  }
  if(continent !== 'all') {
    countries = countries.filter(c => c.continent.toLowerCase() === continent);
  }

  //ORDENAMIENTO
  const handleOrder = (event) => {
    setCurrentPage(0);
    setOrder(event.target.value);
  }
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
  
  //PAGINACION Y BUSQUEDA
  const handleChange = (e) => {
    setCurrentPage(0);
    setSearch(e.target.value);
  }
  const filteredByName = countries.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  const paginatedCountries = () => {
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

  let countriesToShow = paginatedCountries();

  return (
    <div className={style.container}>
      <h2>Countries</h2>
      <div className={style.utilsBar}>
        <input className={style.search} type='text' placeholder='Search country' onChange={handleChange} value={search}/>
        <div className={style.selectors}>
          <select className={style.select} value={order} onChange={handleOrder}>
            <option value='ascAlph' default>Ascending Alphabetic</option>
            <option value='desAlph'>Descending Alphabetic</option>
            <option value='ascPop'>Ascending Population</option>
            <option value='desPop'>Descending Population</option>
          </select>
          <select className={style.select} value={continent} onChange={handleContinentFilter}>
            <option value='all' default>All continents</option>
            <option value='africa'>Africa</option>
            <option value='antarctica'>Antarctica</option>
            <option value='asia'>Asia</option>
            <option value='europe'>Europe</option>
            <option value='north america'>North America</option>
            <option value='south america'>South America</option>
            <option value='oceania'>Oceania</option>
          </select>
          <select className={style.select} value={activity} onChange={handleActivityFilter}>
            <option value='' default>Activities</option>
            {activities && activities.map(a => {
              return <option key={a.id} value={a.name}>{a.name}</option>
            })}
          </select>
          </div>
      </div>
        {isLoading ? (
        <Loader marginBottom='30px'/>
        ) : (
        <div className={style.box}>
          {countries && countriesToShow.map(country => {
            return <CountryCard country={country}/>
          })}
        </div>)}
      <div className={style.pagButtons}>
        <button onClick={prevPage}>Back</button>
        <button onClick={nextPage}>Next</button>
      </div>
    </div>
  );
}