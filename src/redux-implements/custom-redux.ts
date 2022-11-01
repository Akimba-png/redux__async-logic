import axios from 'axios';
import { Offer } from './../types/data';
import { BASE_URL, ApiRoute } from '../const';

enum ActionType {
  SetOffers = 'data/set-offers',
  SetLoadingStatus = 'data/set-loading-status',
  SetError = 'data/set-error',
}

const setOffers = (offers: Offer[]) => ({
  type: ActionType.SetOffers,
  payload: offers,
});

const setLoadingStatus = (status: boolean) => ({
  type: ActionType.SetLoadingStatus,
  payload: status,
});

const setError = (error: string) => ({
  type: ActionType.SetError,
  payload: error,
});

type Action =
  | ReturnType<typeof setOffers>
  | ReturnType<typeof setLoadingStatus>
  | ReturnType<typeof setError>

type InitialState = {
  offers: Offer[],
  isLoading: boolean,
  error: string,
}

const initialState: InitialState = {
  offers: [] as Offer[],
  isLoading: false,
  error: '',
};

const reducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case ActionType.SetOffers:
      return {...state, offers: action.payload};
    case ActionType.SetLoadingStatus:
      return {...state, isLoading: action.payload};
    case ActionType.SetError:
      return {...state, error: action.payload};
    default:
      return state;
  };
};

type Reducer = typeof reducer;

const createStore = (reducer: Reducer, initialState: InitialState) => {
  let state = initialState;
  return {
    dispatch(action: Action) {
      state = reducer(state, action) as InitialState;
    },
    getState() {
      return state;
    },
  };
};

type Store = ReturnType<typeof createStore>

const thunkMiddleware = (store: Store) => (next: (action: Action) => void) => (action: Action | ((store: Store) => void)) => {
  if (typeof action === 'function') {
    action(store);
    return;
  }
  return next(action);
};

type Thunk = typeof thunkMiddleware

const loadOffers = () => ({dispatch, getState}: Store) => {
  axios
    .get<Offer[]>(`${BASE_URL}${ApiRoute.Offers}`)
    .then((response) => dispatch(setOffers(response.data)));
};

const createStoreWithMiddleware = (middleware: Thunk) => (makeStore: typeof createStore) => {
  const store = makeStore(reducer, initialState);
  return {
    dispatch(action: Action | ((store: Store) => void)) {
      return middleware(store)(store.dispatch)(action);
    },
    getState() {
      return store.getState();
    }
  };
};

const store = createStoreWithMiddleware(thunkMiddleware)(createStore);
store.dispatch(loadOffers());
setTimeout(() => {
  console.log(store.getState());
}, 2000);
