import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import { User } from './../types/user';

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

export const store = configureStore({
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
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
type AppThunkAction = ThunkAction<void, RootState, unknown, AppAction>

export const loadUsers = (): AppThunkAction => (dispatch) => {
  dispatch(setLoading(true))
  axios
    .get<User[]>('https://jsonplaceholder.typicode.com/users')
    .then((response) => dispatch(setUsers(response.data)))
    .then(() => dispatch(setLoading(false)));
};
