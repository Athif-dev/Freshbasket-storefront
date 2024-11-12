import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.isAuthenticated = true;
    },
    clearUser(state) {
      state.id = null;
      state.firstName = null;
      state.lastName = null;
      state.email = null;
      state.isAuthenticated = false;
    },
    loadUser(state, action) {
      state.id = action.payload.id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.isAuthenticated = true;
    },
  },
});

export const { setUser, loadUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
