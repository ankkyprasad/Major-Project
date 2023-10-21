import { createSlice } from "@reduxjs/toolkit";

const initialState = { isLoggedIn: false, user: {} };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state, action) {
      state.isLoggedIn = true;
      state.data = action.payload.user;
    },
    logoutUser(state) {
      state.isLoggedIn = false;
      state.data = {};
    },
  },
});

export const userSliceActions = userSlice.actions;

export const revokeTokenThunk = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    dispatch(userSliceActions.logoutUser());
  };
};

export default userSlice;
