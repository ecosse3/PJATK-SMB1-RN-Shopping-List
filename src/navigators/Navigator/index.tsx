import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useRecoilValue } from 'recoil';
import ShoppingList from '../../screens/ShoppingList';
import Settings from '../../screens/Settings';
import { TabParamList, ThemeType } from '../../utils/types';
import {
  tabBarVisibleState,
  productListSelector,
  userState,
  favoriteStoresSelector
} from '../../store';
import FavoriteStores from '../../screens/FavoriteStores';

interface IProps {
  theme: ThemeType;
}

const Tab = createBottomTabNavigator<TabParamList>();

const Navigator: React.FC<IProps> = (props: IProps) => {
  const { theme } = props;
  const isTabBarVisible = useRecoilValue(tabBarVisibleState);
  const user = useRecoilValue(userState);
  const { totalQty: totalProductsQty } = useRecoilValue(productListSelector);
  const { totalQty: totalStoresQty } = useRecoilValue(favoriteStoresSelector);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="ShoppingList"
        tabBarOptions={{
          activeTintColor: theme.colors.primary,
          inactiveTintColor: '#FFFFFF',
          style: {
            backgroundColor: theme.colors.secondary
          }
        }}>
        <Tab.Screen
          name="ShoppingList"
          children={() => <ShoppingList theme={theme} />}
          options={{
            tabBarLabel: 'Lista zakupów',
            tabBarBadge: totalProductsQty,
            tabBarBadgeStyle: { backgroundColor: theme.colors.badge },
            tabBarVisible: isTabBarVisible && !!user,
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
          name="FavoriteStores"
          children={() => <FavoriteStores theme={theme} />}
          options={{
            tabBarLabel: 'Ulubione sklepy',
            tabBarBadge: totalStoresQty,
            tabBarBadgeStyle: { backgroundColor: theme.colors.badge },
            tabBarVisible: isTabBarVisible && !!user,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="heart-multiple-outline"
                color={color}
                size={26}
              />
            )
          }}
        />
        <Tab.Screen
          name="Settings"
          children={() => <Settings theme={theme} />}
          options={{
            tabBarLabel: 'Ustawienia',
            tabBarVisible: isTabBarVisible && !!user,
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
