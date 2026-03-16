import { SELECTORS } from './constants/constants';

declare global {
  namespace Cypress {
    interface Chainable {
      addIngredient(type: 'bun' | 'main' | 'sauce'): Chainable<void>;
      submitOrder(): Chainable<void>;
      closeOrderModal(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('addIngredient', (type: 'bun' | 'main' | 'sauce') => {
  const selectorMap = {
    bun: SELECTORS.ingredientBun,
    main: SELECTORS.ingredientMain,
    sauce: SELECTORS.ingredientSauce
  };

  cy.get(selectorMap[type])
    .contains('Добавить')
    .first()
    .click()
    .as(`ingredient${type.charAt(0).toUpperCase() + type.slice(1)}`);
});

Cypress.Commands.add('submitOrder', () => {
  cy.get(SELECTORS.orderButton).click().as('orderButton');
});

Cypress.Commands.add('closeOrderModal', () => {
  cy.get(SELECTORS.modalCloseButton).click();
});

export {};
