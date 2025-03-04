import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import AddItem from './AddItem.jsx'

describe('AddItem', () => {
  test('Lisäyslomake lähettää tiedot, kun vaadittavat kentät on täytetty', async () => {

    // Alustetaan testauskirjaston käyttäjäinteraktiot.
    const user = userEvent.setup()

    // Muodostetaan kulutyyppi-lista.
    const typelist = ['Auto','Sähkö','Vakuutus']

    // Lomakkeelle syötettävät tiedot.
    const formdata = {
      type: typelist[1],     // kulutyyppi-listan toinen alkio
  
      duration: 30 ,           // muuttetaan merkkijonoksi "10" -> numero 10
      exerciseDate: "2023-11-01",
      rating: "sujui tosi hyvin",
      comment: "tosi hyvin",
    }

    // Muodostetaan lomakekäsittelijää simuloiva funktio.
    // Testin kannalta riittää, että nähdään kuinka monta
    // kertaa funktiota kutsuttiin ja millä arvolla.
    const handleItemSubmit = vi.fn(() => true)

    // Renderöidään komponentti.
    render(<AddItem onItemSubmit={handleItemSubmit} 
                    typelist={typelist} />, {wrapper: BrowserRouter} )
    
    // Valitaan kulutyyppi ja tarkistetaan, että
    //  - listasta on valittu oikea valinta ja 
    //  - lisäysnappi on disabloitu.
    await user.selectOptions(screen.getByLabelText('Treenityyppi'), formdata.type)
    expect(screen.getByRole('option', {name: formdata.type}).selected).toBe(true)
    expect(screen.getByRole('button', {name: 'LISÄÄ'}).disabled).toBe(true)

    // Syötetään summa ja tarkistetaan, että
    //  - kentän arvo on sama kuin syötetty arvo ja 
    //  - lisäysnappi on disabloitu.
    await user.type(screen.getByLabelText('treeniin käytetty aika'), formdata.duration.toString())  // muutetaan stringiksi
    expect(screen.getByLabelText('treeniin käytetty aika')).toHaveValue(formdata.duration)
    expect(screen.getByRole('button', {name: 'LISÄÄ'}).disabled).toBe(true)
    
    await user.type(screen.getByLabelText('pvm'), formdata.exerciseDate)
    expect(screen.getByLabelText('pvm')).toHaveValue(formdata.exerciseDate)
    expect(screen.getByRole('button', {name: 'LISÄÄ'}).disabled).toBe(false)
    
    await user.selectOptions(screen.getByLabelText('Arvio'), formdata.rating)
    expect(screen.getByRole('option', {name: formdata.rating}).selected).toBe(true)
    expect(screen.getByRole('button', {name: 'LISÄÄ'}).disabled).toBe(false)
   
    await user.type(screen.getByLabelText('Kommentti'), formdata.comment)
    expect(screen.getByLabelText('Kommentti')).toHaveValue(formdata.comment)
    expect(screen.getByRole('button', {name: 'LISÄÄ'}).disabled).toBe(false)

    await user.click(screen.getByRole('button', {name: 'LISÄÄ'}))
    expect(handleItemSubmit).toHaveBeenCalledTimes(1);
    const submittedItem = handleItemSubmit.mock.lastCall.shift()
    expect(submittedItem).toMatchObject(formdata)
  })
})
