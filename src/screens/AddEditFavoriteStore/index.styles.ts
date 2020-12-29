import styled from 'styled-components/native';
import { TextInput } from 'react-native-paper';
import { rgba } from 'polished';
import { ThemeType } from '../../utils/types';

interface IProps {
  theme: ThemeType;
  disabled: boolean;
}

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  justify-content: space-between;
`;

export const InputsContainer = styled.View`
  justify-content: flex-start;
`;

export const ButtonsContainer = styled.View`
  justify-content: flex-end;
`;

export const Text = styled.Text<{
  size?: number;
  color?: string;
  button?: boolean;
  noPadding?: boolean;
}>`
  font-size: ${(props) => (props.size ? `${props.size}px` : '20px')};
  font-weight: 500;
  color: ${(props) => (props.color ? props.color : props.button ? 'white' : 'black')};
  padding: ${(props) => (props.button || props.noPadding ? '0px' : '20px')};
`;

export const AmountValue = styled.Text`
  margin: 3px 10px 0 10px;
`;

export const Input = styled(TextInput)`
  height: 40px;
  width: 100%;
  margin-bottom: 10px;
`;

export const Button = styled.TouchableOpacity<IProps>`
  background: ${(props) =>
    props.disabled ? rgba(props.theme.colors.primary, 0.5) : props.theme.colors.primary};
  width: 100%;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

export const Error = styled.Text`
  font-size: 8px;
  color: #cb3b3b;
`;
