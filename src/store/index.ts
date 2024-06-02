import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { tmdbApi } from "../services/tmdbApi";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "./authSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

const rootReducer = combineReducers({
  [tmdbApi.reducerPath]: tmdbApi.reducer,
  auth: authReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(tmdbApi.middleware),
  });

const store = setupStore();

setupListeners(store.dispatch);

export * from "../services/tmdbApi";
export * from "./authSlice";

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = (
  dispatch: AppDispatch,
  getState: () => RootState
) => ReturnType;
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
