import { createSlice } from "@reduxjs/toolkit";

export const arraySlice = createSlice({
  name: "host_upload",
  initialState: [],
  reducers: {
    addArray: (state, action) => {
      return [...state, {array:action.payload }];
    },
 
  },
});

export const { addArray } = arraySlice.actions;

export default arraySlice.reducer;
