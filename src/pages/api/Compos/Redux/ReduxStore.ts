import { configureStore } from "@reduxjs/toolkit";
import { MainReducer } from "./Redux";
 
export const store = configureStore({
  reducer: {
    mainReducer: MainReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;


export type AppDispatch = typeof store.dispatch;