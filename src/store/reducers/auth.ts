import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAuthInitialState {
  status: boolean;
  username: string | null;
  password: string | null;
  refresh_token: string | null;
  expires_in: number | null;
}

const initialState: IAuthInitialState = {
  status: false,
  username: localStorage.getItem('userEmail'),
  password: localStorage.getItem('userPassword'),
  refresh_token: localStorage.getItem('refreshToken'),
  expires_in: null,
};

export interface IRefreshResponse {
  data?: {
    access_token: string;
    refresh_token: string;
  };
  error?: {
    status: number;
  };
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginData: (state, action: PayloadAction<IRefreshResponse>) => {
      state.status = true;
      localStorage.setItem(
        'accessToken',
        action.payload.data?.access_token || '',
      );
      localStorage.setItem(
        'refreshToken',
        action.payload.data?.refresh_token || '',
      );
    },
    setLogoutData: (state) => {
      state.status = false;
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userPassword');
      localStorage.removeItem('refreshToken');
    },
  },
});

export const { setLoginData, setLogoutData } = authSlice.actions;
export default authSlice.reducer;
