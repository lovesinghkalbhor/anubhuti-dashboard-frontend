import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MessageState {
  message: string | null;
  isSuccess: boolean;
}

const initialState: MessageState = {
  message: null,
  isSuccess: false,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage(
      state,
      action: PayloadAction<{ message: string; isSuccess: boolean }>
    ) {
      state.message = action.payload.message;
      state.isSuccess = action.payload.isSuccess;
    },
    clearMessage(state) {
      state.message = null;
      state.isSuccess = false;
    },
  },
});

export const { setMessage, clearMessage } = messageSlice.actions;
export default messageSlice.reducer;
