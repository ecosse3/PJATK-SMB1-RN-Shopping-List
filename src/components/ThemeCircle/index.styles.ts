import styled, { css } from 'styled-components/native';

export const Circle = styled.View<{ color: string; noMarginLeft?: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background-color: ${(props) => props.color};
  margin-left: 10px;
  padding-right: 10px;

  ${(props) =>
    props.noMarginLeft &&
    css`
      margin-left: 0;
    `}
`;
