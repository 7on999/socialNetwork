import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css';

const Navbar = () => {
 return   <nav className={s.nav}> 
 <div className = {s.item}> <NavLink to ='/profile' activeClassName={s.activeLink}> Profile </NavLink> </div>
 <div className = {s.item}> <NavLink to ='/dialogs' activeClassName={s.activeLink}> Messages </NavLink> </div>
 <div className = {s.item}> <NavLink to = '/news' activeClassName={s.activeLink}> News </NavLink> </div>
 <div className = {s.item}> <NavLink to = '/users' activeClassName={s.activeLink}> users </NavLink> </div>
 <div className = {s.item}> <a href = '/music'> Music </a> </div>
 <div className = {s.item}> <a href = '/settings'> Settings  </a> </div>
</nav>
}
export default Navbar;