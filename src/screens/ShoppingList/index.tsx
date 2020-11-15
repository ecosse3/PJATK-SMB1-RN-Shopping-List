import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import WelcomeScreen from '../Welcome';
import Header from '../../components/Header';
import { ShoppingListStackParamList } from '../../utils/types';

const ShoppingListScreen: React.FC = () => {
  const [loadedName, setLoadedName] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const getName = async () => {
      try {
        const result = await AsyncStorage.getItem('@username');

        if (result === null) {
          navigation.navigate('WelcomeScreen');
        } else {
          setLoadedName(result);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getName();
  }, [navigation]);

  if (loadedName) {
    return (
      <View>
        <Header text={`Witaj, ${loadedName}`} />
      </View>
    );
  } else {
    return null;
  }
};

const Stack = createStackNavigator<ShoppingListStackParamList>();

const ShoppingList: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ShoppingListScreen"
      component={ShoppingListScreen}
      options={{
        title: 'Lista zakupów',
        headerTitleStyle: { color: '#FFFFFF' },
        headerStyle: { backgroundColor: '#474350' }
      }}
    />
    <Stack.Screen
      name="WelcomeScreen"
      component={WelcomeScreen}
      options={{
        header: () => null
      }}
    />
  </Stack.Navigator>
);

export default ShoppingList;
