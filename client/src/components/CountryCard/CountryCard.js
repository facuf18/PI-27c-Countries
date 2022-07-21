import React from "react";
import { Link } from 'react-router-dom';
import style from './countryCard.module.css';

export default function CountryCard({ country }) {
  return (
    <div className={style.card} key={country.id}>
      <img src={country.flag_img} alt={country.name}/>
      <div className={style.text}>
        <Link to={`/countries/${country.id}`}>
          <p>{country.name}</p>
        </Link>
        <p>{country.continent}</p>
      </div>
    </div>
  );
}