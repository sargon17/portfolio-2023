import { createSlice } from "@reduxjs/toolkit";

export const dimensionSlice = createSlice({
  name: "dimension",
  initialState: {
    dimension: { width: 10, height: 10 },
  },
  reducers: {
    setDimension: (state, action) => {
      state.dimension = action.payload;
    },
  },
});

export const { setDimension } = dimensionSlice.actions;

export default dimensionSlice.reducer;
