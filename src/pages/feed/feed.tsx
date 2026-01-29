import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks/hooks';
import { fetchFeed } from '../../services/slices/feed-slice/feed-slice';

export const Feed: FC = () => {
  const { orders, isLoading } = useAppSelector((state) => state.feed);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  if (isLoading || !orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
