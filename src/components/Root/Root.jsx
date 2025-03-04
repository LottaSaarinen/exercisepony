import styles from './Root.module.scss'  
import { ButtonContainer } from '../../shared/buttons'  
import Content from '../Content'  
import Header from '../Header'  
import Menu from '../Menu'  
import { Outlet } from 'react-router-dom'  

function Root() {

  return (
    <div className={styles.root}>  
      
      <ButtonContainer>  
        <div className={styles.root_app}>
          <Header />  
          <Content>  
            <Outlet />  
          </Content>
          <Menu />  
        </div>
      </ButtonContainer>
    </div>
  )
}

export default Root;  

