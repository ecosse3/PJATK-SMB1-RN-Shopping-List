import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Container, Text, Button, NameInput, WaveHand } from './index.styles';
import { tabBarVisibleState, usernameState } from '../../store';
import { ThemeType } from '../../utils/types';

interface IProps {
  theme: ThemeType;
}

const WelcomeScreen: React.FC<IProps> = (props: IProps) => {
  const { theme } = props;
  const [username, setUsername] = useRecoilState(usernameState);
  const setTabBarVisible = useSetRecoilState(tabBarVisibleState);

  const navigation = useNavigation();

  const saveName = async () => {
    try {
      await AsyncStorage.setItem('@username', username);
      setTabBarVisible(true);
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

export default WelcomeScreen;
