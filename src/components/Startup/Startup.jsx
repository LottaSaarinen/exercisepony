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
    
    <div>Welcome to the horse training app, where you can track the horse's training sessions as well as other events.</div>

<Button onClick={signInGoogle}>Sign in with Google</Button>
<div className={styles.up}>
  <div>Google handles the security processes related to password management. The app developer does not have access to the user's passwords.</div>
  
  <div>Data stored in the Firebase app database is encrypted both at rest and during transmission. The app developer or any external user of the account cannot see the data stored in the app.</div>
</div>

    
    </div>
  )
}

export default Startup

