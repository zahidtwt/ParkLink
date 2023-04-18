import { apiSlice } from '../api/apiSlice';

export const parkingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllParking: builder.query({
      query: () => '/app/parkings/all',
    }),
    // Get parking spot by ID
    getParkingById: builder.query({
      query: (id) => `/app/parkings/${id}`,
    }),

    // Get parking spots by location
    getParkingByLocation: builder.query({
      query: (params) => ({
        url: '/app/parkings',
        params,
      }),
    }),

    // Get parking spots by distance
    getParkingByDistance: builder.query({
      query: (params) => ({
        url: '/app/parkings/distance',
        params,
      }),
    }),

    // Get parking spots by vehicle type
    getParkingByVehicleType: builder.query({
      query: () => '/app/parkings/vehicle-type',
    }),

    // Get parking spots by rating
    getParkingByRating: builder.query({
      query: () => '/app/parkings/rating',
    }),

    // Create a new parking spot
    createParking: builder.mutation({
      query: (body) => ({
        url: '/app/parkings',
        method: 'POST',
        body,
      }),
    }),

    // Get parking spots by user ID
    getParkingByUserId: builder.query({
      query: (userId) => `/users/${userId}/app/parkings`,
    }),

    // Update a parking spot by ID
    updateParkingById: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/app/parkings/${id}`,
        method: 'PUT',
        body,
      }),
    }),

    // Delete a parking spot by ID
    deleteParkingById: builder.mutation({
      query: (id) => ({
        url: `/app/parkings/${id}`,
        method: 'DELETE',
      }),
    }),

    // Create a new parking rating
    createParkingRating: builder.mutation({
      query: ({ parkingId, ...body }) => ({
        url: `/app/parkings/${parkingId}/ratings`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetAllParkingQuery,
  useGetParkingByIdQuery,
  useGetParkingByLocationQuery,
  useGetParkingByDistanceQuery,
  useGetParkingByVehicleTypeQuery,
  useGetParkingByRatingQuery,
  useCreateParkingMutation,
  useGetParkingByUserIdQuery,
  useUpdateParkingByIdMutation,
  useDeleteParkingByIdMutation,
  useCreateParkingRatingMutation,
} = parkingApi;
