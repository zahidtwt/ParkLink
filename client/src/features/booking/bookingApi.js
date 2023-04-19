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
    addBookmark: builder.mutation({
      query: (id) => ({
        url: `app/bookmarks/${id}`,
        method: 'POST',
      }),
    }),

    getAllBookmarkedParkings: builder.query({
      query: () => ({
        url: `app/bookmarks/`,
      }),
    }),

    removeBookmark: builder.mutation({
      query: (id) => ({
        url: `app/bookmarks/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetBookingsByUserIdQuery,
  useDeleteBookingByIdMutation,
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
  useGetAllBookmarkedParkingsQuery,
} = bookingApi;
