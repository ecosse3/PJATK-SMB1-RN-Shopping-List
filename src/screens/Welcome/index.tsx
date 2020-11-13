import React, { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Container, Text, Button, NameInput } from './index.styles';

const WelcomeScreen: React.FC = () => {
  const [userName, setUserName] = useState('');

  const navigation = useNavigation();

  const saveName = async () => {
    try {
      await AsyncStorage.setItem('@username', userName);
      navigation.navigate('Shopping List');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Text>Witaj, podaj swoje imie!</Text>
      <NameInput onChangeText={(text) => setUserName(text)} value={userName} />
      <Button onPress={() => saveName()}>
        <Text button>Save</Text>
      </Button>
    </Container>
  );
};

export default WelcomeScreen;
