import {useNavigation} from '@react-navigation/native';
import {VStack} from 'native-base';
import React, {FC} from 'react';
import {Text, Pressable} from 'react-native';

import {ListItem} from '../../definitions/ListItem';

const ListCard: FC<ListItem> = ({id, title, priority, isDone}) => {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.navigate('ListPage', {id})}>
      <VStack space={2} bgColor="amber.100" opacity={isDone ? 0.5 : 1}>
        <Text>{title}</Text>
        <Text>priority {priority}</Text>
      </VStack>
    </Pressable>
  );
};

export default ListCard;
