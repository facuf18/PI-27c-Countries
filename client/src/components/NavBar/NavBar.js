import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../img/logo.png';
import style from './NavBar.module.css';

export default function NavBar() {
  return (
    <div>
      <header className={style.navbar}>
      <div className={style.logo}>
        <img src={Logo} alt='logo' width='70px' />
      </div>
      <nav>
        <ul className={style.list}>
          <li className={style.listItem}>
            <NavLink exact to='/'>Home</NavLink>
            <NavLink to='/countries'>Countries</NavLink>
            <NavLink to='/activities'>Activities</NavLink>
          </li>
        </ul>
      </nav>
    </header>
    </div>
  );
}