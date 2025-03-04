import styles from './Item.module.scss';
import { MdNavigateNext } from 'react-icons/md';
import { Link } from 'react-router-dom';

function Item({ data, ...props }) {

  const locale = "fi-FI";

 
  // Muunnetaan suorituspäivämäärä oikeaan muotoon
  const exerciseDate = data.exerciseDate ? new Date(data.exerciseDate).toLocaleDateString(locale) : null;

  // Muotoillaan suoritusaika
  const duration = data.duration ? `${data.duration} min` : '';


  const type = data.type ? `${data.type}` : '';  


  return (
    <div className={styles.item}>
      <div className={styles.item_data}>
        <div className={styles.item_type}>{data.type}</div>  
        <div className={styles.item_duration}>{duration}</div> 
        

        <div className={styles.item_exerciseDate}>{exerciseDate}</div> 
        <div className={styles.item_rating}>{data.rating}</div>
      </div>
      <div className={styles.item_edit}>
        <Link to={"/edit/" + data.id}><MdNavigateNext /></Link>
      </div>
    </div>
  );
}

export default Item;
