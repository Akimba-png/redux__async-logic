import { useEffect } from 'react';
import { useAppSelector, useAppDispatch, loadOffers } from './../../redux-implements/rtk-async-thunk';

function AsyncThunkComp(): JSX.Element {
  const dispatch = useAppDispatch();
  const offers = useAppSelector((state) => state.data.offers);
  const isLoading = useAppSelector((state) => state.data.isLoading);
  useEffect(() => {
    dispatch(loadOffers());
  }, [dispatch]);

  if (isLoading) {
    return (<h2>Loading...</h2>);
  }

  return (
    <section className="async-thunk-comp">
      <h2 className="async-thunk-comp__title">Component under RTK createAsynkThunk</h2>
      <p>{offers.reduce((acc, e) => acc += ` ${e.title},`, '')}</p>
    </section>
  );
}

export { AsyncThunkComp };
