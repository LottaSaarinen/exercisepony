

import styles from './Items.module.scss';
import { FloatingButton } from '../../shared/buttons';
import Item from '../Item/Item';
import { Link, useLoaderData } from 'react-router-dom';


function Items() {
  const data = useLoaderData();  

 
 const items = data.map(item =>
  <Item key={item.id} data={item} />)



  return (
    <div className={styles.items}>
      {items}  
      
      <Link to="/add">
        <FloatingButton secondary>+</FloatingButton>
      </Link>
    </div>
  );
}

export default Items;
