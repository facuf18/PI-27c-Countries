import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCountryDetail } from "../../redux/actions";

export default function CountryDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const country = useSelector(state => state.countryDetail);

  useEffect(() => {
    dispatch(getCountryDetail(id));
  },[dispatch, id]);
  
  //VER ACTIVIDADES
  console.log(country.activities)

  country.activities.map(a => console.log(a.name))

  return (
    <div>
      <h2>{country.name}</h2>
      <img src={country.flag_img} alt={country.name} />
      <div>
        <p><b>Country code:</b> {country.id}</p>  
        <p><b>Continent:</b> {country.continent}</p>  
        <p><b>Subregion:</b> {country.subregion}</p>  
        <p><b>Capital:</b> {country.capital}</p>  
        <p><b>Area:</b> {country.area} km2</p>
        <p><b>Population:</b> {country.population}</p>
        <div>
        <b>Activities:</b>
        {country.activities.length > 0 ? country.activities.map(a => {
          return (
          <div>
            <p>Activity: {a.name}</p>
            <p>Difficulty: {a.difficulty}/5</p>
            <p>Duration: {a.duration} minutes</p>
            <p>Season: {a.season}</p>
          </div>
          )
        }) : ' No activities found'}
        </div>
      </div>
    </div>
  );
}