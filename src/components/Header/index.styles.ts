import styled from 'styled-components/native';
import { ThemeType } from '../../utils/SCThemeProvider';

interface IProps {
  theme: ThemeType;
}

export const HeaderWrapper = styled.View<IProps>`
  width: 100%;
  height: 180px;
  background-color: ${(props) => props.theme.colors.primary};
  border-bottom-left-radius: 25px;
`;

export const Container = styled.View`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  padding-left: 20px;
`;

export const Text = styled.Text`
  color: #ffffff;
  font-size: 36px;
  width: 50%;
  text-shadow: 3px 5px #000000;
`;
