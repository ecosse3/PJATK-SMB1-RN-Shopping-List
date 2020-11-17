import styled from 'styled-components/native';
import { ThemeType } from '../../utils/types';

interface IProps {
  theme: ThemeType;
}

export const Container = styled.TouchableHighlight<IProps>`
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50px;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.secondary};
`;
