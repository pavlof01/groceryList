import {configureStore, createListenerMiddleware} from '@reduxjs/toolkit';
import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import listReducer, {listAddOne, listUpdateOne, listRemoveOne} from './List';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: listAddOne,
  effect: async action =>
    await AsyncStorage.setItem(
      action.payload.id,
      JSON.stringify(action.payload),
    ),
});
listenerMiddleware.startListening({
  actionCreator: listUpdateOne,
  effect: async action =>
    await AsyncStorage.mergeItem!(
      action.payload.id.toString(),
      JSON.stringify(action.payload.changes),
    ),
});
listenerMiddleware.startListening({
  actionCreator: listRemoveOne,
  effect: async action =>
    await AsyncStorage.removeItem(action.payload.toString()),
});

export const store = configureStore({
  reducer: {
    listReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export const useDispatch = () => useReduxDispatch();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
