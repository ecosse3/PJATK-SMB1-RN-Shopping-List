import styled from 'styled-components/native';
import { TextInput } from 'react-native-paper';
import { ThemeType } from '../../utils/SCThemeProvider';

interface IButtonsProps {
  disabled: boolean;
  theme: ThemeType;
}

export const ChangeUsernameView = styled.View`
  padding: 16px;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  padding: 24px 16px 8px 16px;
`;

export const NameInput = styled(TextInput)`
  height: 40px;
  width: 100%;
  margin-bottom: 10px;
`;

export const Button = styled.TouchableOpacity<IButtonsProps>`
  background: ${(props) =>
    props.disabled ? 'gray' : props.theme.colors.primary};
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

export const TextButton = styled.Text<{
  size?: number;
  color?: string;
  button?: boolean;
}>`
  font-size: ${(props) => (props.size ? `${props.size}px` : '20px')};
  font-weight: 500;
  color: ${(props) =>
    props.color ? props.color : props.button ? 'white' : 'black'};
  padding: ${(props) => (props.button ? '0px' : '20px')};
`;
