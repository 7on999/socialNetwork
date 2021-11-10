import React from 'react';
import s from './Header.module.css';
import {NavLink} from 'react-router-dom';

const Header = (props)=> {
    return  <header className={s.header}>
    <img src='https://st.depositphotos.com/1428083/2946/i/600/depositphotos_29460297-stock-photo-bird-cage.jpg'></img>

<div className={s.loginBlock}>
   {props.isAuth? 
   <div>
      {props.login} - <button onClick = {props.logout}> log out </button> 
   </div>
   :<NavLink to={'/login/'}>Login</NavLink>} 
</div>
   </header> 
}

export default Header;