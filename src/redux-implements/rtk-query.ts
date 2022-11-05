import { configureStore } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Offer } from '../types/data';
import { ApiRoute, BASE_URL } from '../const';

const offerApi = createApi({
  reducerPath: 'offer-data',
  baseQuery: fetchBaseQuery( {baseUrl: BASE_URL} ),
  tagTypes: ['Offer'],
  endpoints: (build) => ({
    loadOffers: build.query<Offer[], string>({
      query: () => ApiRoute.Offers,
      providesTags: (result) => ['Offer'],
    }),
    addOffer: build.mutation<Offer, Offer>({
      query: (offer) => ({
        url: ApiRoute.Offers,
        method: 'POST',
        body: offer,
      }),
      invalidatesTags: ['Offer'],
    }),
    deleteOffer: build.mutation<Offer, number>({
      query: (id) => ({
        url: `${ApiRoute.Offers}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Offer'],
    }),
    updateOffer: build.mutation<Offer, Offer>({
      query: (offer) => ({
        url: `${ApiRoute.Offers}/${offer.id}`,
        method: 'PUT',
        body: offer,
      }),
      invalidatesTags: ['Offer'],
    }),
  }),
});

export const store = configureStore({
  reducer: {
    [offerApi.reducerPath]: offerApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(offerApi.middleware),
});

export const {
  useLoadOffersQuery,
  useAddOfferMutation,
  useDeleteOfferMutation,
  useUpdateOfferMutation,
} = offerApi;
