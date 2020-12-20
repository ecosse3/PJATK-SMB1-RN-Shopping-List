import React, { useEffect } from 'react';
import {
  createStackNavigator,
  StackNavigationProp
} from '@react-navigation/stack';
import { Text, FlatList, Keyboard } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import WelcomeScreen from '../Welcome';
import Header from '../../components/Header';
import { ShoppingListStackParamList, ThemeType } from '../../utils/types';
import {
  tabBarVisibleState,
  productInEditModeState,
  productListSelector,
  productListState,
  usernameState,
  userState,
  loadingState,
  globalProductListState
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

  const [products, setProducts] = useRecoilState(productListState);

  const setTabBarVisible = useSetRecoilState(tabBarVisibleState);

  const { totalCost, totalQty } = useRecoilValue(productListSelector);
  const user = useRecoilValue(userState);
  const loadedName = useRecoilValue(usernameState);
  const loading = useRecoilValue(loadingState);
  const isGlobalList = useRecoilValue(globalProductListState);

  const navigation = useNavigation<
    StackNavigationProp<ShoppingListStackParamList>
  >();

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
        // const result = await AsyncStorage.getItem('@username');

        if (user === null || !loadedName) {
          setTabBarVisible(false);
          navigation.navigate('LoginScreen');
        } else {
          setTabBarVisible(true);
          Keyboard.dismiss();
        }
      } catch (err) {
        console.log(err);
      }
    };

    const getProducts = async () => {
      try {
        // const result = await AsyncStorage.getItem('@products');

        // if (result !== null) {
        //   setProducts(JSON.parse(result));
        // }

        if (user !== null) {
          const shoppingList = await firestore()
            .collection('shopping-list')
            .doc(isGlobalList ? 'global' : user.uid)
            .get();

          if (
            shoppingList.data()?.products &&
            typeof shoppingList.data().products !== 'undefined'
          ) {
            setProducts(shoppingList.data().products);
          } else {
            setProducts([]);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    getName();
    getProducts();
  }, [loadedName, user, isGlobalList]);

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      // Prevent default behavior of leaving the screen
      e.preventDefault();
    });
  }, [navigation]);

  if (!loading && user) {
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
            <Text>
              Brak produktów na {isGlobalList ? 'globalnej liście!' : 'liście!'}
            </Text>
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
  const setGlobalProductList = useSetRecoilState(globalProductListState);
  const [user, setUser] = useRecoilState(userState);

  const logout = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        setUser(null);
        setGlobalProductList(false);
      });
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: !!user
      }}>
      <Stack.Screen
        name="ShoppingListScreen"
        children={() => <ShoppingListScreen theme={theme} />}
        options={() => ({
          title: 'Lista zakupów',
          headerTitleStyle: { color: '#FFFFFF' },
          headerStyle: {
            backgroundColor: theme.colors.secondary
          },
          headerLeft: null,
          headerRight: () => (
            <Icon3
              name="sign-out-alt"
              size={25}
              color="#FFFFFF"
              style={{ marginRight: 15 }}
              onPress={() => logout()}
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
