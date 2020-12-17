import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSetRecoilState } from 'recoil';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import { Container, Text, Button, NameInput, WaveHand } from './index.styles';
import { tabBarVisibleState } from '../../store';
import { RegisterStackParamList, ThemeType } from '../../utils/types';

interface IProps {
  theme: ThemeType;
}

const RegisterScreen: React.FC<IProps> = (props: IProps) => {
  const { theme } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setTabBarVisible = useSetRecoilState(tabBarVisibleState);

  const navigation = useNavigation<StackNavigationProp<RegisterStackParamList>>();

  const register = async () => {
    try {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('Account created & user signed in!');
          setTabBarVisible(true);
          navigation.popToTop();
          navigation.navigate('ShoppingListScreen');
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              console.error('Adres email jest niepoprawny!');
              break;

            case 'auth/weak-password':
              console.error('Wprowadzone hasło jest za krótkie');
              break;

            case 'auth/email-already-in-use':
              console.error('Ten adres email jest już zarejestrowany');
              break;

            default:
              console.error(error);
              break;
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <WaveHand>👋</WaveHand>
      <Text>Zarejestruj się</Text>
      <NameInput
        theme={{
          colors: {
            primary: theme.colors.primary,
            underlineColor: 'transparent'
          }
        }}
        mode="outlined"
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <NameInput
        theme={{
          colors: {
            primary: theme.colors.primary,
            underlineColor: 'transparent'
          }
        }}
        mode="outlined"
        placeholder="Hasło"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <Button disabled={email.length === 0 || password.length === 0} onPress={() => register()}>
        <Text button>Zarejestruj</Text>
      </Button>
    </Container>
  );
};

const Stack = createStackNavigator<RegisterStackParamList>();

const Register: React.FC<IProps> = ({ theme }: IProps) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RegisterScreen"
        children={() => <RegisterScreen theme={theme} />}
        options={{
          header: () => null
        }}
      />
    </Stack.Navigator>
  );
};

export default Register;
