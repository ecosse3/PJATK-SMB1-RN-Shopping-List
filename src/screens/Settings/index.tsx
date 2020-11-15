import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView, View } from 'react-native';
import { useRecoilState } from 'recoil';
import { ListItem, Radio, Right, Left } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../../components/Header';
import { SettingsStackParamList } from '../../utils/types';
import { themeState, usernameState } from '../../store';
import { ThemeType } from '../../utils/SCThemeProvider';

import {
  AuthorView,
  Button,
  ChangeUsernameView,
  NameInput,
  TextButton,
  Title
} from './index.styles';
import ThemeCircle from '../../components/ThemeCircle';

interface IProps {
  theme: ThemeType;
}

const SettingsScreen: React.FC<IProps> = (props: IProps) => {
  const { theme } = props;
  const [currentTheme, setCurrentTheme] = useRecoilState(themeState);
  const [username, setUsername] = useRecoilState(usernameState);
  const [usernameCopy, setUsernameCopy] = useState(username);

  const saveName = async () => {
    try {
      await AsyncStorage.setItem('@username', usernameCopy);
      setUsername(usernameCopy);
    } catch (err) {
      console.log(err);
    }
  };

  const changeTheme = async (id: number) => {
    try {
      await AsyncStorage.setItem('@theme', `${id}`);
      setCurrentTheme(id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView>
      <Header text="Ustawienia" />
      <Title>Wybierz motyw aplikacji:</Title>
      <View>
        <ListItem>
          <Left>
            <ThemeCircle color="#89b6a5" noMarginLeft />
            <ThemeCircle color="#474350" />
            <ThemeCircle color="#FF0000" />
          </Left>
          <Right>
            <Radio
              color={theme.colors.primary}
              selectedColor={theme.colors.primary}
              selected={currentTheme === 0}
              onPress={() => changeTheme(0)}
            />
          </Right>
        </ListItem>
        <ListItem>
          <Left>
            <ThemeCircle color="#F87060" noMarginLeft />
            <ThemeCircle color="#102542" />
            <ThemeCircle color="#CDD7D6" />
          </Left>
          <Right>
            <Radio
              color={theme.colors.primary}
              selectedColor={theme.colors.primary}
              selected={currentTheme === 1}
              onPress={() => changeTheme(1)}
            />
          </Right>
        </ListItem>
      </View>
      <Title>Zmień imię:</Title>
      <ChangeUsernameView>
        <NameInput
          theme={{
            colors: {
              primary: theme.colors.primary,
              underlineColor: 'transparent'
            }
          }}
          mode="outlined"
          placeholder="Imię"
          onChangeText={(text) => setUsernameCopy(text)}
          value={usernameCopy}
        />
        <Button
          disabled={usernameCopy.length === 0 || usernameCopy === username}
          onPress={() => saveName()}>
          <TextButton button>Zapisz</TextButton>
        </Button>
      </ChangeUsernameView>
      <AuthorView>
        <Title>Autor aplikacji:</Title>
        <TextButton size={16} padding="10px 16px">
          Łukasz Kurpiewski
        </TextButton>
        <TextButton size={16} padding="0px 16px">
          s22004
        </TextButton>
      </AuthorView>
    </ScrollView>
  );
};

const Stack = createStackNavigator<SettingsStackParamList>();

const Settings: React.FC<IProps> = ({ theme }: IProps) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingsScreen"
        children={() => <SettingsScreen theme={theme} />}
        options={{
          title: 'Ustawienia',
          headerTitleStyle: { color: '#FFFFFF' },
          headerStyle: { backgroundColor: theme.colors.secondary }
        }}
      />
    </Stack.Navigator>
  );
};

export default Settings;
