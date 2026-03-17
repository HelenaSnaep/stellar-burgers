export const testUrl = 'http://localhost:4000';

export const SELECTORS = {
  ingredientBun: '[data-cy=ingredients-bun]',
  ingredientMain: '[data-cy=ingredients-main]',
  ingredientSauce: '[data-cy=ingredients-sauce]',

  constructorBunTop: '[data-cy=constructor-bun-1]',
  constructorBunBottom: '[data-cy=constructor-bun-2]',

  constructorIngredient: '[data-cy=constructor-ingredient]',
  orderButton: '[data-cy=order-summ] button',
  orderNumber: '[data-cy=order-number]',

  ingredientModal: '#modals',
  modalCloseButton: '[data-cy=modal-close]',

  constructor: '[data-cy=constructor]'
} as const;
