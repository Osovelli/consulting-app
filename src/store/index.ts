// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import serviceReducer from  './serviceSlice';
import progressReducer from './progressSlice'
import applicationReducer from './applicationSlice';

export const store = configureStore({
  reducer: {
    services: serviceReducer,
    progress: progressReducer,
    application: applicationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;