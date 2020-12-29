import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Text,
  Button,
  Input,
  Container,
  ButtonsContainer,
  InputsContainer,
  Error
} from './index.styles';
import {
  storeInEditModeState,
  tabBarVisibleState,
  useAddEditFavoriteStore
} from '../../store';
import Header from '../../components/Header';
import { ThemeType } from '../../utils/types';
import { useGeolocation } from '../../hooks/useGeolocation';

interface IProps {
  theme: ThemeType;
}

type RoutePropsType = {
  params?: {
    id?: string;
    name?: string;
    description?: string;
    radius?: number;
    longitude?: number;
    latitude?: number;
  };
};

const AddEditFavoriteStoreScreen: React.FC<IProps> = (props: IProps) => {
  const { theme } = props;

  const position = useGeolocation();

  const setTabBarVisible = useSetRecoilState(tabBarVisibleState);
  const storeInEditMode = useRecoilValue(storeInEditModeState);

  const addEditFavoriteStore = useAddEditFavoriteStore();
  const navigation = useNavigation();
  const route: RoutePropsType = useRoute();

  const propsStoreId = route?.params?.id;
  const propsStoreName = route?.params?.name;
  const propsStoreDescription = route?.params?.description;
  const propsStoreRadius = route?.params?.radius;
  const propsStoreLongitude = route?.params?.longitude;
  const propsStoreLatitude = route?.params?.latitude;

  const [storeName, setStoreName] = useState(propsStoreName || '');
  const [storeDescription, setStoreDescription] = useState(propsStoreDescription || '');
  const [storeRadius, setStoreRadius] = useState(propsStoreRadius?.toString() || '');
  const [storeLongitude, setStoreLongitude] = useState(
    propsStoreLongitude || position.longitude
  );
  const [storeLatitude, setStoreLatitude] = useState(
    propsStoreLatitude || position.latitude
  );
  const [storeRadiusError, setStoreRadiusError] = useState(false);

  const checkAddFavoriteStore = (
    id: string,
    name: string,
    description: string,
    radius: string,
    longitude: number,
    latitude: number
  ) => {
    const priceRegex = /^\d+$/;

    if (!priceRegex.test(radius) || Number(radius) < 50) {
      setStoreRadiusError(true);
      return 0;
    }

    addEditFavoriteStore({
      id,
      name,
      description,
      radius: Number(radius),
      longitude,
      latitude
    });

    navigation.navigate('FavoriteStoresScreen');
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setTabBarVisible(true);
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    setTabBarVisible(false);
  }, []);

  return (
    <>
      <Header text={storeInEditMode ? storeName : 'Dodaj sklep do ulubionych'} />
      <Container>
        <InputsContainer>
          <Input
            theme={{
              colors: {
                primary: theme.colors.primary,
                underlineColor: 'transparent'
              }
            }}
            mode="outlined"
            placeholder="Nazwa"
            maxLength={20}
            onChangeText={(text) => setStoreName(text)}
            value={storeName}
          />
          <Input
            theme={{
              colors: {
                primary: theme.colors.primary,
                underlineColor: 'transparent'
              }
            }}
            mode="outlined"
            placeholder="Opis"
            onChangeText={(text) => {
              setStoreDescription(text);
            }}
            value={storeDescription}
          />
          <Input
            theme={{
              colors: {
                primary: theme.colors.primary,
                underlineColor: 'transparent'
              }
            }}
            mode="outlined"
            keyboardType="number-pad"
            placeholder="Promień (m)"
            onChangeText={(text) => {
              setStoreRadiusError(false);
              setStoreRadius(text);
            }}
            value={storeRadius}
            error={storeRadiusError}
          />
          {storeRadiusError &&
            storeRadius.length > 0 &&
            Number.isNaN(Number(storeRadius)) && <Error>Proszę wprowadzić liczbę!</Error>}
          {storeRadiusError && storeRadius.length === 0 && (
            <Error>Proszę podać promień!</Error>
          )}
          {storeRadiusError && storeRadius.length !== 0 && Number(storeRadius) < 50 && (
            <Error>Promień nie może być mniejszy niż 50 metrów!</Error>
          )}
        </InputsContainer>
        <ButtonsContainer>
          <Button
            disabled={storeName.length === 0 || storeDescription.length === 0}
            onPress={() =>
              checkAddFavoriteStore(
                propsStoreId || uuidv4(),
                storeName,
                storeDescription,
                storeRadius,
                storeLongitude,
                storeLatitude
              )
            }>
            <Text button>Zapisz</Text>
          </Button>
        </ButtonsContainer>
      </Container>
    </>
  );
};

export default AddEditFavoriteStoreScreen;
