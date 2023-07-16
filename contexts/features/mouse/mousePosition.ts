import { createSlice } from "@reduxjs/toolkit";

export const positionSlice = createSlice({
  name: "position",
  initialState: {
    position: {
      x: 0,
      y: 0,
    },
  },
  reducers: {
    setPosition: (state, action) => {
      state.position = action.payload;
    },
  },
});

export const { setPosition } = positionSlice.actions;
export default positionSlice.reducer;
