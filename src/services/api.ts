import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
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
  IPostResponse,
  IPutArgs,
  IRate,
  IRateType,
  IResponse,
  IResponseItem,
  TPostCar,
  TPostCategory,
  TPostName,
  TPostOrderData,
  TPostPoint,
  TPostRate,
} from '@models/data';
import getRandomString from '@utils/helpers/getRandomString';
import { AUTH_SECRET, APPLICATION_ID } from '@utils/constants/api';
import { IRefreshResponse, setLogoutData } from '@store/reducers/auth';

const getAuthToken = (): string => {
  if (!localStorage.getItem('authToken')) {
    const authToken = `${window.btoa(`${getRandomString(7)}:${AUTH_SECRET}`)}`;

    localStorage.setItem('authToken', authToken);

    return authToken;
  }

  return localStorage.getItem('authToken') as string;
};

const baseQuery = fetchBaseQuery({
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
});

const baseQuerryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (
    result.error &&
    (result.error as { originalStatus: number })?.originalStatus === 401
  ) {
    const refreshResult = await baseQuery(
      {
        url: '/auth/refresh',
        method: 'POST',
        body: {
          refresh_token: localStorage.getItem('refreshToken'),
        },
        headers: {
          authorization: `Basic ${localStorage.getItem('authToken')}`,
        },
      },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      localStorage.setItem(
        'accessToken',
        (refreshResult as IRefreshResponse).data?.access_token || '',
      );
      localStorage.setItem(
        'refreshToken',
        (refreshResult as IRefreshResponse).data?.refresh_token || '',
      );

      setTimeout(async () => {
        result = await baseQuery(
          {
            url: (args as FetchArgs).url,
            method: (args as FetchArgs).method,
            body: (args as FetchArgs).body,
            headers: {
              authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          },
          api,
          extraOptions,
        );
      }, 0);
    } else {
      api.dispatch(setLogoutData());
    }
  }

  return result;
};

const nfdApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQuerryWithReauth,
  keepUnusedDataFor: 0,
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
    refresh: build.mutation<IAuthResponse, void>({
      query: () => ({
        url: '/auth/refresh',
        method: 'POST',
        body: {
          refresh_token: localStorage.getItem('refreshToken'),
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
      providesTags: ['order'],
    }),
    getOrder: build.query<IResponseItem<IOrderData>, string>({
      query: (id) => ({
        url: `/db/order/${id}`,
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
    }),
    putOrder: build.mutation<
      IResponseItem<IOrderData>,
      IPutArgs<TPostOrderData>
    >({
      query: ({ data: newOrderData, id }) => ({
        url: `/db/order/${id}`,
        method: 'PUT',
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: newOrderData,
      }),
      invalidatesTags: ['order'],
    }),
    getCarList: build.query<IResponse<ICar>, ICarParams>({
      query: ({ page, limit, category }) => ({
        url: `/db/car?${limit ? `limit=${limit}&` : ''}page=${page}${
          category ? `&categoryId=${category}` : ''
        }`,
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      providesTags: ['car'],
    }),
    getCar: build.query<IResponseItem<ICar>, string>({
      query: (id) => ({
        url: `/db/car/${id}`,
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      providesTags: ['car'],
    }),
    getCategoryList: build.query<IResponse<ICategory>, IPageAndLimitParams>({
      query: ({ page, limit }) => ({
        url: `/db/category?${limit ? `limit=${limit}&` : ''}page=${page}`,
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      providesTags: ['category'],
    }),
    getCategory: build.query<IResponseItem<ICategory>, string>({
      query: (id) => ({
        url: `/db/category/${id}`,
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      providesTags: ['category'],
    }),
    getCityList: build.query<IResponse<INameAndID>, IPageAndLimitParams>({
      query: ({ page, limit }) => ({
        url: `/db/city?${limit ? `limit=${limit}&` : ''}page=${page}`,
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      providesTags: ['city'],
    }),
    getCity: build.query<IResponseItem<INameAndID>, string>({
      query: (id) => ({
        url: `/db/city/${id}`,
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      providesTags: ['city'],
    }),
    getPointList: build.query<IResponse<IPoint>, IPageAndLimitParams>({
      query: ({ page }) => ({
        url: `/db/point?limit=6&page=${page}`,
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      providesTags: ['point'],
    }),
    getPoint: build.query<IResponseItem<IPoint>, string>({
      query: (id) => ({
        url: `/db/point/${id}`,
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      providesTags: ['point'],
    }),
    getRateList: build.query<IResponse<IRate>, IPageAndLimitParams>({
      query: ({ page, limit }) => ({
        url: `/db/rate?${limit ? `limit=${limit}&` : ''}page=${page}`,
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      providesTags: ['rate'],
    }),
    getRate: build.query<IResponseItem<IRate>, string>({
      query: (id) => ({
        url: `/db/rate/${id}`,
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      providesTags: ['rate'],
    }),
    getRateTypeList: build.query<IResponse<IRateType>, IPageAndLimitParams>({
      query: ({ page, limit }) => ({
        url: `/db/rateType?${limit ? `limit=${limit}&` : ''}page=${page}`,
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      providesTags: ['rateType'],
    }),
    getRateType: build.query<IResponseItem<IRateType>, string>({
      query: (id) => ({
        url: `/db/rateType/${id}`,
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
      providesTags: ['status'],
    }),
    getStatus: build.query<IResponseItem<INameAndID>, string>({
      query: (id) => ({
        url: `/db/orderStatus/${id}`,
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      providesTags: ['status'],
    }),
    postCategory: build.mutation<IPostResponse<ICategory>, TPostCategory>({
      query: (newCategory) => ({
        url: '/db/category',
        method: 'POST',
        body: newCategory,
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      invalidatesTags: ['category'],
    }),
    postStatus: build.mutation<
      IPostResponse<INameAndID>,
      Pick<INameAndID, 'name'>
    >({
      query: (newStatus) => ({
        url: '/db/orderStatus',
        method: 'POST',
        body: newStatus,
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      invalidatesTags: ['status'],
    }),
    postRateTypeId: build.mutation<
      IPostResponse<IRateType>,
      Omit<IRateType, 'id'>
    >({
      query: (newRateTypeId) => ({
        url: '/db/rateType',
        method: 'POST',
        body: newRateTypeId,
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      invalidatesTags: ['rateType'],
    }),
    postRate: build.mutation<IPostResponse<IRate>, TPostRate>({
      query: (newRate) => ({
        url: '/db/rate',
        method: 'POST',
        body: newRate,
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      invalidatesTags: ['rate'],
    }),
    postPoint: build.mutation<IPostResponse<IPoint>, TPostPoint>({
      query: (newPoint) => ({
        url: '/db/point',
        method: 'POST',
        body: newPoint,
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      invalidatesTags: ['point'],
    }),
    postCity: build.mutation<IPostResponse<INameAndID>, TPostName>({
      query: (newCity) => ({
        url: '/db/city',
        method: 'POST',
        body: newCity,
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      invalidatesTags: ['city'],
    }),
    postCar: build.mutation<IPostResponse<ICar>, TPostCar>({
      query: (newCar) => ({
        url: '/db/car',
        method: 'POST',
        body: newCar,
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      invalidatesTags: ['car'],
    }),
    putCategory: build.mutation<
      IPostResponse<ICategory>,
      IPutArgs<TPostCategory>
    >({
      query: ({ data: newCategory, id }) => ({
        url: `/db/category/${id}`,
        method: 'PUT',
        body: newCategory,
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      invalidatesTags: ['category'],
    }),
    putStatus: build.mutation<
      IPostResponse<INameAndID>,
      IPutArgs<Pick<INameAndID, 'name'>>
    >({
      query: ({ data: newStatus, id }) => ({
        url: `/db/orderStatus/${id}`,
        method: 'PUT',
        body: newStatus,
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      invalidatesTags: ['status'],
    }),
    putRateType: build.mutation<
      IPostResponse<IRateType>,
      IPutArgs<Omit<IRateType, 'id'>>
    >({
      query: ({ data: newRateType, id }) => ({
        url: `/db/rateType/${id}`,
        method: 'PUT',
        body: newRateType,
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      invalidatesTags: ['rateType'],
    }),
    putRate: build.mutation<IPostResponse<IRate>, IPutArgs<TPostRate>>({
      query: ({ data: newRate, id }) => ({
        url: `/db/rate/${id}`,
        method: 'PUT',
        body: newRate,
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      invalidatesTags: ['rate'],
    }),
    putPoint: build.mutation<IPostResponse<IPoint>, IPutArgs<TPostPoint>>({
      query: ({ data: newPoint, id }) => ({
        url: `/db/point/${id}`,
        method: 'PUT',
        body: newPoint,
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      invalidatesTags: ['point'],
    }),
    putCity: build.mutation<IPostResponse<INameAndID>, IPutArgs<TPostName>>({
      query: ({ data: newCity, id }) => ({
        url: `/db/city/${id}`,
        method: 'PUT',
        body: newCity,
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      invalidatesTags: ['city'],
    }),
    putCar: build.mutation<IPostResponse<ICar>, IPutArgs<TPostCar>>({
      query: ({ data: newCar, id }) => ({
        url: `/db/car/${id}`,
        method: 'PUT',
        body: newCar,
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      invalidatesTags: ['car'],
    }),
    deleteOrder: build.mutation({
      query: (id) => ({
        url: `/db/order/${id}`,
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      invalidatesTags: ['order'],
    }),
    deleteRate: build.mutation({
      query: (id) => ({
        url: `/db/rate/${id}`,
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      invalidatesTags: ['rate'],
    }),
    deleteRateType: build.mutation({
      query: (id) => ({
        url: `/db/rateType/${id}`,
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      invalidatesTags: ['rateType'],
    }),
    deleteStatus: build.mutation({
      query: (id) => ({
        url: `/db/orderStatus/${id}`,
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      invalidatesTags: ['status'],
    }),
    deleteCar: build.mutation({
      query: (id) => ({
        url: `/db/car/${id}`,
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      invalidatesTags: ['car'],
    }),
    deletePoint: build.mutation({
      query: (id) => ({
        url: `/db/point/${id}`,
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      invalidatesTags: ['point'],
    }),
    deleteCity: build.mutation({
      query: (id) => ({
        url: `/db/city/${id}`,
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      invalidatesTags: ['city'],
    }),
    deleteCategory: build.mutation({
      query: (id) => ({
        url: `/db/category/${id}`,
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
      invalidatesTags: ['category'],
    }),
  }),
});

export default nfdApi;
