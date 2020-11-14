import styled from 'styled-components/native';
import { TextInput } from 'react-native-paper';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const Text = styled.Text<{
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

export const NameInput = styled(TextInput)`
  height: 40px;
  width: 80%;
  margin-bottom: 10px;
`;

export const Button = styled.TouchableOpacity<{ disabled: boolean }>`
  background: ${(props) => (props.disabled ? 'gray' : 'black')};
  width: 80%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

export const WaveHand = styled.Text`
  font-size: 48px;
`;
