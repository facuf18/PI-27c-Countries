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
        <p><b>Activities:</b> {country.activities}</p>
      </div>
    </div>
  );
}