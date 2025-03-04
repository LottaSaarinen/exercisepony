import styles from './Content.module.scss'

function Content(props) {
 // Renderöidään div-elementti, johon lisätään dynaamisesti 'content' luokka SCSS:sta
 //Renderöidään kaikki 'children' eli kaikki propsin kautta komponentille välitetyt sisällöt 
  return (
    <div className={styles.content}>
      { props.children }
    </div>
  )

}


export default Content
