import {configureStore} from '@reduxjs/toolkit'

import authReducder from './slices/authSlice.js'
import { apiSlice } from './slices/apiSlice.js';

const store = configureStore({
  reducer: {
    'auth': authReducder,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
});

export default store;