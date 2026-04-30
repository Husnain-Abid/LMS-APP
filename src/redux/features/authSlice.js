import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    // set user after login
    setCredentials: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    // clear on logout
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    }

  }
});

export const { setCredentials, logoutUser } = authSlice.actions;
export default authSlice.reducer;