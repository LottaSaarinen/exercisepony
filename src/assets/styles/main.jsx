import React from 'react'  // Tuodaan React-kirjasto, joka on tarvittava React-komponenttien luomiseen ja renderöintiin
import ReactDOM from 'react-dom/client'  // Tuodaan ReactDOM, joka vastaa React-komponenttien renderöinnistä DOM-puolelle
import App from './components/App'  // Tuodaan pääkomponentti `App`, joka toimii sovelluksen juurena
import './assets/styles/main.scss'  // Tuodaan sovelluksen päätyylit SCSS-muodossa


// Käynnistetään sovellus ja renderöidään se DOMiin
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>  {/* React.StrictMode auttaa löytämään mahdolliset virheet ja ongelmat kehitysvaiheessa */}
    <App />  {/* Sovelluksen pääkomponentti, joka renderöidään */}
  </React.StrictMode>,
)
