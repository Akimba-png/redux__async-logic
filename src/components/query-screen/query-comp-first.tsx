import { useLoadOffersQuery } from '../../redux-implements/rtk-query';

function QueryComponentFirst(): JSX.Element {
  const { data } = useLoadOffersQuery('');
  return (
    <section className="query-component">
      <h2 className="query-component__title">query-based component 1</h2>
      <ul className="query-component__list">
        {data && data.map((offer) => (
          <li
            className="query-component__item"
            key={offer.id}
          >
            <p>{offer.title}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export { QueryComponentFirst };
