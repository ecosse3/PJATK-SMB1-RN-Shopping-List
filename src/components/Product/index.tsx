import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View } from 'react-native';
import {
  TouchableContainer,
  Name,
  Price,
  InfoContainer,
  IconContainer,
  ButtonsContainer,
  Quantity,
  TopContainer
} from './index.styles';
import { ThemeType } from '../../utils/SCThemeProvider';
import { ProductType } from '../../utils/types';
import { useRemoveProduct, useToggleProductInBasket } from '../../store';

interface IProps {
  id: ProductType['id'];
  name: ProductType['name'];
  price: ProductType['price'];
  amount: ProductType['amount'];
  inBasket: ProductType['inBasket'];
  theme: ThemeType;
}

const Product: React.FC<IProps> = (props: IProps) => {
  const { id, name, price, amount, inBasket, theme } = props;

  const [productBought, setProductBought] = useState(inBasket);
  const removeProduct = useRemoveProduct();
  const toggleProductBasketStatus = useToggleProductInBasket();

  const toggleProductInBasket = () => {
    setProductBought((toggle) => !toggle);
    toggleProductBasketStatus(id);
  };

  return (
    <TouchableContainer key={id}>
      <>
        <InfoContainer>
          <TopContainer>
            <Name inBasket={productBought}>{name}</Name>
            <Quantity>x{amount.toString()}</Quantity>
          </TopContainer>
          <Price>{price.toFixed(2).toString()} zł</Price>
        </InfoContainer>
        <ButtonsContainer>
          <IconContainer onPress={() => toggleProductInBasket()}>
            <Icon
              name="cart-arrow-down"
              size={20}
              color={productBought ? 'green' : theme.colors.secondary}
              style={{ marginRight: 2 }}
            />
          </IconContainer>
          <IconContainer noMarginRight onPress={() => removeProduct(id)}>
            <Icon name="trash" size={22} color={theme.colors.secondary} />
          </IconContainer>
        </ButtonsContainer>
      </>
    </TouchableContainer>
  );
};

export default Product;
