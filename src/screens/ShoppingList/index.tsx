import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import WelcomeScreen from '../Welcome';

const ShoppingListScreen: React.FC = () => {
  const [loadedName, setLoadedName] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const getName = async () => {
      try {
        const result = await AsyncStorage.getItem('@username');

        if (result === null) {
          navigation.navigate('Welcome Screen');
        } else {
          setLoadedName(true);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getName();
  }, []);

  if (loadedName) {
    return (
      <View>
        <Text>Shopping List</Text>
      </View>
    );
  } else {
    return null;
  }
};

const Stack = createStackNavigator();

const ShoppingList: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen name="Lista zakupów" component={ShoppingListScreen} />
    <Stack.Screen
      name="Ekran powitalny"
      component={WelcomeScreen}
      options={{ header: () => null }}
    />
  </Stack.Navigator>
);

export default ShoppingList;
