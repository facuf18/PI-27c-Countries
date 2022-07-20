import React from "react";
import { Link } from 'react-router-dom';
import style from './Home.module.css';

export default function Home() {
  return (
    <div className={style.container}>
      <Link to='/countries'>
        <button className={style.button}>Go to countries</button>
      </Link>
    </div>
  );
}