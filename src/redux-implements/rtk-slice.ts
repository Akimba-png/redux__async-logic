import { configureStore, createSlice, PayloadAction, Store } from '@reduxjs/toolkit';
import axios, { AxiosInstance } from 'axios';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { ThunkAction } from 'redux-thunk'

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

interface InitialState {
  users: User[];
  isLoading: boolean;
  error: string;
}

const initialState = {
  users: [],
  isLoading: false,
  error: '',
} as InitialState;

const userSlice = createSlice({
  name: 'user-data',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});


const { setUsers, setLoading, setError } = userSlice.actions;

type AppAction =
  | ReturnType<typeof setUsers>
  | ReturnType<typeof setLoading>
  | ReturnType<typeof setError>

type AppDispatch = typeof store.dispatch
type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: AppDispatch = useDispatch();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
type AppThunkAction = ThunkAction<void, RootState, AxiosInstance, AppAction>

const loadUsers = (): AppThunkAction => (dispatch) => {
  dispatch(setLoading(true))
  axios
    .get<User[]>('https://jsonplaceholder.typicode.com/users')
    .then((response) => dispatch(setUsers(response.data)))
    .then(() => dispatch(setLoading(false)))
};
