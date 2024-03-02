// context for mouse helper component to animate on some custom events

import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "./features/mouse/mouseContent";
import positionReducer from "./features/mouse/mousePosition";
import dimensionReducer from "./features/mouse/mouseDimension";
import scrollReducer from "./features/mouse/scrollContent";

export const mouseStore = configureStore({
  reducer: {
    content: contentReducer,
    position: positionReducer,
    dimension: dimensionReducer,
    scroll: scrollReducer,
  },
});

export type RootState = ReturnType<typeof mouseStore.getState>;
export type AppDispatch = typeof mouseStore.dispatch;
