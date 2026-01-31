import { useSelector } from '../../services/store';
import styles from './constructor-page.module.css';
import { BurgerIngredients, BurgerConstructor } from '@components';
import { Preloader } from '@ui';
import { FC } from 'react';

export const ConstructorPage: FC = () => {
  const { ingredients, isLoading, error } = useSelector(
    (state) => state.ingredients
  );

  console.log('Ингредиенты:', ingredients);
  console.log('Загрузка:', isLoading);
  console.log('Ошибка:', error);

  if (error) {
    return <div className={styles.error}>Ошибка: {error}</div>;
  }

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
