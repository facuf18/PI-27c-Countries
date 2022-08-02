import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCountryDetail } from "../../redux/actions";
import Loader from "../Loader/Loader";
import style from './countryDetail.module.css';

export default function CountryDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountryDetail(id));
  },[dispatch, id]);
  
  const isLoading = useSelector(state => state.isLoadingCountry);
  const country = useSelector(state => state.countryDetail);

  return (
    <div>
    {isLoading ? (
      <Loader marginTop='20vh'/>
    ) : (
      <div className={style.container}>
      <h2>{country.name} - {country.id}</h2>
      <img src={country.flag_img} alt={country.name} />
      <div>
        <p><b>Continent:</b> {country.continent}</p>  
        <p><b>Subregion:</b> {country.subregion}</p>  
        <p><b>Capital:</b> {country.capital}</p>  
        <p><b>Area:</b> {country.area} km2</p>
        <p><b>Population:</b> {country.population}</p>
        <b>Activities:</b>
        <div className={style.activityContainer}>
          {country.activities.length > 0 ? country.activities.map(a => {
            return (
            <div className={style.activityCard}>
              <div className={style.activityTitle}><b>{a.name.toUpperCase()}</b></div>
              <p><b>Difficulty:</b> {a.difficulty}/5</p>
              <p><b>Duration:</b> {a.duration} minutes</p>
              <p><b>Season:</b> {a.season}</p>
            </div>
            )
          }) : 'No activities found'}
        </div>
      </div>
      </div>
    )}
    </div>
  );
}