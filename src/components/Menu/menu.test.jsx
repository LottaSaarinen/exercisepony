import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Menu from './Menu';

describe('Menu component', () => {
  it('renders menu items with correct images and links', () => {
    render(
      <Router>
        <Menu />
      </Router>
    );
    

    // Varmistaa, että kuvat renderöityvät
    const trainImage = screen.getByAltText('training');
    const statsImage = screen.getByAltText('stats');
    const competeImage = screen.getByAltText('compete');
    const photosImage = screen.getByAltText('photos');

    expect(trainImage).toBeInTheDocument();
    expect(statsImage).toBeInTheDocument();
    expect(competeImage).toBeInTheDocument();
    expect(photosImage).toBeInTheDocument();

    // Varmistaa, että linkit renderöityy ja href:t on oikein
    const trainLink = screen.getByAltText('training').closest('a');
    const statsLink = screen.getByAltText('stats').closest('a');
    const competeLink = screen.getByAltText('compete').closest('a');
    const photosLink = screen.getByAltText('photos').closest('a');

    // absoluuttiset polkut (React Router renderöi niin)
    expect(trainLink).toHaveAttribute('href', '/items');
    expect(statsLink).toHaveAttribute('href', '/stats');
    expect(competeLink).toHaveAttribute('href', '/competition');
    expect(photosLink).toHaveAttribute('href', '/photos');
  });

  it('applies the active class when the link is active', () => {
    render(
      <Router>
        <Menu />
      </Router>
    );

    const trainLink = screen.getByAltText('training').closest('a');
    const statsLink = screen.getByAltText('stats').closest('a');
    const competeLink = screen.getByAltText('compete').closest('a');
    const photosLink = screen.getByAltText('photos').closest('a');

    // Testaa, että linkit saavat oikeen scss- luokan, kun aktiivisia
    expect(trainLink).not.toHaveClass('link-active');
    expect(statsLink).not.toHaveClass('link-active');
    expect(competeLink).not.toHaveClass('link-active');
    expect(photosLink).not.toHaveClass('link-active');
  });
});
