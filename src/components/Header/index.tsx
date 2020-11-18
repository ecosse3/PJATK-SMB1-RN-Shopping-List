import React from 'react';
import { Text, Container, HeaderWrapper, HeaderImage } from './index.styles';

interface IProps {
  text: string;
}

const Header: React.FC<IProps> = (props: IProps) => {
  const { text } = props;
  const image = require('../../assets/crissxcross.png');

  return (
    <HeaderWrapper>
      <HeaderImage source={image} />
      <Container>
        <Text>{text}</Text>
      </Container>
    </HeaderWrapper>
  );
};

export default Header;
