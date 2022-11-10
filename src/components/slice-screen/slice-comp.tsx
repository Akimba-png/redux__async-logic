import { useEffect } from 'react';
import { useAppSelector, useAppDispatch, loadUsers } from './../../redux-implements/rtk-slice';

function SliceComp(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadUsers());
  }, []);
  const users = useAppSelector((store) => store.user.users);
  const loadingStatus = useAppSelector((store) => store.user.isLoading);
  if (loadingStatus) {
    return <h1>Loading...</h1>;
  }
  return (
    <section className="slice-comp">
      <h2 className="slice-comp__title">
        Component under RTK slice & thunk action
      </h2>
      <ul className="slice-comp__list">
        {users.map((user) => (
          <li>{user.name}</li>
        ))}
      </ul>
    </section>
  );
}

export { SliceComp };
