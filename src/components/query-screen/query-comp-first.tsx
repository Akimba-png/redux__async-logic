import { useState, ChangeEvent, MouseEvent } from 'react';
import { useAddOfferMutation, useLoadOffersQuery } from '../../redux-implements/rtk-query';
import { Offer } from '../../types/data';

function QueryComponentFirst(): JSX.Element {
  const [ value, setValue ] = useState('');
  const { data } = useLoadOffersQuery('');
  const [ addOffer ] = useAddOfferMutation();

  const handleAddOffer = async (evt: MouseEvent) => {
    evt.preventDefault();
    const newOffer = {
      title: value,
      price: 2000,
    } as Offer;
    if (value) {
      await addOffer(newOffer);
      setValue('');
    }
  };
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
      <form className="query-component__form">
        <label>
          Введите название:
          <input className="query-component__input"
            type="text"
            name="text-input"
            value={value}
            onChange={(evt: ChangeEvent<HTMLInputElement>) => setValue(evt.target.value)} />
        </label>
        <button onClick={handleAddOffer}>Добавить в список</button>
      </form>
    </section>
  );
}

export { QueryComponentFirst };
