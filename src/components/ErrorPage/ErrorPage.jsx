import styles from './ErrorPage.module.scss'  
import { useRouteError } from 'react-router-dom'  

function ErrorPage() {

   // Haetaan reitiltä mahdollinen virhe
   const error = useRouteError();

   return (
      <div className={styles.errorpage}>  
      <h2>Oops!</h2>  
      <p>Unfortunately, an unexpected error occurred.</p>  
      <p>{error.statusText || error.message}</p>  
  </div>
  
   )
}


export default ErrorPage 