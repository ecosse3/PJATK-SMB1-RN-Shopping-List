import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { ThemeType } from '../../utils/types';

interface IProps {
  theme: ThemeType;
}

export const HeaderWrapper = styled.View<IProps>`
  width: 100%;
  background-color: ${(props) => props.theme.colors.primary};
  border-bottom-left-radius: 25px;
  overflow: hidden;
`;

export const ArrowContainer = styled.View`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: ${Dimensions.get('window').width / 2 - 15};
  bottom: 5px;
  border-radius: 15px;
  width: 30px;
  height: 30px;
  background-color: #cccccc;
  z-index: 1;
`;
