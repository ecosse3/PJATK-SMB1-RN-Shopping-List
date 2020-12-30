import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useSetRecoilState } from 'recoil';
import { ProductType, ThemeType } from 'types';
import {
  productInEditModeState,
  useRemoveProduct,
  useToggleProductInBasket
} from 'store';
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

interface IProps {
  id: ProductType['id'];
  name: ProductType['name'];
  price: ProductType['price'];
  amount: ProductType['amount'];
  inBasket: ProductType['inBasket'];
  updatedAt: ProductType['updatedAt'];
  createdAt: ProductType['createdAt'];
  theme: ThemeType;
}

const ProductListItem: React.FC<IProps> = (props: IProps) => {
  const { id, name, price, amount, inBasket, updatedAt, createdAt, theme } = props;

  const [productBought, setProductBought] = useState<boolean | undefined>(inBasket);

  const navigation = useNavigation();
  const removeProduct = useRemoveProduct();
  const toggleProductBasketStatus = useToggleProductInBasket();
  const setProductInEditMode = useSetRecoilState(productInEditModeState);

  const toggleProductInBasket = () => {
    setProductBought((toggle) => !toggle);
    toggleProductBasketStatus(id);
  };

  return (
    <TouchableContainer
      key={id}
      onPress={() => {
        navigation.navigate('AddEditProductScreen', {
          id,
          name,
          price,
          amount,
          updatedAt,
          createdAt
        });
        setProductInEditMode(true);
      }}>
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
              color={
                productBought && theme.colors.basket
                  ? theme.colors.basket
                  : productBought && !theme.colors.basket
                  ? 'green'
                  : theme.colors.secondary
              }
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

export default ProductListItem;
