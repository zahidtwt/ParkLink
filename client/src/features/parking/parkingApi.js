import { apiSlice } from '../api/apiSlice';

export const parkingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllParking: builder.query({
      query: () => '/app/parkings/all',
    }),
    // Get parking spot by ID
    getParkingById: builder.query({
      query: (id) => {
        if (!id) return { data: [] };
        return `/app/parkings/${id}`;
      },
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
    getNearbyParkings: builder.query({
      query: (lng, latitude) => ({
        url: `app/parkings/nearby/${lng}/${latitude}`,
        method: 'GET',
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
      query: () => `/app/parkings`,
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
  useGetNearbyParkingsQuery,
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
