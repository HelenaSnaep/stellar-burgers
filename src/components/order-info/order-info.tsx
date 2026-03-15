import { FC, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { useParams } from 'react-router-dom';
import { Preloader } from '@ui';
import { OrderInfoUI } from '@ui';
import { TIngredient, TOrder } from '@utils-types';
import { getOrderByNumber } from '../../services/slices/order-slice/order-slice';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { number } = useParams<{ number?: string }>();

  const orderData = useSelector((state) => state.order.orderModalData);
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const feedOrders = useSelector((state) => state.feed.orders || []);
  const profileOrders = useSelector((state) => state.order.orders || []);

  const findOrderInStore = (): TOrder | null => {
    if (!number) return null;

    if (orderData && orderData.number.toString() === number) {
      return orderData;
    }

    const feedOrder = feedOrders.find(
      (order) => order.number.toString() === number
    );
    if (feedOrder) return feedOrder;

    const profileOrder = profileOrders.find(
      (order) => order.number.toString() === number
    );
    if (profileOrder) return profileOrder;

    return null;
  };

  const currentOrder = findOrderInStore();

  useEffect(() => {
    if (number && !currentOrder) {
      dispatch(getOrderByNumber(Number(number)));
    }
  }, [number, currentOrder, dispatch]);

  const orderInfo = useMemo(() => {
    const orderToUse = currentOrder || orderData;
    if (!orderToUse || !ingredients.length) return null;

    const date = new Date(orderToUse.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderToUse.ingredients.reduce(
      (acc: TIngredientsWithCount, item: string) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }
        return acc;
      },
      {} as TIngredientsWithCount
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc: number, item: TIngredient & { count: number }) =>
        acc + item.price * item.count,
      0
    );

    return {
      ...orderToUse,
      ingredientsInfo,
      date,
      total
    };
  }, [currentOrder, orderData, ingredients]);

  if (!number || !orderInfo) {
    return <Preloader />;
  }

  return (
    <>
      <p
        className='text text_type_digits-default'
        style={{ textAlign: 'center' }}
      >
        #{number}
      </p>
      <OrderInfoUI orderInfo={orderInfo} />
    </>
  );
};
