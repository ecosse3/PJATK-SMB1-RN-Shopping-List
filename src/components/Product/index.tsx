import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  TouchableContainer,
  Name,
  Price,
  InfoContainer,
  Remove,
  ButtonsContainer,
  Quantity
} from './index.styles';
import { ThemeType } from '../../utils/SCThemeProvider';
import { ProductType } from '../../utils/types';
import { useRemoveProduct } from '../../store';

interface IProps {
  id: ProductType['id'];
  name: ProductType['name'];
  price: ProductType['price'];
  amount: ProductType['amount'];
  inBucket: ProductType['inBucket'];
  theme: ThemeType;
}

const Product: React.FC<IProps> = (props: IProps) => {
  const { id, name, price, amount, inBucket, theme } = props;

  const [productBought, setProductBought] = useState(false);
  const removeProduct = useRemoveProduct();

  return (
    <TouchableContainer key={id}>
      <>
        <InfoContainer>
          <Name>
            {name} <Quantity>x{amount.toString()}</Quantity>
          </Name>
          <Price>{price.toFixed(2).toString()} zł</Price>
        </InfoContainer>
        <ButtonsContainer>
          <Remove onPress={() => setProductBought((toggle) => !toggle)}>
            <Icon
              name="cart-arrow-down"
              size={20}
              color={productBought ? 'green' : theme.colors.secondary}
              style={{ marginRight: 2 }}
            />
          </Remove>
          <Remove noMarginRight onPress={() => removeProduct(id)}>
            <Icon name="trash" size={22} color={theme.colors.secondary} />
          </Remove>
        </ButtonsContainer>
      </>
    </TouchableContainer>
  );
};

export default Product;
