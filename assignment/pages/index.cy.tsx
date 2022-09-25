import SearchBar from '../components/SearchBar';
import { GenresProvider } from '../contexts/GenresContext';
import { TitlesProvider } from '../contexts/TitlesContext';
import Home from './';
import Details from './[id]';

// Constants for the selectors
const searchBarSelector = '[data-cy=searchbar]';
const multiSelectChipSelector = '[data-cy=multi-select-chip]';
const inputClearSelector = '[data-cy=input-clear]';
const inputSearchSelector = '[data-cy=input-search]';
const moviesBlockSelector = '[data-cy=movies-block]';

describe('Home Page', () => {
  beforeEach(() => {
    // Arrange
    cy.mount(
      <TitlesProvider>
        <GenresProvider>
          <Home />
        </GenresProvider>
      </TitlesProvider>
    );
  });
  it('should mount correctly', () => {
    //Arrange

    //Assert
    cy.get(searchBarSelector).should('have.value', '');
    cy.get(searchBarSelector).within(() => {
      cy.get('input').should('have.value', '');
    });
  });

  it('when searching for title', () => {
    //Arrange

    //Act
    cy.get(searchBarSelector).type('Spidermann');
    cy.get(searchBarSelector).type('{backspace}');

    //Assert
    cy.get(searchBarSelector).within(() => {
      cy.get('input').should('have.value', 'Spiderman');
    });
  });

  it('when searching for title and delete', () => {
    //Arrange

    //Act
    cy.get(searchBarSelector).type('Spidermann');
    cy.get(searchBarSelector).type('{backspace}');
    cy.get(inputClearSelector).click();

    //Assert
    cy.get(searchBarSelector).within(() => {
      cy.get('input').should('have.value', '');
    });
  });

  it('when searching for title, execute search', () => {
    //Arrange

    //Act
    cy.get(searchBarSelector).type('Spiderman');
    cy.get(inputSearchSelector).click();

    //Assert
    cy.get(moviesBlockSelector).within(() => {
      cy.contains('Release Year');
    });
  });

  it('when scrolling and goes up', () => {
    //Arrange

    //Act
    cy.get(searchBarSelector).type('Spiderman');
    cy.get(inputSearchSelector).click();
    cy.scrollTo('bottom');

    //Assert
    cy.get('[data-testid="KeyboardArrowUpIcon"]').click();
  });
});
