import React, { useEffect } from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import WelcomeScreen from '../Welcome';
import Header from '../../components/Header';
import { ShoppingListStackParamList, ThemeType } from '../../utils/types';
import {
  productInEditModeState,
  productListSelector,
  productListState,
  tabBarVisibleState,
  usernameState,
  userState
} from '../../store';
import AddProductIcon from '../../components/AddProductIcon';
import { NoProductsContainer, TotalCostContainer, Value } from './index.styles';
import Product from '../../components/Product';
import AddEditProductScreen from '../AddEditProduct';
import LoginScreen from '../Login';

interface IProps {
  theme: ThemeType;
}

const ShoppingListScreen: React.FC<IProps> = (props: IProps) => {
  const { theme } = props;

  const [loadedName, setLoadedName] = useRecoilState(usernameState);
  const [products, setProducts] = useRecoilState(productListState);
  const [user, setUser] = useRecoilState(userState);

  const setTabBarVisible = useSetRecoilState(tabBarVisibleState);
  const { totalCost, totalQty } = useRecoilValue(productListSelector);

  const navigation = useNavigation<StackNavigationProp<ShoppingListStackParamList>>();

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

  const onAuthStateChanged = (authUser: FirebaseAuthTypes.User) => {
    setUser(authUser);
  };

  useEffect(() => {
    const getName = async () => {
      try {
        const result = await AsyncStorage.getItem('@username');

        if (user === null) {
          navigation.navigate('LoginScreen');
        } else {
          setTabBarVisible(true);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getName();
  }, [loadedName, user]);

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      // Prevent default behavior of leaving the screen
      e.preventDefault();
    });
  }, [navigation]);

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

    const unsubscribe = auth().onAuthStateChanged(onAuthStateChanged);
    return unsubscribe;
  }, []);

  if (loadedName) {
    return (
      <>
        <Header text={`Witaj, ${loadedName}`} />
        <AddProductIcon />
        {totalQty !== 0 && (
          <>
            <TotalCostContainer>
              <Icon name="info-circle" size={20} color={theme.colors.secondary} />
              <Value>Do zapłaty: {totalCost.toFixed(2).toString()} zł</Value>
            </TotalCostContainer>
            <FlatList data={products} renderItem={renderProduct} keyExtractor={(item) => item.id} />
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
  const productInEditMode = useRecoilValue(productInEditModeState);
  const setUser = useSetRecoilState(userState);
  const setTabBarVisible = useSetRecoilState(tabBarVisibleState);

  const logout = (navigation: StackNavigationProp<ShoppingListStackParamList>) => {
    auth()
      .signOut()
      .then(() => {
        setTabBarVisible(false);
        console.log('User signed out!');
        setUser(null);
        navigation.navigate('LoginScreen');
      });
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ShoppingListScreen"
        children={() => <ShoppingListScreen theme={theme} />}
        options={({ navigation }) => ({
          title: 'Lista zakupów',
          headerTitleStyle: { color: '#FFFFFF' },
          headerStyle: { backgroundColor: theme.colors.secondary },
          headerLeft: null,
          headerRight: () => (
            <Icon3
              name="sign-out-alt"
              size={25}
              color="#FFFFFF"
              style={{ marginRight: 15 }}
              onPress={() => logout(navigation)}
            />
          )
        })}
      />
      <Stack.Screen
        name="WelcomeScreen"
        children={() => <WelcomeScreen theme={theme} />}
        options={{
          header: () => null
        }}
      />
      <Stack.Screen
        name="LoginScreen"
        children={() => <LoginScreen theme={theme} />}
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
                navigation.navigate('ShoppingListScreen', {
                  tabBarVisible: true
                });
              }}
            />
          )
        })}
      />
    </Stack.Navigator>
  );
};

export default ShoppingList;
