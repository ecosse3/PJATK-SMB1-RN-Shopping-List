import styled, { css } from 'styled-components/native';
import { rgba } from 'polished';
import { ThemeType } from '../../utils/types';

interface IProps {
  theme: ThemeType;
  noMarginRight?: boolean;
}

export const TouchableContainer = styled.TouchableOpacity<IProps>`
  flex-direction: row;
  width: 95%;
  height: 60px;
  background-color: ${(props) => rgba(props.theme.colors.primary, 0.2)};
  border-radius: 20px;
  padding: 10px;
  margin: 10px;
`;

export const InfoContainer = styled.View`
  margin-left: 10px;
  width: 70%;
`;

export const IconContainer = styled.TouchableOpacity<IProps>`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  background-color: ${(props) => rgba(props.theme.colors.secondary, 0.2)};
  justify-content: center;
  align-items: center;
  margin-right: 10px;

  ${(props) =>
    props.noMarginRight &&
    css`
      margin-right: 0;
    `}
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  width: 30%;
  padding-right: 15px;
`;

export const TopContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Name = styled.Text`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 2px;
`;

export const Description = styled.Text`
  color: #979797;
  font-size: 12px;
`;

export const RadiusText = styled.Text`
  margin-left: 2px;
  font-size: 8px;
  font-style: italic;
`;

export const Radius = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 5px;
`;
