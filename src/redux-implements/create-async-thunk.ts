import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { createSlice, createAsyncThunk, configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import { Offer} from '../types/data';
import { ApiRoute, BASE_URL } from '../const';

type InitialState = {
  offers: Offer[],
  isLoading: boolean,
  error: string,
}

export const loadOffers = createAsyncThunk('data/set-offers', async () => {
  const response = await axios.get<Offer[]>(`${BASE_URL}${ApiRoute.Offers}`);
  return response.data;
});

const initialState: InitialState = {
  offers: [] as Offer[],
  isLoading: false,
  error: '',
};

export const dataSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loadOffers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isLoading = false;
      })
      .addCase(loadOffers.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isLoading = false;
      });
  },
});

export const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
