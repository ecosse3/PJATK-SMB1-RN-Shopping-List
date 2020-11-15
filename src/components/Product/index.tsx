import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  TouchableContainer,
  Name,
  Price,
  InfoContainer,
  Remove,
  ButtonsContainer,
  Quantity,
  NameContainer
} from './index.styles';
import { ThemeType } from '../../utils/SCThemeProvider';

interface IProps {
  id: number;
  name: string;
  price: number;
  amount: number;
  theme: ThemeType;
}

const Product: React.FC<IProps> = (props: IProps) => {
  const { id, name, price, amount, theme } = props;

  return (
    <TouchableContainer key={id}>
      <>
        <InfoContainer>
          <Name>
            {name} <Quantity>x{amount.toString()}</Quantity>
          </Name>
          <Price>{price.toFixed(2)} zł</Price>
        </InfoContainer>
        <ButtonsContainer>
          <Remove onPress={() => alert('remove')}>
            <Icon name="trash" size={22} color={theme.colors.secondary} />
          </Remove>
        </ButtonsContainer>
      </>
    </TouchableContainer>
  );
};

export default Product;
