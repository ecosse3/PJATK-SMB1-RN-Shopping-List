import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useRecoilValue } from 'recoil';
import ShoppingList from '../../screens/ShoppingList';
import Settings from '../../screens/Settings';
import { TabParamList } from '../../utils/types';
import { tabBarVisibleState } from '../../store';

const Tab = createBottomTabNavigator<TabParamList>();

const Navigator: React.FC = () => {
  const isTabBarVisible = useRecoilValue(tabBarVisibleState);

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
            tabBarVisible: isTabBarVisible,
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

export default Navigator;
