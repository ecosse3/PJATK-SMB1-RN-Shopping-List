import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TabParamList } from './src/utils/types';
import ShoppingList from './src/screens/ShoppingList';
import Settings from './src/screens/Settings';

const Tab = createBottomTabNavigator<TabParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="ShoppingList"
        tabBarOptions={{
          activeTintColor: '#89b6a5',
          inactiveTintColor: '#FFFFFF',
          style: {
            backgroundColor: '#474350'
          }
        }}>
        <Tab.Screen
          name="ShoppingList"
          component={ShoppingList}
          options={{
            tabBarLabel: 'Lista zakupów',
            tabBarBadge: 3,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="cart-outline"
                color={color}
                size={26}
              />
            )
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarLabel: 'Ustawienia',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="cog-outline"
                color={color}
                size={26}
              />
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

App.displayName = 'App';

export default App;
