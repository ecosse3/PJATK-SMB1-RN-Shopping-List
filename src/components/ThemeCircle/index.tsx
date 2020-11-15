import React from 'react';
import { Circle } from './index.styles';

interface IProps {
  color: string;
  noMarginLeft?: boolean;
}

const ThemeCircle: React.FC<IProps> = (props: IProps) => {
  const { color, noMarginLeft } = props;

  return <Circle color={color} noMarginLeft={noMarginLeft} />;
};

export default ThemeCircle;
