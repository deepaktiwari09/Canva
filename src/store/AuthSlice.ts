import { createSlice } from "@reduxjs/toolkit";

const initialState: AuthState = {
  authData: {},
  token: "",
  refreshToken: "",
};
type AuthState = {
  authData: {};
  token: string;
  refreshToken: string;
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    defaultState: (state, action) => {
      state.refreshToken = "";
      state.token = "";
      state.authData = {};
    },
  },
  extraReducers: (builder) => {},
});
export const { defaultState } = authSlice.actions;

export default authSlice.reducer;
