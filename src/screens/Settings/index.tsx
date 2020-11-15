import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import Header from '../../components/Header';

const SettingsScreen: React.FC = () => {
  return (
    <View>
      <Header text="Ustawienia" />
    </View>
  );
};

const Stack = createStackNavigator();

const Settings: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="SettingsScreen"
      component={SettingsScreen}
      options={{
        title: 'Ustawienia',
        headerTitleStyle: { color: '#FFFFFF' },
        headerStyle: { backgroundColor: '#474350' }
      }}
    />
  </Stack.Navigator>
);

export default Settings;
