import { useLoadOffersQuery } from './../../redux-implements/rtk-query';

function QueryComponentSecond(): JSX.Element {
  const { data } = useLoadOffersQuery('');
  return (
    <section className="query-component">
      <h2 className="query-component__title">query-based component 2</h2>
      <ul className="query-component__list">
        {data && data.map((offer) => (
          <li
            className="query-component__item"
            key={offer.id}
          >
            <p>{offer.title}</p>
            <div className="query-component__control">
              <button>delete</button>
              <button>update</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export { QueryComponentSecond };
