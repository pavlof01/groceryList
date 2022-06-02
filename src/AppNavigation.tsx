import React, {memo} from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import MainList from './screens/MainList';
import AddProduct from './screens/AddProduct';
import ListPage from './screens/ListItemPage';

type RootStackParamList = {
  List: undefined;
  CreateListItem: undefined;
  ListPage: {id: string};
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const RootStack = createStackNavigator<RootStackParamList>();

const RootNavigation = memo(() => {
  const navigationRef = useNavigationContainerRef();
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator>
        <RootStack.Screen name="List" component={MainList} />
        <RootStack.Screen
          name="CreateListItem"
          component={AddProduct}
          options={{...TransitionPresets.ModalPresentationIOS}}
        />
        <RootStack.Screen
          name="ListPage"
          component={ListPage}
          options={{...TransitionPresets.ModalPresentationIOS}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
});

export default RootNavigation;
