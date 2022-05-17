import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/dist/query/react';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { IAuthData, IAuthResponse } from '@models/auth';
import {
  ICar,
  ICarParams,
  ICategory,
  INameAndID,
  IOrderData,
  IOrderParams,
  IPageAndLimitParams,
  IPoint,
  IRate,
  IResponse,
} from '@models/data';
import getRandomString from '@utils/helpers/getRandomString';
import { AUTH_SECRET, APPLICATION_ID } from '@utils/constants/api';

const getAuthToken = (): string => {
  if (!localStorage.getItem('authToken')) {
    const authToken = `${window.btoa(`${getRandomString(7)}:${AUTH_SECRET}`)}`;

    localStorage.setItem('authToken', authToken);

    return authToken;
  }

  return localStorage.getItem('authToken') as string;
};

const nfdApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api-factory.simbirsoft1.com/api/',
    prepareHeaders: (headers) => {
      if (APPLICATION_ID) {
        headers.set('X-Api-Factory-Application-Id', APPLICATION_ID);
      }

      headers.set('Access-Control-Allow-Origin', '*');
      headers.set('Access-Control-Allow-Credentials', 'true');
      headers.set(
        'Access-Control-Allow-Methods',
        'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      );
      headers.set(
        'Access-Control-Allow-Headers',
        'x-requested-with, Content-Type, Origin, Authorization, accept, X-api-factory-application-id',
      );

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
    getOrdersList: build.query<IResponse<IOrderData>, IOrderParams>({
      query: ({ page, city, rate, status }) => ({
        url: `/db/order?limit=5&page=${page}${city ? `&cityId=${city}` : ''}${
          rate ? `&rateId=${rate}` : ''
        }${status ? `&orderStatusId=${status}` : ''}`,
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
    }),
    getCarList: build.query<IResponse<ICar>, ICarParams>({
      query: ({ page, category }) => ({
        url: `/db/car?limit=5&page=${page}${
          category ? `&categoryId=${category}` : ''
        }`,
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
    }),
    getCategoryList: build.query<IResponse<ICategory>, IPageAndLimitParams>({
      query: ({ page, limit }) => ({
        url: `/db/category?${limit ? `limit=${limit}&` : ''}page=${page}`,
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
    }),
    getCityList: build.query<IResponse<INameAndID>, IPageAndLimitParams>({
      query: ({ page, limit }) => ({
        url: `/db/city?${limit ? `limit=${limit}&` : ''}page=${page}`,
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
    }),
    getPointList: build.query<IResponse<IPoint>, IPageAndLimitParams>({
      query: ({ page }) => ({
        url: `/db/point?limit=6&page=${page}`,
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
    }),
    getRateList: build.query<IResponse<IRate>, IPageAndLimitParams>({
      query: ({ page, limit }) => ({
        url: `/db/rate?${limit ? `limit=${limit}&` : ''}page=${page}`,
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
    }),
    getStatusList: build.query<IResponse<INameAndID>, IPageAndLimitParams>({
      query: ({ page, limit }) => ({
        url: `/db/orderStatus?${limit ? `limit=${limit}&` : ''}page=${page}`,
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
    }),
  }),
});

export default nfdApi;
