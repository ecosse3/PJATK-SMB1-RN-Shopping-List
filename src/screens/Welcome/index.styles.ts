import styled from 'styled-components/native';

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

export const NameInput = styled.TextInput`
  height: 40px;
  width: 80%;
  border: 1px solid gray;
  border-radius: 5px;
  margin-bottom: 10px;
`;

export const Button = styled.TouchableOpacity`
  background: black;
  width: 80%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
`;
