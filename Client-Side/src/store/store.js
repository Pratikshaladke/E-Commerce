import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from "../Slice/authSlice";
import cartReducer from '../Slice/storeSlice'

const reducerlist = combineReducers({
  auth: authReducer,
  cart:cartReducer
})
const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig,
  reducerlist)
export const store = configureStore({
  reducer: persistedReducer,
  devTools: true

})
export const persistor = persistStore(store)