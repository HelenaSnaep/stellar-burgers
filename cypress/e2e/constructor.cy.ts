import { SELECTORS, testUrl } from '../support/constants/constants';

describe('Constructor Product', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    });

    cy.visit(testUrl);
  });

  it('adds bun to constructor', () => {
    cy.addIngredient('bun');

    cy.get(SELECTORS.constructor)
      .should('contain', 'Ингредиент 1 (верх)')
      .and('contain', 'Ингредиент 1 (низ)');
  });

  it('adds main ingredient to constructor', () => {
    cy.addIngredient('main');

    cy.get(SELECTORS.constructor).should('contain', 'Ингредиент 2');
  });

  it('adds sauce to constructor', () => {
    cy.addIngredient('sauce');

    cy.get(SELECTORS.constructor).should('contain', 'Ингредиент 4');
  });

  it('adds main and sauce together', () => {
    cy.addIngredient('main');
    cy.addIngredient('sauce');

    cy.get(SELECTORS.constructor)
      .should('contain', 'Ингредиент 2')
      .and('contain', 'Ингредиент 4');
  });

  describe('ingredient modal works correctly', () => {
    it('opens ingredient modal with correct ingredient data', () => {
      cy.get(SELECTORS.ingredientBun)
        .contains('Ингредиент 1')
        .click({ force: true });

      cy.get('#modals')
        .should('contain', 'Детали ингредиента')
        .and('contain', 'Ингредиент 1');
    });

    it('closes ingredient modal by close button', () => {
      cy.get(SELECTORS.ingredientBun)
        .contains('Ингредиент 1')
        .click({ force: true });

      cy.get('#modals')
        .should('contain', 'Детали ингредиента')
        .and('contain', 'Ингредиент 1');

      cy.get(SELECTORS.modalCloseButton)
        .should('be.visible')
        .click({ force: true });

      cy.get('#modals').should('not.contain', 'Ингредиент 1');
    });
  });
});
