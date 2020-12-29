import React, { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useSetRecoilState } from 'recoil';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import { RegisterStackParamList, ThemeType } from 'types';
import { usernameState, userState } from 'store';
import { Container, Text, Button, NameInput, WaveHand } from './index.styles';

interface IProps {
  theme: ThemeType;
}

const RegisterScreen: React.FC<IProps> = (props: IProps) => {
  const { theme } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const setUsername = useSetRecoilState(usernameState);
  const setLoadedName = useSetRecoilState(usernameState);
  const setUser = useSetRecoilState(userState);

  const navigation = useNavigation<StackNavigationProp<RegisterStackParamList>>();

  const saveName = async () => {
    try {
      setUsername(name);
      await AsyncStorage.setItem('@username', name);
    } catch (err) {
      console.log(err);
    }
  };

  const register = async () => {
    try {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          if (userCredentials.user) {
            console.log(userCredentials.user);
            const { uid } = userCredentials.user;
            firestore().collection('users').doc(uid).set({
              name,
              email: userCredentials.user.email,
              theme: 0
            });

            userCredentials.user
              .updateProfile({
                displayName: name
              })
              .then(() => {
                console.log('Account created & user signed in!');
                setUser(userCredentials.user);
                setLoadedName(name);
                saveName();

                navigation.popToTop();
                // navigation.navigate('ShoppingListScreen');
              });
          }
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

            case 'auth/weak-password':
              console.log('Wprowadzone hasło jest za krótkie');
              Snackbar.show({
                text: 'Wprowadzone hasło jest za krótkie',
                duration: Snackbar.LENGTH_SHORT,
                numberOfLines: 2,
                backgroundColor: '#cb3b3b'
              });
              break;

            case 'auth/email-already-in-use':
              console.log('Ten adres email jest już zarejestrowany');
              Snackbar.show({
                text: 'Ten adres email jest już zarejestrowany',
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
        placeholder="Imię"
        maxLength={15}
        onChangeText={(text) => setName(text)}
        value={name}
      />
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
      <Button
        disabled={email.length === 0 || password.length === 0 || name.length < 2}
        onPress={() => register()}>
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
