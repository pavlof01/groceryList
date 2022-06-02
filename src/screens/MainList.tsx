import React, {useEffect, useState, useMemo} from 'react';
import {FlatList} from 'react-native';
import {Box, Button, Flex, Radio, Text, HStack, Center} from 'native-base';
import {useNavigation} from '@react-navigation/native';

import {useDispatch, useSelector} from '../store';
import {getListItems, selectAll} from '../store/List';
import {ListItem} from '../definitions/ListItem';
import ListCard from '../components/ListCard';

enum SortType {
  all = 'all',
  have = 'have',
  runout = 'runout',
}

const MainList = () => {
  const list = useSelector(selectAll);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [sortType, setSortType] = useState(SortType.all);

  useEffect(() => {
    // @ts-ignore
    dispatch(getListItems());
  }, [dispatch]);

  const handleChangeSortType = (nextValue: string) =>
    setSortType(nextValue as SortType);

  const renderItem = ({item}: {item: ListItem}) => <ListCard {...item} />;

  const ItemSeparatorComponent = () => <Box mt={2} />;

  const ListHeaderComponent = () => (
    <Box>
      <Button onPress={() => navigation.navigate('CreateListItem')}>
        Add item
      </Button>
      <Radio.Group
        name="myRadioGroup"
        flexDirection="row"
        value={sortType.toString()}
        onChange={handleChangeSortType}>
        <Center flex={1}>
          <HStack space={5}>
            <Radio value={SortType.all} my={1}>
              {SortType.all}
            </Radio>
            <Radio value={SortType.have} my={1}>
              {SortType.have}
            </Radio>
            <Radio value={SortType.runout} my={1}>
              {SortType.runout}
            </Radio>
          </HStack>
        </Center>
      </Radio.Group>
    </Box>
  );

  const sortableData = useMemo(
    () =>
      list.filter(item =>
        sortType === SortType.all
          ? item
          : sortType === SortType.have
          ? !item.isDone
          : item.isDone,
      ),
    [sortType, list],
  );

  return (
    <Flex flex={1}>
      <FlatList
        keyExtractor={item => item.id}
        data={sortableData}
        renderItem={renderItem}
        ListHeaderComponent={ListHeaderComponent}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListEmptyComponent={
          <Text mt={10} textAlign="center">
            EMPTY please create some items
          </Text>
        }
        contentContainerStyle={{flex: 1}}
      />
    </Flex>
  );
};

export default MainList;
