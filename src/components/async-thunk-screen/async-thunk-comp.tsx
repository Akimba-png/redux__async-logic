import { useEffect } from 'react';
import { useAppSelector, useAppDispatch, loadOffers } from './../../redux-implements/rtk-async-thunk';

function AsyncThunkComp(): JSX.Element {
  const dispatch = useAppDispatch();
  const offers = useAppSelector((state) => state.data.offers);
  useEffect(() => {
    dispatch(loadOffers());
  }, [dispatch]);

  return (
    <section className="async-thunk-comp">
      <h2 className="async-thunk-comp__title">Component under RTK createAsynkThunk</h2>
      <p>{offers.reduce((acc, e) => acc += ` ${e.offer.title},`, '')}</p>
    </section>
  );
}

export { AsyncThunkComp };
