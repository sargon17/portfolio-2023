import { createSlice } from "@reduxjs/toolkit";

export const scrollSlice = createSlice({
  name: "scroll",
  initialState: {
    scroll: 0,
  },
  reducers: {
    setScroll: (state, action) => {
      state.scroll = action.payload;
    },
  },
});

export const { setScroll } = scrollSlice.actions;
export default scrollSlice.reducer;
