import { createSlice } from '@reduxjs/toolkit';

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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginData: (state) => {
      state.status = true;
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
