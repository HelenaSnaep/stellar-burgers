import { TConstructorIngredient } from '@utils-types';

export interface ConstructorItems {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

export interface BurgerConstructorUIProps {
  constructorItems: ConstructorItems;
  orderRequest: boolean;
  price: number;
  orderModalData: { number: number } | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
}
