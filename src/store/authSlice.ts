import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// currently no use of whole AuthSlice
export interface AuthState {
  loading: boolean;
  error: string | null;
  sessionId: string | null;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  sessionId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginIntialise: (state) => {
      state = { ...state, loading: true };
    },
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.sessionId = action.payload;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.sessionId = null;
    },
  },
  selectors: {
    loading: (state: AuthState) => state.loading,
    error: (state: AuthState) => state.error,
    sessionId: (state: AuthState) => state.sessionId,
  },
});
export const { loginIntialise, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export const { loading, error, sessionId } = authSlice.selectors;
export default authSlice.reducer;
