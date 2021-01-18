import React, { useEffect } from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { Text, FlatList, Keyboard, ListRenderItem } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import BackgroundGeolocation from 'react-native-background-geolocation';

import {
  ProductType,
  ShoppingListStackParamList,
  ThemeType,
  AddIconActions,
  StoreType
} from 'types';
import {
  tabBarVisibleState,
  productInEditModeState,
  productListSelector,
  productListState,
  usernameState,
  userState,
  loadingState,
  globalProductListState,
  favoriteStoresState
} from 'store';
import ProductListItem from 'components/ProductListItem';
import Header from 'components/Header';
import AddIcon from 'components/AddIcon';
import WelcomeScreen from '../Welcome';
import { NoProductsContainer, TotalCostContainer, Value } from './index.styles';
import AddEditProductScreen from '../AddEditProduct';
import LoginScreen from '../Login';

interface IProps {
  theme: ThemeType;
}

const ShoppingListScreen: React.FC<IProps> = (props: IProps) => {
  const { theme } = props;

  const [products, setProducts] = useRecoilState(productListState);

  const setTabBarVisible = useSetRecoilState(tabBarVisibleState);
  const setFavoriteStores = useSetRecoilState(favoriteStoresState);

  const { totalCost, totalQty } = useRecoilValue(productListSelector);
  const user = useRecoilValue(userState);
  const loadedName = useRecoilValue(usernameState);
  const loading = useRecoilValue(loadingState);
  const isGlobalList = useRecoilValue(globalProductListState);

  const navigation = useNavigation<StackNavigationProp<ShoppingListStackParamList>>();

  const renderProduct: ListRenderItem<ProductType> = ({ item }) => (
    <ProductListItem
      key={item.id}
      id={item.id}
      name={item.name}
      price={item.price}
      amount={item.amount}
      inBasket={item.inBasket}
      updatedAt={item.updatedAt}
      createdAt={item.createdAt}
      theme={theme}
    />
  );

  useEffect(() => {
    const destroyLocationsAndStop = async () => {
      await BackgroundGeolocation.destroyLocations();
      await BackgroundGeolocation.stopSchedule().then((state) => {
        if (state.enabled) {
          BackgroundGeolocation.stop();
        }
      });
      await BackgroundGeolocation.removeListeners();
      console.log('- Destroyed locations and stopped service');
    };

    const destroyLocations = async () => {
      await BackgroundGeolocation.destroyLocations();
      console.log('- Destroyed locations');
    };

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
            typeof shoppingList.data()?.products !== 'undefined'
          ) {
            setProducts(shoppingList.data()?.products);
          } else {
            setProducts([]);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    const getFavoriteStores = async () => {
      try {
        if (user !== null) {
          destroyLocations();

          const favoriteStores = await firestore()
            .collection('favorite-stores')
            .doc(user.uid)
            .get();

          if (
            favoriteStores.data()?.stores &&
            typeof favoriteStores.data()?.stores !== 'undefined'
          ) {
            setFavoriteStores(favoriteStores.data()?.stores);

            const geofences = favoriteStores.data()?.stores?.map((store: StoreType) => ({
              identifier: store.name,
              radius: store.radius,
              latitude: store.latitude,
              longitude: store.longitude,
              notifyOnEntry: true,
              notifyOnExit: true,
              extras: {
                todayPromotion: store.todayPromotion || 'Brak'
              }
            }));

            BackgroundGeolocation.addGeofences(geofences)
              .then((success) => console.log('[addGeofences] Added'))
              .catch((error) => {
                console.log('[addGeofences] FAILURE: ', error);
              });
          } else {
            setFavoriteStores([]);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    getName();
    getProducts();
    getFavoriteStores();

    if (user !== null) {
      destroyLocations();

      // Listen for geofence events.
      BackgroundGeolocation.onGeofence((geofence) => {
        console.log('[geofence] ', geofence.identifier, geofence.action, geofence);

        if (geofence.action === 'ENTER') {
          PushNotification.localNotification({
            channelId: '1',
            title: 'Wejście do obiektu',
            message: `Wszedłeś do obiektu ${geofence.identifier}. Promocja dnia: ${geofence?.extras?.todayPromotion}`
          });
        } else if (geofence.action === 'EXIT') {
          PushNotification.localNotification({
            channelId: '1',
            title: 'Wyjście z obiektu',
            message: `Wyszedłeś z obiektu ${geofence.identifier}. Do zobaczenia!`
          });
        }
      });

      BackgroundGeolocation.ready(
        {
          // Geolocation Config
          desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
          distanceFilter: 10,
          // Activity Recognition
          stopTimeout: 1,
          // Application config
          debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
          logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
          stopOnTerminate: false, // <-- Allow the background-service to continue tracking when user closes the app.
          startOnBoot: true, // <-- Auto start tracking when device is powered-up.
          url: 'http://localhost:8081',
          batchSync: true, // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
          autoSync: true // <-- [Default: true] Set true to sync each location to server as it arrives.
        },
        (state) => {
          console.log('- BackgroundGeolocation is configured and ready: ', state.enabled);

          if (!state.enabled) {
            BackgroundGeolocation.start(() => {
              console.log('- Start success');
            });
          }
        }
      );
    }

    if (user === null) {
      destroyLocationsAndStop();
    }
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
        <AddIcon action={AddIconActions.ADD_PRODUCT} />
        {totalQty !== 0 && (
          <>
            <TotalCostContainer>
              <Icon name="info-circle" size={20} color={theme.colors.secondary} />
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

  const destroyLocationsAndStop = async () => {
    await BackgroundGeolocation.destroyLocations();
    console.log('- Destroyed locations and stopped service');
  };

  const logout = async () => {
    await auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        setUser(null);
        setGlobalProductList(false);
      });
    destroyLocationsAndStop();
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
          headerLeft: undefined,
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
