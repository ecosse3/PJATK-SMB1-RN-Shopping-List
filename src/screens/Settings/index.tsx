import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView, View } from 'react-native';
import { useRecoilState } from 'recoil';
import { ListItem, Radio, Right, Left } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import Header from '../../components/Header';
import { SettingsStackParamList, ThemeType } from '../../utils/types';
import { themeState, usernameState } from '../../store';

import { AuthorView, Button, MiddleView, NameInput, TextButton, Title } from './index.styles';
import ThemeCircle from '../../components/ThemeCircle';
import { themes } from '../../utils/theme';

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
      await auth().currentUser.updateProfile({ displayName: usernameCopy });
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

  useEffect(() => {
    setUsernameCopy(username);
  }, [username]);

  return (
    <ScrollView>
      <Header text="Ustawienia" />
      <Title>Wybierz motyw aplikacji:</Title>
      <View>
        {themes.map((singleTheme) => {
          return (
            <ListItem key={themes.indexOf(singleTheme)}>
              <Left>
                <ThemeCircle color={singleTheme.colors.primary} noMarginLeft />
                <ThemeCircle color={singleTheme.colors.secondary} />
                <ThemeCircle color={singleTheme.colors.badge} />
              </Left>
              <Right>
                <Radio
                  color={theme.colors.primary}
                  selectedColor={theme.colors.primary}
                  selected={currentTheme === themes.indexOf(singleTheme)}
                  onPress={() => changeTheme(themes.indexOf(singleTheme))}
                />
              </Right>
            </ListItem>
          );
        })}
      </View>
      <Title>Zmień imię:</Title>
      <MiddleView>
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
          onChangeText={(text) => setUsernameCopy(text)}
          value={usernameCopy}
        />
        <Button disabled={usernameCopy.length === 0 || usernameCopy === username} onPress={() => saveName()}>
          <TextButton button>Zapisz</TextButton>
        </Button>
      </MiddleView>
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
