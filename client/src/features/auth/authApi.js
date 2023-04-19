import { apiSlice } from '../api/apiSlice';
import { userLoggedIn } from './authSlice';
import Cookies from 'js-cookie';
export const authApi = apiSlice.injectEndpoints({
  // as I did code spliting, I have to inject this authApi to apislice
  endpoints: (builder) => ({
    // endpoints here
    register: builder.mutation({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
    }),

    login: builder.mutation({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          Cookies.set(
            'auth',
            JSON.stringify({
              accessToken: result.data.accessToken,

              user: result.data.user,
            }),
            { expires: 1 } // 1 day
          );

          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),

    updateUserInfo: builder.mutation({
      query: (body) => ({
        url: '/auth/updateuser',
        method: 'PUT',
        body,
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: '/auth/user',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useRegisterMutation,
  useLoginMutation,
  useUpdateUserInfoMutation,
} = authApi;
