import React from "react";
import { Link } from 'react-router-dom';
import style from './countryCard.module.css';

export default function CountryCard({ country }) {
  return (
    <div className={style.card} key={country.id}>
      <img src={country.flag_img} alt={country.id}/>
      <div className={style.text}>
        <Link to={`/countries/${country.id}`}>
          <h4>{country.name}</h4>
        </Link>
        <p>{country.continent}</p>
      </div>
    </div>
  );
}