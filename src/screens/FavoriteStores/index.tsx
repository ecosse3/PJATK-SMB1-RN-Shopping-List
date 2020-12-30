import React, { useEffect } from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { Text, FlatList, View, ListRenderItem } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState, useRecoilValue } from 'recoil';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Geocode from 'react-geocode';
import {
  AddIconActions,
  FavoriteStoresStackParamList,
  StoreType,
  ThemeType
} from 'types';
import StoreListItem from 'components/StoreListItem';
import StoresMap from 'components/StoresMap';
import AddIcon from 'components/AddIcon';
import AddEditFavoriteStoreScreen from 'screens/AddEditFavoriteStore';
import {
  favoriteStoresSelector,
  favoriteStoresState,
  loadingState,
  nearbyAddressState,
  storeInEditModeState,
  userState
} from 'store';
import { useGeolocation } from 'hooks/useGeolocation';
import {
  LocationAddress,
  LocationInfoContainer,
  LocationTitle,
  NoStoresContainer
} from './index.styles';

interface IProps {
  theme: ThemeType;
}

const FavoriteStoresScreen: React.FC<IProps> = (props: IProps) => {
  const { theme } = props;

  const position = useGeolocation();

  const [nearbyAddress, setNearbyAddress] = useRecoilState(nearbyAddressState);

  const favoriteStores = useRecoilValue(favoriteStoresState);
  const { totalQty } = useRecoilValue(favoriteStoresSelector);
  const user = useRecoilValue(userState);
  const loading = useRecoilValue(loadingState);

  const navigation = useNavigation<StackNavigationProp<FavoriteStoresStackParamList>>();

  const renderStore: ListRenderItem<StoreType> = ({ item }) => (
    <StoreListItem
      id={item.id}
      name={item.name}
      description={item.description}
      radius={item.radius}
      latitude={item.latitude}
      longitude={item.longitude}
      address={item.address}
      theme={theme}
    />
  );

  useEffect(() => {
    Geocode.fromLatLng(position.latitude.toString(), position.longitude.toString()).then(
      (response) => {
        const address = response.results[0].formatted_address;
        setNearbyAddress(address);
      },
      (error: string) => {
        console.log(error);
      }
    );
  }, [position]);

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      // Prevent default behavior of leaving the screen
      e.preventDefault();
    });
  }, [navigation]);

  if (!loading && user && totalQty !== 0) {
    return (
      <FlatList
        ListHeaderComponent={
          <>
            <StoresMap theme={theme} />
            <AddIcon action={AddIconActions.ADD_STORE} />
            <LocationInfoContainer>
              <Icon name="map-marker-alt" size={14} color={theme.colors.secondary} />
              <LocationTitle>W pobliżu: </LocationTitle>
              <LocationAddress>{nearbyAddress}</LocationAddress>
            </LocationInfoContainer>
          </>
        }
        data={favoriteStores}
        renderItem={renderStore}
        keyExtractor={(item) => item.id}
        ListFooterComponent={<View style={{ marginBottom: 52 }} />}
      />
    );
  } else if (!loading && user && totalQty === 0) {
    return (
      <>
        <StoresMap theme={theme} />
        <AddIcon action={AddIconActions.ADD_STORE} />
        <LocationInfoContainer>
          <Icon name="map-marker-alt" size={14} color={theme.colors.secondary} />
          <LocationTitle>W pobliżu: </LocationTitle>
          <LocationAddress>{nearbyAddress}</LocationAddress>
        </LocationInfoContainer>
        <NoStoresContainer>
          <Text>Nie posiadasz ulubionych sklepów!</Text>
        </NoStoresContainer>
      </>
    );
  } else {
    return null;
  }
};

const Stack = createStackNavigator<FavoriteStoresStackParamList>();

const FavoriteStores: React.FC<IProps> = ({ theme }: IProps) => {
  const user = useRecoilValue(userState);
  const storeInEditMode = useRecoilValue(storeInEditModeState);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: !!user
      }}>
      <Stack.Screen
        name="FavoriteStoresScreen"
        children={() => <FavoriteStoresScreen theme={theme} />}
        options={() => ({
          title: 'Ulubione sklepy',
          headerTitleStyle: { color: '#FFFFFF' },
          headerStyle: {
            backgroundColor: theme.colors.secondary
          },
          headerLeft: undefined
        })}
      />
      <Stack.Screen
        name="AddEditFavoriteStoreScreen"
        children={() => <AddEditFavoriteStoreScreen theme={theme} />}
        options={({ navigation }) => ({
          title: storeInEditMode ? 'Edytuj ulubiony sklep' : 'Dodaj sklep do ulubionych',
          headerTitleStyle: { color: '#FFFFFF' },
          headerStyle: { backgroundColor: theme.colors.secondary },
          headerLeft: () => (
            <Icon2
              name="arrow-left"
              size={25}
              color="#FFFFFF"
              style={{ marginLeft: 15 }}
              onPress={() => {
                navigation.navigate('FavoriteStoresScreen', {
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

export default FavoriteStores;
