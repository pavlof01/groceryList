import React, {memo} from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import MainList from './screens/MainList';
import AddProduct from './screens/AddProduct';

type RootStackParamList = {
  List: undefined;
  CreateListItem: undefined;
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
      </RootStack.Navigator>
    </NavigationContainer>
  );
});

export default RootNavigation;
