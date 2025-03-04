import styles from './Menu.module.scss';
import photos from '../../assets/images/photos.svg';
import train from '../../assets/images/train.svg';
import stats from '../../assets/images/stats.svg';
import compete from '../../assets/images/compete.svg';
import { NavLink } from 'react-router-dom';

function Menu() {
  return (
    <div className={styles.menu}>
      <div>
        <NavLink 
          to="./items" 
          className={({ isActive }) => isActive ? styles['link-active'] : ''}>
          <img src={train} alt="training" style={{ width: '50px', height: 'auto' }} />
        </NavLink>
      </div>
      <div>
        <NavLink 
          to="./stats" 
          className={({ isActive }) => isActive ? styles['link-active'] : ''}>
          <img src={stats} alt="stats" style={{ width: '35px', height: 'auto' }} />
        </NavLink>
      </div>
      <div>
        <NavLink 
          to="./competition" 
          className={({ isActive }) => isActive ? styles['link-active'] : ''}>
          <img src={compete} alt="compete" style={{ width: '35px', height: 'auto' }} />
        </NavLink>
      </div>
      <div>
        <NavLink 
          to="./photos" 
          className={({ isActive }) => isActive ? styles['link-active'] : ''}>
          <img src={photos} alt="photos"style={{ width: '40px', height: 'auto' }} />
        </NavLink>
      </div>
    </div>
  );
}

export default Menu;
