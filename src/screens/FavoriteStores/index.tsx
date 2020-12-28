import React, { useEffect } from 'react';
import {
  createStackNavigator,
  StackNavigationProp
} from '@react-navigation/stack';
import { Text, FlatList } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';
import Header from '../../components/Header';
import { FavoriteStoresStackParamList, ThemeType } from '../../utils/types';
import {
  userState,
  loadingState,
  favoriteStoresState,
  favoriteStoresSelector
} from '../../store';
import AddIcon, { AddIconActions } from '../../components/AddIcon';
import { NoStoresContainer } from './index.styles';
import Product from '../../components/Product';

interface IProps {
  theme: ThemeType;
}

const FavoriteStoresScreen: React.FC<IProps> = (props: IProps) => {
  const { theme } = props;

  const favoriteStores = useRecoilValue(favoriteStoresState);
  const { totalQty } = useRecoilValue(favoriteStoresSelector);
  const user = useRecoilValue(userState);
  const loading = useRecoilValue(loadingState);

  const navigation = useNavigation<
    StackNavigationProp<FavoriteStoresStackParamList>
  >();

  const renderStore = ({ item }) => (
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
    navigation.addListener('beforeRemove', (e) => {
      // Prevent default behavior of leaving the screen
      e.preventDefault();
    });
  }, [navigation]);

  if (!loading && user) {
    return (
      <>
        <Header text="" />
        <AddIcon action={AddIconActions.ADD_STORE} />
        {totalQty !== 0 && (
          <FlatList
            data={favoriteStores}
            renderItem={renderStore}
            keyExtractor={(item) => item.id}
          />
        )}
        {totalQty === 0 && (
          <NoStoresContainer>
            <Text>Nie posiadasz ulubionych sklepów!</Text>
          </NoStoresContainer>
        )}
      </>
    );
  } else {
    return null;
  }
};

const Stack = createStackNavigator<FavoriteStoresStackParamList>();

const FavoriteStores: React.FC<IProps> = ({ theme }: IProps) => {
  const user = useRecoilValue(userState);

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
          headerLeft: null
        })}
      />
    </Stack.Navigator>
  );
};

export default FavoriteStores;
