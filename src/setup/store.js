import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import sidebarContentReducer from "../reducers/sidebarContentReducer";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["convos", "search", "profile"]
};

const reducer = combineReducers({
  sidebarContent: sidebarContentReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer
});

export const RootState = store.getState();
export const AppDispatch = store.dispatch;

export default store;