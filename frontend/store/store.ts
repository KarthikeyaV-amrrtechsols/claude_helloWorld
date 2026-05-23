import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./apiSlice";
import helloReducer from "./helloSlice";

export const store = configureStore({
  reducer: {
    api: apiReducer,
    hello: helloReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
