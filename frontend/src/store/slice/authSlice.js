import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isAuth: false,
  userId:null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        token: localStorage.getItem("token"),
        isAuth: true,
      };
    },
    loginError: (state, action) => {
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuth: false,
      };
    },
    logout: (state, action) => {
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuth: false,
      };
    },
    loadUser: (state, action) => {
      return {
        ...state,
        isAuth: true,
        token: action.payload,
        
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginError, loginSuccess, loadUser, logout } = authSlice.actions;

export default authSlice.reducer;
