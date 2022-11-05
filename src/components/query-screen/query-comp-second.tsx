import { MouseEvent, useState, ChangeEvent } from 'react';
import { Offer } from '../../types/data';
import { useDeleteOfferMutation, useLoadOffersQuery, useUpdateOfferMutation } from './../../redux-implements/rtk-query';

function QueryComponentSecond(): JSX.Element {
  const [ isModalOpen, setModalStatus ] = useState<boolean>(false);
  const [ offerToUpdate, setOfferToUpdate ] = useState<Offer>({} as Offer);
  const [ value, setValue ] = useState<string>('');
  const { data } = useLoadOffersQuery('');
  const [ deleteOffer ] = useDeleteOfferMutation();
  const [ updateOffer ] = useUpdateOfferMutation();

  const handleDeleteOffer = (id: number) => async (evt: MouseEvent) => {
    evt.preventDefault();
    await deleteOffer(id);
  };

  const handleUpdateOffer = (offer: Offer) => () => {
    setModalStatus(true);
    setOfferToUpdate(offer);
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  const handleModalSubmit = async (evt: MouseEvent) => {
    evt.preventDefault();
    await updateOffer({...offerToUpdate, title: value});
    setModalStatus(false);
  };

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
              <button onClick={handleDeleteOffer(offer.id)}>delete</button>
              <button onClick={handleUpdateOffer(offer)}>update</button>
            </div>
          </li>
        ))}
      </ul>
      {isModalOpen &&
      <>
        <div className="query-component__modal" onClick={(evt: MouseEvent) => {setModalStatus(false)}}></div>
        <div className="query-component__modal-container">
        <form className="query-component__form query-component__form--modal">
          <label>
            Введите новое название:
            <input className="query-component__input"
              type="text"
              name="text-input"
              value={value}
              onChange={handleInputChange}
              autoFocus
            />
          </label>
        <button type="button" onClick={handleModalSubmit}>Изменить</button>
      </form>
        </div>
      </>
      }
    </section>
  );
}

export { QueryComponentSecond };
