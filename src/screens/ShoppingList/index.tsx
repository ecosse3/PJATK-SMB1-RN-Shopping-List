import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';

const ShoppingListScreen: React.FC = () => {
  return (
    <View>
      <Text>Shooping List</Text>
    </View>
  );
};

const Stack = createStackNavigator();

const ShoppingList: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen name="Shopping List" component={ShoppingListScreen} />
  </Stack.Navigator>
);

export default ShoppingList;
