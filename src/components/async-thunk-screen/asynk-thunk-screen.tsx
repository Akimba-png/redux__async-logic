import { Provider } from 'react-redux';
import { store } from './../../redux-implements/rtk-async-thunk';
import {AsyncThunkComp } from './async-thunk-comp';
import './async-thunk-screen.style.css';

function AsyncThunkScreen() {
  return (
    <Provider store={store} >
      <AsyncThunkComp />
    </Provider>
  );
}

export { AsyncThunkScreen} ;
