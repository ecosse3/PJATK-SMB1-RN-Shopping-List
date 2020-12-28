import React, { useEffect } from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { Text, FlatList } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { FavoriteStoresStackParamList, ThemeType } from '../../utils/types';
import {
  userState,
  loadingState,
  favoriteStoresState,
  favoriteStoresSelector,
  storeInEditModeState
} from '../../store';
import AddIcon, { AddIconActions } from '../../components/AddIcon';
import { NoStoresContainer, ListContainer } from './index.styles';
import StoresMap from '../../components/StoresMap';
import StoreListItem from '../../components/StoreListItem';
import AddEditFavoriteStoreScreen from '../AddEditFavoriteStore';

interface IProps {
  theme: ThemeType;
}

const FavoriteStoresScreen: React.FC<IProps> = (props: IProps) => {
  const { theme } = props;

  const favoriteStores = useRecoilValue(favoriteStoresState);
  const { totalQty } = useRecoilValue(favoriteStoresSelector);
  const user = useRecoilValue(userState);
  const loading = useRecoilValue(loadingState);

  const navigation = useNavigation<StackNavigationProp<FavoriteStoresStackParamList>>();

  const renderStore = ({ item }) => (
    <StoreListItem
      id={item.id}
      name={item.name}
      description={item.description}
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
        <StoresMap />
        <AddIcon action={AddIconActions.ADD_STORE} />
        {totalQty !== 0 && (
          <ListContainer>
            <FlatList
              data={favoriteStores}
              renderItem={renderStore}
              keyExtractor={(item) => item.id}
            />
          </ListContainer>
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
          headerLeft: null
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
