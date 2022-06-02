import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  SerializedError,
} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ListItem} from 'definitions/ListItem';
import {RootState} from './index';

export const getListItems = createAsyncThunk('list/getAll', async () => {
  const keys = await AsyncStorage.getAllKeys();
  const result = await AsyncStorage.multiGet(keys);
  return result.map(w => ({id: w[0], ...JSON.parse(w[1]!)}));
});

const listAdapter = createEntityAdapter<ListItem>({
  selectId: user => user.id,
  sortComparer: (a, b) => (a.priority > b.priority ? 1 : -1),
});

type IInitialState = {
  isLoading: boolean;
  currentRequestId?: string;
  error?: SerializedError;
};

const initialState: IInitialState = {
  isLoading: false,
  currentRequestId: undefined,
  error: undefined,
};

export const listSlice = createSlice({
  name: 'list',
  initialState: listAdapter.getInitialState(initialState),
  reducers: {
    listAddOne: listAdapter.addOne,
    listUpdateOne: listAdapter.updateOne,
    listRemoveOne: listAdapter.removeOne,
  },
  extraReducers: builder => {
    builder
      .addCase(getListItems.pending, (state, action) => {
        state.isLoading = true;
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(getListItems.fulfilled, (state, action) => {
        const {requestId} = action.meta;
        if (state.isLoading && state.currentRequestId === requestId) {
          state.isLoading = false;
          listAdapter.addMany(state, action.payload);
          state.currentRequestId = undefined;
        }
      })
      .addCase(getListItems.rejected, (state, action) => {
        const {requestId} = action.meta;
        if (state.isLoading && state.currentRequestId === requestId) {
          state.isLoading = false;
          state.error = action.error;
          state.currentRequestId = undefined;
        }
      });
  },
});

export const {listAddOne, listUpdateOne, listRemoveOne} = listSlice.actions;

export const {selectById, selectAll} = listAdapter.getSelectors<RootState>(
  state => state.listReducer,
);

export default listSlice.reducer;
