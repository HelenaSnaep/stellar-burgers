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
  describe('order modal works correctly', () => {
    beforeEach(() => {
      cy.intercept('GET', 'api/ingredients', {
        fixture: 'ingredients.json'
      });

      cy.intercept('GET', 'api/auth/user', {
        fixture: 'user.json'
      });

      cy.intercept('POST', 'api/orders', {
        fixture: 'order.json'
      }).as('postOrder');

      window.localStorage.setItem(
        'refreshToken',
        JSON.stringify('test-refresh-token')
      );

      cy.setCookie('accessToken', 'test-access-token');

      cy.visit(testUrl);
    });

    afterEach(() => {
      cy.clearLocalStorage();
      cy.clearCookies();
    });

    it('creates order and clears constructor', () => {
      cy.addIngredient('bun');
      cy.addIngredient('main');
      cy.addIngredient('sauce');

      cy.submitOrder();

      cy.wait('@postOrder');

      cy.get(SELECTORS.orderNumber)
        .should('contain', '123456');

      cy.get(SELECTORS.modalCloseButton)
        .click({ force: true });

      cy.get(SELECTORS.orderNumber)
        .should('not.exist');

      cy.get(SELECTORS.constructor)
        .should('not.contain', 'Ингредиент 1')
        .and('not.contain', 'Ингредиент 2')
        .and('not.contain', 'Ингредиент 4');
    });
  });
});
