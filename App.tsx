import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TabParamList } from './src/utils/types';
import ShoppingList from './src/screens/ShoppingList';

const Tab = createMaterialBottomTabNavigator<TabParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="ShoppingList">
        <Tab.Screen
          name="ShoppingList"
          component={ShoppingList}
          options={{
            tabBarLabel: 'Shopping List',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

App.displayName = 'App';

export default App;
