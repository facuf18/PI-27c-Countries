import React from "react";
import style from './countryCard.module.css';

export default function CountryCard({ country }) {
  return (
    <div className={style.card} key={country.id}>
      <img src={country.flag_img} alt={country.name}/>
      <div className={style.text}>
        <h5>{country.name}</h5>
        <p>{country.continent}</p>
      </div>
    </div>
  );
}