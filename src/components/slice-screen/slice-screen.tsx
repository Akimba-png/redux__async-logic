import { Provider } from 'react-redux';
import { SliceComp } from './slice-comp';
import { store } from './../../redux-implements/rtk-slice';
import './slice-screen.style.css';

function SliceScreen(): JSX.Element {
  return (
    <Provider store={store}>
      <SliceComp />
    </Provider>
  );
}

export { SliceScreen };
