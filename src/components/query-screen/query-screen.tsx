import { Provider } from 'react-redux';
import { store } from './../../redux-implements/rtk-query';
import { QueryComponentFirst } from './query-comp-first';
import { QueryComponentSecond } from './query-comp-second';
import './query-screen.style.css';

function QueryScreen(): JSX.Element {
  return (
    <Provider store={store}>
      <div className="query-screen">
        <QueryComponentFirst />
        <QueryComponentSecond />
      </div>
    </Provider>
  );
}

export { QueryScreen };
