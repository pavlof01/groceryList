import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button, Text, View} from 'react-native';

const MainList = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Button
        title="Add item"
        onPress={() => navigation.navigate('CreateListItem')}
      />
      <Text>MainList</Text>
      <Text>MainList</Text>
      <Text>MainList</Text>
      <Text>MainList</Text>
      <Text>MainList</Text>
      <Text>MainList</Text>
    </View>
  );
};

export default MainList;
