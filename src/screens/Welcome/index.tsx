import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { Container, Text, Button, NameInput, WaveHand } from './index.styles';
import { usernameState } from '../../store';
import { ThemeType, WelcomeStackParamList } from '../../utils/types';
import LoginScreen from '../Login';

interface IProps {
  theme: ThemeType;
}

const WelcomeScreen: React.FC<IProps> = (props: IProps) => {
  const { theme } = props;
  const [username, setUsername] = useRecoilState(usernameState);

  const navigation = useNavigation<StackNavigationProp<WelcomeStackParamList>>();

  const saveName = async () => {
    try {
      await AsyncStorage.setItem('@username', username);
      navigation.navigate('LoginScreen');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        // Prevent default behavior of leaving the screen
        e.preventDefault();
      }),
    [navigation]
  );

  return (
    <Container>
      <WaveHand>👋</WaveHand>
      <Text>Witaj, podaj swoje imię!</Text>
      <NameInput
        theme={{
          colors: {
            primary: theme.colors.primary,
            underlineColor: 'transparent'
          }
        }}
        mode="outlined"
        placeholder="Imię"
        maxLength={15}
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <Button disabled={username.length === 0} onPress={() => saveName()}>
        <Text button>Zapisz</Text>
      </Button>
    </Container>
  );
};

const Stack = createStackNavigator<WelcomeStackParamList>();

const Welcome: React.FC<IProps> = ({ theme }: IProps) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WelcomeScreen"
        children={() => <WelcomeScreen theme={theme} />}
        options={{
          header: () => null,
          gestureEnabled: false
        }}
      />
      <Stack.Screen
        name="LoginScreen"
        children={() => <LoginScreen theme={theme} />}
        options={{
          header: () => null,
          gestureEnabled: false
        }}
      />
    </Stack.Navigator>
  );
};

export default Welcome;
