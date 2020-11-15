import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import { useRecoilState } from 'recoil';
import { ListItem, Text, Radio, Right, Left } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../../components/Header';
import { SettingsStackParamList } from '../../utils/types';
import { themeState, usernameState } from '../../store';
import { ThemeType } from '../../utils/SCThemeProvider';
import {
  Button,
  ChangeUsernameView,
  NameInput,
  TextButton,
  Title
} from './index.styles';

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

  return (
    <View>
      <Header text="Ustawienia" />
      <Title>Wybierz motyw aplikacji:</Title>
      <View>
        <ListItem>
          <Left>
            <Text>Light Green</Text>
          </Left>
          <Right>
            <Radio
              color={theme.colors.primary}
              selectedColor={theme.colors.primary}
              selected={currentTheme === 0}
              onPress={() => setCurrentTheme(0)}
            />
          </Right>
        </ListItem>
        <ListItem>
          <Left>
            <Text>Purple</Text>
          </Left>
          <Right>
            <Radio
              color={theme.colors.primary}
              selectedColor={theme.colors.primary}
              selected={currentTheme === 1}
              onPress={() => setCurrentTheme(1)}
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
    </View>
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
