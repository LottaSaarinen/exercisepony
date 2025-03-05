import React from 'react';
import pay from '../../assets/images/pay.svg'; 
import pills from '../../assets/images/pills.svg'; 
import shoe from '../../assets/images/shoe.svg';
import oat from '../../assets/images/oat.svg';
import calendar from '../../assets/images/calendar.svg';
import styles from './Header.module.scss'
import { NavLink } from 'react-router-dom'



function Header() {

  return (
    

          <div className={styles.menu}> 
      
      <div><NavLink to="./"
                className={({ isActive }) => isActive ? styles['link-active'] : ''}>
                <img src={calendar} alt="calendar" style={{ width: '35px',  height: 'auto' }} /></NavLink></div>

      
      <div><NavLink to="./shoe"
                className={({ isActive }) => isActive ? styles['link-active'] : ''}>
                <img src={shoe} alt="shoe" style={{ width: '35px',  height: 'auto' }} /></NavLink></div>

          
      <div><NavLink to="./feeding"
                className={({ isActive }) => isActive ? styles['link-active'] : ''}>
                <img src={oat} alt="feeding" style={{ width: '35px',  height: 'auto' }} /></NavLink></div>


      <div><NavLink to="./vet"
                className={({ isActive }) => isActive ? styles['link-active'] : ''}>
                  <img src={pills} alt="vet" style={{ width: '35px',  height: 'auto' }} /></NavLink></div>

          
      <div><NavLink to="https://billspony.web.app/"><img src={pay} alt="pay" style={{ width: '35px',  height: 'auto' }} /></NavLink></div>



  
    
    </div>
  );}
export default Header;
