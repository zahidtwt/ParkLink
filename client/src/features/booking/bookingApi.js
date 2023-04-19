import { apiSlice } from '../api/apiSlice';

export const bookingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (bookingInfo) => ({
        url: '/app/bookings',
        method: 'POST',
        body: bookingInfo,
      }),
    }),
    getBookingsByUserId: builder.query({
      query: () => `/app/bookings/`,
    }),
    deleteBookingById: builder.mutation({
      query: (id) => ({
        url: `/app/bookings/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetBookingsByUserIdQuery,
  useDeleteBookingByIdMutation,
} = bookingApi;
