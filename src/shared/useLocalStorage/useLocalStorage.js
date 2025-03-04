import { useEffect, useState } from "react";


/**
 * React Hook, tallentaa ja hakee tietoja `localStorage`-muistista.
 * hook mahdollistaa tietojen tallentamisen paikalliseen tallennustilaan
 * ja tietojen palauttamisen käyttöliittymän uudelleenrenderöityessä.
 * 
 * @example
 * import useLocalStorage from './useLocalStorage.js'
 *
 * const ExampleComponent = () => {
 *   //`useLocalStorage`-hook. määritellään avain ja alkuarvo.
 *   const [value, setValue, resetValue] = useLocalStorage('myKey', 'defaultValue');
 *
 *   return (
 *     <div>
 *       <p>Tallennettu arvo: {value}</p>
 *       <button onClick={() => setValue('newValue')}>Päivitä arvo</button>
 *       <button onClick={resetValue}>Nollaa arvo</button>
 *     </div>
 *   );
 * };
 * 
 * @param {string} key
 *        `localStorage`-avain, käytetään tietojen tallentamiseen ja hakemiseen.
 * @param {any} defaultState
 *        Alkuarvo palautetaan, jos ei ole aiemmin tallennettua arvoa.
 * @returns {[any, function, function]}
 *          - `value`: Tallennettu arvo `localStorage`-muistista.
 *          - `setValue`: Funktio, jolla voi asettaa uuden arvon `localStorage`-muistiin.
 *          - `resetValue`: Funktio, joka palauttaa alkuarvon ja nollaa `localStorage`-arvon.
 */
const useLocalStorage = (key, defaultState) => {
   // Tilamuuttuja määritellään. Hakee joko
  // localStorage-arvon tai käyttää alkuarvoa.
  const [value, setValue] = useState(
    encode(localStorage.getItem(key) || null) || defaultState
  );

  // Tallennetaan tilamuuttuja aina localStorageen.
  useEffect(() => {
    localStorage.setItem(key, decode(value));
  }, [value]);

  // Alkuarvon palautusfunktio, joka nollaa tilan.
  const resetValue = () => {
    setValue(defaultState);
  };

  return [value, setValue, resetValue];
};

/**
 * Muuntaa arvon JSON-merkkijonoksi.
 * 
 * @param {any} value
 *        Arvo, muutetaan JSON-merkkijonoksi.
 * @returns {string}
 *        JSON-merkkijono.
 */
const decode = (value) => {  
  return JSON.stringify(value);
}

/**
 * Purkaa JSON-merkkijonon alkuperäiseksi arvoksi.
 * 
 * @param {string} value
 *        JSON-merkkijono, joka puretaan alkuperäiseksi arvoksi.
 * @returns {any}
 *        Alkuperäinen arvo.
 */
const encode = (value) => {
  return JSON.parse(value);
}

export default useLocalStorage;
