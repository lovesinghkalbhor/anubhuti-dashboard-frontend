import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string | null;
  email: string | null;
  mobile: string | null;
  adhar_card: string | null;
}

const initialState: UserState = {
  name: null,
  email: null,
  mobile: null,
  adhar_card: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(
      state,
      action: PayloadAction<{
        name: string;
        email: string;
        mobile: string;
        adhar_card: string;
      }>
    ) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.mobile = action.payload.mobile;
      state.adhar_card = action.payload.adhar_card;
    },
    clearUser(state) {
      state.name = null;
      state.email = null;
      state.mobile = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
