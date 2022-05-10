import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/dist/query/react';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { IAuthData, IAuthResponse } from '@models/auth';
import { AUTH_SECRET, APPLICATION_ID } from '@utils/constants/api';
import getRandomString from '@utils/helpers/getRandomString';
import axios from 'axios';

const getAuthToken = (): string => {
  if (!localStorage.getItem('authToken')) {
    const authToken = `${window.btoa(`${getRandomString(7)}:${AUTH_SECRET}`)}`;

    localStorage.setItem('authToken', authToken);

    return authToken;
  }

  return localStorage.getItem('authToken') as string;
};

const api = axios.create({
  baseURL: 'https://api-factory.simbirsoft1.com/api/',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers':
      'x-requested-with, Content-Type, Origin, Authorization, accept, X-api-factory-application-id',
    'X-Api-Factory-Application-Id': APPLICATION_ID as string,
  },
});

export const getOrders = () =>
  api.get('db/order?limit=3000&page=0', {
    headers: {
      authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });

const nfdApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api-factory.simbirsoft1.com/api/',
    prepareHeaders: (headers) => {
      if (APPLICATION_ID) {
        headers.set('X-Api-Factory-Application-Id', APPLICATION_ID);
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
          authorization: `Basic ${getAuthToken()}`,
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
    getOrderList: build.query({
      query: () => ({
        url: '/db/order',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          'Access-Control-Allow-Headers':
            'x-requested-with, Content-Type, Origin, Authorization, accept, X-api-factory-application-id',
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
    }),
  }),
});

export default nfdApi;
