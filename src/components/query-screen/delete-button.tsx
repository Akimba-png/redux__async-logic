import { MouseEvent } from 'react';
import { useDeleteOfferMutation } from '../../redux-implements/rtk-query';

type DeleteButtonProps = {
  id: number;
};

function DeleteButton({ id }: DeleteButtonProps): JSX.Element {
  const [deleteOffer, {isLoading}] = useDeleteOfferMutation();
  const handleDeleteOffer = (id: number) => async (evt: MouseEvent) => {
    evt.preventDefault();
    await deleteOffer(id);
  };
  return <button onClick={handleDeleteOffer(id)}>{isLoading ? 'Deleting' : 'Delete'}</button>;
}

export default DeleteButton;
