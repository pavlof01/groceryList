import {createSlice, createEntityAdapter} from '@reduxjs/toolkit';
import {ListItem} from 'definitions/ListItem';

const listAdapter = createEntityAdapter<ListItem>({
  selectId: user => user.id,
});

export const listSlice = createSlice({
  name: 'list',
  initialState: listAdapter.getInitialState(),
  reducers: {
    listAddOne: listAdapter.addOne,
    listAddMany: listAdapter.addMany,
    listUpdateOne: listAdapter.updateOne,
    listRemoveOne: listAdapter.removeOne,
  },
});

export const {listAddOne, listAddMany, listUpdateOne, listRemoveOne} =
  listSlice.actions;

export default listSlice.reducer;
