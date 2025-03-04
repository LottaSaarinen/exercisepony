import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Item from './Item.jsx'

describe('Item', () => {
  test('Komponentti renderöityy merkinnän tiedoilla', () => {
    // Määritellään merkinnän tiedot.
    const data = {
      id:          "1",
      type:        "Sähkö",
      duration:      50,
      exerciseDate: "2023-03-20",
      rating:        "tosi hyvä",
      comment:       "jee,jee"   
    }
    render(<Item data={data} />, {wrapper: BrowserRouter})
    
    // Määritetään lokaaliasetukset.
    const locale = "fi-FI"
  
    // Tyyppi
    const typeElement = screen.getByText(data.type)
    expect(typeElement).toBeInTheDocument()

    // päivä
    const exerciseDate = new Date(data.exerciseDate).toLocaleDateString(locale)
    const dateElement = screen.getByText(exerciseDate)
    expect(dateElement).toBeInTheDocument() 

  
  })
})
