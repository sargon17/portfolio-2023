// context for mouse helper component to animate on some custom events

import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "./features/mouse/mouseContent";
import positionReducer from "./features/mouse/mousePosition";
import dimensionReducer from "./features/mouse/mouseDimension";

export const mouseStore = configureStore({
  reducer: {
    content: contentReducer,
    position: positionReducer,
    dimension: dimensionReducer,
  },
});

export type RootState = ReturnType<typeof mouseStore.getState>;
export type AppDispatch = typeof mouseStore.dispatch;
