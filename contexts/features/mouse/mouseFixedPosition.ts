import { createSlice } from "@reduxjs/toolkit";

export const fixPositionSlice = createSlice({
  name: "fixedPosition",
  initialState: {
    fixedPosition: { x: 0, y: 0 },
  },
  reducers: {
    setFixPosition: (state, action) => {
      state.fixedPosition = action.payload;
    },
  },
});

export const { setFixPosition } = fixPositionSlice.actions;
export default fixPositionSlice.reducer;
