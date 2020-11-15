import React, { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Container, Text, Button, NameInput, WaveHand } from './index.styles';

const WelcomeScreen: React.FC = () => {
  const [userName, setUserName] = useState('');

  const navigation = useNavigation();

  const saveName = async () => {
    try {
      await AsyncStorage.setItem('@username', userName);
      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <WaveHand>👋</WaveHand>
      <Text>Witaj, podaj swoje imię!</Text>
      <NameInput
        theme={{
          colors: { primary: '#89b6a5', underlineColor: 'transparent' }
        }}
        mode="outlined"
        placeholder="Imię"
        onChangeText={(text) => setUserName(text)}
        value={userName}
      />
      <Button disabled={userName.length === 0} onPress={() => saveName()}>
        <Text button>Zapisz</Text>
      </Button>
    </Container>
  );
};

export default WelcomeScreen;