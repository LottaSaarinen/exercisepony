import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';  
import Feeding from './Feeding'; 
import { vi } from 'vitest';  


vi.mock('firebase/auth', () => ({
  getAuth: vi.fn().mockReturnValue({
    onAuthStateChanged: vi.fn((cb) => cb({ uid: 'testUser' })),
  }),
}));

describe('Notebook component', () => {
  test('renders Notebook component and allows editing', async () => {
    render(
      <BrowserRouter>
        <Feeding />
      </BrowserRouter>
    );

    // tarkistetaan, että "Muokkaa ruokintaa" -painike näkyy
    const editButton = screen.getByRole('button', { name: /muokkaa ruokintaa/i });
    expect(editButton).toBeInTheDocument();

    // Klikataan "Muokkaa ruokintaa" -painiketta
    fireEvent.click(editButton);

    // Tarkistetaan, että textarea ei ole enää readonly, koska nyt ollaan muokkaustilassa
    const textarea = screen.getByRole('textbox');
    expect(textarea).not.toHaveAttribute('readonly');

    // Tarkistetaan, että "Tallenna ruokinnan muutokset" -painike tulee näkyviin
    const saveButton = screen.getByRole('button', { name: /tallenna ruokinnan muutokset/i });
    expect(saveButton).toBeInTheDocument();

    // Klikataan tallennuspainiketta
    fireEvent.click(saveButton);

    // Tarkistetaan, että "Muokkaa ruokintaa" -painike ei enää ole näkyvissä
    expect(screen.queryByRole('button', { name: /muokkaa ruokintaa/i })).not.toBeInTheDocument();

    // Odotetaan, että "Tallenna ruokinnan muutokset" -painike pysyy näkyvissä
    expect(screen.getByRole('button', { name: /tallenna ruokinnan muutokset/i })).toBeInTheDocument();
  });
});