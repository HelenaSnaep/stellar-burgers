export const testUrl = 'http://localhost:4000';

export const SELECTORS = {
  ingredientBun: '[data-cy=ingredients-bun]',
  ingredientMain: '[data-cy=ingredients-main]',
  ingredientSauce: '[data-cy=ingredients-sauce]',

  constructorBunTop: '[data-cy=constructor-bun-top]',
  constructorBunBottom: '[data-cy=constructor-bun-bottom]',

  constructorIngredients: '[data-cy=constructor-ingredients]',
  orderButton: '[data-cy=order-summ] button',
  orderNumber: '[data-cy=order-number]',

  ingredientModal: '#modals',
  modalCloseButton: '#modals button',

  constructor: '[data-cy=constructor]'
} as const;
