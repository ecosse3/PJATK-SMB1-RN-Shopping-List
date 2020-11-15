import React from 'react';
import { Text, Container, HeaderWrapper } from './index.styles';

interface IProps {
  text: string;
}

const Header: React.FC<IProps> = (props: IProps) => {
  const { text } = props;

  return (
    <HeaderWrapper>
      <Container>
        <Text>{text}</Text>
      </Container>
    </HeaderWrapper>
  );
};

export default Header;
