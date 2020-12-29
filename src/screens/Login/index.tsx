import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSetRecoilState } from 'recoil';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { LoginStackParamList, ThemeType } from 'types';
import { usernameState, userState } from 'store';
import { Container, Text, Button, NameInput, WaveHand } from './index.styles';
import RegisterScreen from '../Register';
import ShoppingListScreen from '../ShoppingList';

interface IProps {
  theme: ThemeType;
}

const LoginScreen: React.FC<IProps> = (props: IProps) => {
  const { theme } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setLoadedName = useSetRecoilState(usernameState);
  const setUser = useSetRecoilState(userState);

  const navigation = useNavigation<StackNavigationProp<LoginStackParamList>>();

  const login = async () => {
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        console.log('User signed in!');

        if (userCredentials.user) {
          setUser(userCredentials.user);
          setLoadedName(userCredentials.user.displayName!);
        }

        navigation.popToTop();
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
            console.log('Adres email jest niepoprawny!');
            Snackbar.show({
              text: 'Adres email jest niepoprawny!',
              duration: Snackbar.LENGTH_SHORT,
              numberOfLines: 2,
              backgroundColor: '#cb3b3b'
            });
            break;

          case 'auth/user-not-found':
            console.log('Taki użytkownik nie istnieje! Zarejestruj się!');
            Snackbar.show({
              text: 'Taki użytkownik nie istnieje! Zarejestruj się!',
              duration: Snackbar.LENGTH_SHORT,
              numberOfLines: 2,
              backgroundColor: '#cb3b3b'
            });
            break;

          case 'auth/wrong-password':
            console.log('Błędne hasło!');
            Snackbar.show({
              text: 'Błędne hasło!',
              duration: Snackbar.LENGTH_SHORT,
              numberOfLines: 2,
              backgroundColor: '#cb3b3b'
            });
            break;

          default:
            console.log(error);
            break;
        }
      });
  };

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      // Prevent default behavior of leaving the screen
      e.preventDefault();
    });
  }, [navigation]);

  return (
    <Container>
      <WaveHand>👋</WaveHand>
      <Text>Zaloguj się</Text>
      <NameInput
        theme={{
          colors: {
            primary: theme.colors.primary,
            underlineColor: 'transparent'
          }
        }}
        mode="outlined"
        label="Email"
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
        label="Hasło"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <Button
        disabled={email.length === 0 || password.length === 0}
        onPress={() => login()}>
        <Text button>Zaloguj</Text>
      </Button>
      <Button
        backgroundColor="#cb3b3b"
        onPress={() => navigation.navigate('RegisterScreen')}>
        <Text button>Zarejestruj się</Text>
      </Button>
    </Container>
  );
};

const Stack = createStackNavigator<LoginStackParamList>();

const Login: React.FC<IProps> = ({ theme }: IProps) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginScreen"
        children={() => <LoginScreen theme={theme} />}
        options={{
          header: () => null,
          gestureEnabled: false
        }}
      />
      <Stack.Screen
        name="RegisterScreen"
        children={() => <RegisterScreen theme={theme} />}
        options={({ navigation }) => ({
          title: 'Rejestracja',
          headerTitleStyle: { color: '#FFFFFF' },
          headerStyle: { backgroundColor: theme.colors.secondary },
          gestureEnabled: false,
          headerLeft: () => (
            <Icon2
              name="arrow-left"
              size={25}
              color="#FFFFFF"
              style={{ marginLeft: 15 }}
              onPress={() => {
                navigation.goBack();
              }}
            />
          )
        })}
      />
      <Stack.Screen
        name="ShoppingListScreen"
        children={() => <ShoppingListScreen theme={theme} />}
        options={{
          header: () => null,
          headerLeft: undefined
        }}
      />
    </Stack.Navigator>
  );
};

export default Login;
