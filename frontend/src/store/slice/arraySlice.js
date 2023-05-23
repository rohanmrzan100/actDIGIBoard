import { createSlice } from "@reduxjs/toolkit";

export const arraySlice = createSlice({
  name: "host_upload",
  initialState: [],
  reducers: {
    addArray: (state, action) => {
      return [...state, action.payload];
    },
    removeArray: (state, action) => {
      let arrr = [];
      let arr = action.payload.array;
      const id = action.payload.id;
      const index = arr.indexOf(id);
      console.log(arr, id);
      console.log(index);
      const array = [...arr];
      if (array.length === 1) {
        arrr = []
        return arrr;
      } else {
        arrr = array.splice(index, 1);
        return arrr;
      }
    },
  },
});

export const { addArray, removeArray } = arraySlice.actions;

export default arraySlice.reducer;
