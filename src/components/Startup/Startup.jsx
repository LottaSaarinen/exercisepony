import styles from './Startup.module.scss'
import Button from '../../shared/buttons'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

function Startup (props) {

  // Luodaan yhteys Googlen kirjautumiseen.
  const google = new GoogleAuthProvider()

  // Käyttäjä valitsee kirjautumisessa tilin,
  // jolla kirjautuu.
  google.setCustomParameters({
    prompt : 'select_account '
  })

  // Kytketään Google-kirjautuminen popup-kirjautumiseen.
  const signInWithGooglePopup = () => signInWithPopup(props.auth, google)

  // Kirjautumisnapin käsitelijä, jossa kutsutaan auth-palvelun
  // popup-kirjautumiskäsittelijää, joka on kytketty Googlen
  // kirjautumiseen.
  const signInGoogle = async () => {
    await signInWithGooglePopup()
  }

  
  return (
    <div className={styles.startup}>
    
      <div>Tervetuloa käyttämään hevosentreenisovellusta,
           jolla voi seurata hevosen treenejä sekä muita tapahtumia.</div>
      <Button onClick={signInGoogle}>Kirjaudu Google-tunnuksilla</Button>
    </div>
  )
}

export default Startup

