import React, {useLayoutEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

import {Button, ScrollView, Text} from 'native-base';

import {useDispatch, useSelector} from '../store';
import {listRemoveOne, listUpdateOne, selectById} from '../store/List';

const ListItemPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  // @ts-ignore
  const item = useSelector(state => selectById(state, route.params?.id));

  useLayoutEffect(() => {
    navigation.setOptions({title: item?.title ? item?.title : 'Item Page'});
  }, [navigation, item]);

  const handleDeleteItem = async () => {
    try {
      dispatch(listRemoveOne(item!.id));
      navigation.goBack();
    } catch (error) {}
  };
  const handleDoneItem = () => {
    try {
      dispatch(listUpdateOne({id: item!.id, changes: {isDone: true}}));
      navigation.goBack();
    } catch (error) {}
  };

  return (
    <ScrollView>
      <Text>Title</Text>
      <Text>{item?.title}</Text>
      <Text>Priority</Text>
      <Text>{item?.priority}</Text>
      <Button colorScheme="success" onPress={handleDoneItem}>
        Done
      </Button>
      <Button colorScheme="danger" onPress={handleDeleteItem}>
        Delete
      </Button>
    </ScrollView>
  );
};

export default ListItemPage;
