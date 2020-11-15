import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Icon from 'react-native-vector-icons/FontAwesome';
import WelcomeScreen from '../Welcome';
import Header from '../../components/Header';
import { ShoppingListStackParamList } from '../../utils/types';
import {
  productListSelector,
  tabBarVisibleState,
  usernameState
} from '../../store';
import { ThemeType } from '../../utils/SCThemeProvider';
import AddProductIcon from '../../components/AddProductIcon';
import { TotalCostContainer, Value } from './index.styles';

interface IProps {
  theme: ThemeType;
}

const ShoppingListScreen: React.FC<IProps> = (props: IProps) => {
  const { theme } = props;

  const [loadedName, setLoadedName] = useRecoilState(usernameState);
  const setTabBarVisible = useSetRecoilState(tabBarVisibleState);
  const { totalCost } = useRecoilValue(productListSelector);

  const navigation = useNavigation();

  useEffect(() => {
    const getName = async () => {
      try {
        const result = await AsyncStorage.getItem('@username');

        if (result === null) {
          navigation.navigate('WelcomeScreen');
        } else {
          setLoadedName(result);
          setTabBarVisible(true);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getName();
  }, [loadedName]);

  if (loadedName) {
    return (
      <View>
        <Header text={`Witaj, ${loadedName}`} />
        <AddProductIcon />
        <TotalCostContainer>
          <Icon name="info-circle" size={20} color={theme.colors.secondary} />
          <Value>Do zapłaty: {totalCost.toFixed(2)} zł</Value>
        </TotalCostContainer>
      </View>
    );
  } else {
    return null;
  }
};

const Stack = createStackNavigator<ShoppingListStackParamList>();

const ShoppingList: React.FC<IProps> = ({ theme }: IProps) => (
  <Stack.Navigator>
    <Stack.Screen
      name="ShoppingListScreen"
      children={() => <ShoppingListScreen theme={theme} />}
      options={{
        title: 'Lista zakupów',
        headerTitleStyle: { color: '#FFFFFF' },
        headerStyle: { backgroundColor: theme.colors.secondary }
      }}
    />
    <Stack.Screen
      name="WelcomeScreen"
      children={() => <WelcomeScreen theme={theme} />}
      options={{
        header: () => null
      }}
    />
  </Stack.Navigator>
);

export default ShoppingList;
