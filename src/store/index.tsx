import {configureStore} from '@reduxjs/toolkit';
import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
} from 'react-redux';

import listReducer from './List';

export const store = configureStore({
  reducer: {
    listReducer,
  },
});

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export const useDispatch = () => useReduxDispatch();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
