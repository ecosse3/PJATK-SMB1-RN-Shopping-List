import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, FlatList, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import WelcomeScreen from '../Welcome';
import Header from '../../components/Header';
import { ShoppingListStackParamList } from '../../utils/types';
import {
  productInEditModeState,
  productListSelector,
  productListState,
  tabBarVisibleState,
  usernameState
} from '../../store';
import { ThemeType } from '../../utils/SCThemeProvider';
import AddProductIcon from '../../components/AddProductIcon';
import { NoProductsContainer, TotalCostContainer, Value } from './index.styles';
import Product from '../../components/Product';
import AddEditProductScreen from '../AddEditProduct';

interface IProps {
  theme: ThemeType;
}

const ShoppingListScreen: React.FC<IProps> = (props: IProps) => {
  const { theme } = props;

  const [loadedName, setLoadedName] = useRecoilState(usernameState);
  const [products, setProducts] = useRecoilState(productListState);

  const setTabBarVisible = useSetRecoilState(tabBarVisibleState);
  const { totalCost, totalQty } = useRecoilValue(productListSelector);

  const navigation = useNavigation();

  const renderProduct = ({ item }) => (
    <Product
      id={item.id}
      name={item.name}
      price={item.price}
      amount={item.amount}
      inBasket={item.inBasket}
      theme={theme}
    />
  );

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

  useEffect(() => {
    const getProducts = async () => {
      try {
        const result = await AsyncStorage.getItem('@products');

        if (result !== null) {
          setProducts(JSON.parse(result));
        }
      } catch (err) {
        console.log(err);
      }
    };

    getProducts();
  }, []);

  if (loadedName) {
    return (
      <>
        <Header text={`Witaj, ${loadedName}`} />
        <AddProductIcon />
        {totalQty !== 0 && (
          <>
            <TotalCostContainer>
              <Icon
                name="info-circle"
                size={20}
                color={theme.colors.secondary}
              />
              <Value>Do zapłaty: {totalCost.toFixed(2).toString()} zł</Value>
            </TotalCostContainer>
            <FlatList
              data={products}
              renderItem={renderProduct}
              keyExtractor={(item) => item.id}
            />
          </>
        )}
        {totalQty === 0 && (
          <NoProductsContainer>
            <Text>Brak produktów na liście!</Text>
          </NoProductsContainer>
        )}
      </>
    );
  } else {
    return null;
  }
};

const Stack = createStackNavigator<ShoppingListStackParamList>();

const ShoppingList: React.FC<IProps> = ({ theme }: IProps) => {
  const setTabBarVisible = useSetRecoilState(tabBarVisibleState);
  const productInEditMode = useRecoilValue(productInEditModeState);

  return (
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
      <Stack.Screen
        name="AddEditProductScreen"
        children={() => <AddEditProductScreen theme={theme} />}
        options={({ navigation }) => ({
          title: productInEditMode ? 'Edytuj produkt' : 'Dodaj produkt',
          headerTitleStyle: { color: '#FFFFFF' },
          headerStyle: { backgroundColor: theme.colors.secondary },
          headerLeft: () => (
            <Icon2
              name="arrow-left"
              size={25}
              color="#FFFFFF"
              style={{ marginLeft: 15 }}
              onPress={() => {
                setTabBarVisible(true);
                navigation.goBack();
              }}
            />
          )
        })}
      />
    </Stack.Navigator>
  );
};

export default ShoppingList;
