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
              accessToken: result.data.token,
              user: result.data,
            }),
            { expires: 1 } // 1 day
          );

          localStorage.setItem(
            'auth',
            JSON.stringify({
              accessToken: result.data.token,
              user: result.data,
            })
          );

          dispatch(
            userLoggedIn({
              accessToken: result.data.token,
              user: result.data,
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
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useUpdateUserInfoMutation,
} = authApi;
