import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/dist/query/react';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { IAuthData, IAuthResponse } from '@models/auth';
import { AUTH_SECRET, APPLICATION_ID } from '@utils/constants/api';
import getRandomString from '@utils/helpers/getRandomString';

const nfdApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api-factory.simbirsoft1.com/api/',
    prepareHeaders: (headers) => {
      if (APPLICATION_ID) {
        headers.set('X-Api-Factory-Application-Id', APPLICATION_ID);
      }

      if (AUTH_SECRET) {
        if (!localStorage.getItem('authToken')) {
          const authToken = `${window.btoa(
            `${getRandomString(7)}:${AUTH_SECRET}`,
          )}`;

          localStorage.setItem('authToken', authToken);
        }
      }

      return headers;
    },
  }),
  endpoints: (build: EndpointBuilder<BaseQueryFn, string, string>) => ({
    login: build.mutation<IAuthResponse, IAuthData>({
      query: (userData) => ({
        url: '/auth/login',
        method: 'POST',
        body: userData,
        headers: {
          authorization: `Basic ${localStorage.getItem('authToken')}`,
        },
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
    }),
    refresh: build.mutation<IAuthResponse, string>({
      query: (token) => ({
        url: '/auth/refresh',
        method: 'POST',
        body: {
          refresh_token: token,
        },
        headers: {
          authorization: `Basic ${localStorage.getItem('authToken')}`,
        },
      }),
    }),
    check: build.query({
      query: () => ({
        url: '/auth/check',
      }),
    }),
    getOrderStatus: build.query({
      query: () => ({
        url: '/db/orderStatu',
      }),
    }),
  }),
});

export default nfdApi;
