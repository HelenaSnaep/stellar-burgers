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

    cy.get(SELECTORS.constructor).should('contain', 'Ингредиент 1');

    cy.get(SELECTORS.constructorBunTop).as('bunTop');
    cy.get(SELECTORS.constructorBunBottom).as('bunBottom');

    cy.get('@bunTop').should('contain', 'Ингредиент 1');
    cy.get('@bunBottom').should('contain', 'Ингредиент 1');
  });

  it('adds main ingredient to constructor', () => {
    cy.addIngredient('main');

    cy.get(SELECTORS.constructorIngredients).should('contain', 'Ингредиент 2');
  });

  it('adds sauce to constructor', () => {
    cy.addIngredient('sauce');

    cy.get(SELECTORS.constructorIngredients).should('contain', 'Ингредиент 4');
  });

  it('opens ingredient modal', () => {
    cy.get(SELECTORS.ingredientBun).contains('Ингредиент 1').click();

    cy.get(SELECTORS.ingredientModal).should('contain', 'Детали ингредиента');
  });

  it('closes ingredient modal by close button', () => {
    cy.get(SELECTORS.ingredientBun).contains('Ингредиент 1').click();

    cy.get(SELECTORS.ingredientModal).should('contain', 'Детали ингредиента');

    cy.closeOrderModal();

    cy.get(SELECTORS.ingredientModal).should(
      'not.contain',
      'Детали ингредиента'
    );
  });

  it('creates order', () => {
    cy.intercept('GET', 'api/auth/user', {
      fixture: 'user.json'
    });

    cy.intercept('POST', 'api/orders', {
      fixture: 'order.json'
    });

    window.localStorage.setItem('accessToken', 'test-token');
    window.localStorage.setItem('refreshToken', 'test-token');

    cy.addIngredient('bun');
    cy.addIngredient('main');

    cy.submitOrder();

    cy.get(SELECTORS.orderNumber).should('contain', '123456');

    cy.closeOrderModal();

    cy.get(SELECTORS.constructorIngredients).should(
      'not.contain',
      'Ингредиент 2'
    );
  });
});
