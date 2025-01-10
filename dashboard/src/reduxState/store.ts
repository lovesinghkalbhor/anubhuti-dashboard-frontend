import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Features/storeuser/userSlice";
import messageReducer from "./Features/storemessages.ts/messageSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
