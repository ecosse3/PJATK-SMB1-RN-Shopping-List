import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { useNavigation } from '@react-navigation/native';
import {
  Text,
  Button,
  Input,
  Container,
  ButtonsContainer,
  InputsContainer,
  AmountContainer,
  AmountValue
} from './index.styles';
import { tabBarVisibleState, useAddProduct } from '../../store';
import { ThemeType } from '../../utils/SCThemeProvider';
import Header from '../../components/Header';

interface IProps {
  theme: ThemeType;
}

const AddEditProductScreen: React.FC<IProps> = (props: IProps) => {
  const { theme } = props;

  const setTabBarVisible = useSetRecoilState(tabBarVisibleState);

  const addProduct = useAddProduct();
  const navigation = useNavigation();

  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productPriceError, setProductPriceError] = useState(false);
  const [productAmount, setProductAmount] = useState(1);

  const checkAddProduct = (
    id: string,
    name: string,
    price: string,
    amount: number
  ) => {
    const priceRegex = /^\d+(\.\d{1,2})?$/;

    if (!priceRegex.test(price)) {
      setProductPriceError(true);
      return 0;
    }

    addProduct({ id, name, price: Number(price), amount: Number(amount) });

    setTabBarVisible(true);
    navigation.goBack();
  };

  useEffect(() => {
    setTabBarVisible(false);
  }, []);

  return (
    <>
      <Header text="Dodaj produkt" />
      <Container>
        <InputsContainer>
          <Input
            theme={{
              colors: {
                primary: theme.colors.primary,
                underlineColor: 'transparent'
              }
            }}
            mode="outlined"
            placeholder="Nazwa"
            maxLength={20}
            onChangeText={(text) => setProductName(text)}
            value={productName}
          />
          <Input
            theme={{
              colors: {
                primary: theme.colors.primary,
                underlineColor: 'transparent'
              }
            }}
            mode="outlined"
            keyboardType="numeric"
            placeholder="Cena"
            maxLength={9}
            onChangeText={(text) => {
              setProductPrice(text);
              setProductPriceError(false);
            }}
            value={productPrice}
            error={productPriceError}
          />
          <AmountContainer>
            <Text size={16} noPadding>
              Ilość:
            </Text>
            <Icon
              name="minus-circle"
              size={25}
              color={theme.colors.primary}
              style={{ marginLeft: 10 }}
              onPress={() =>
                setProductAmount((amount) => (amount > 1 ? amount - 1 : 1))
              }
            />
            <AmountValue>{productAmount}</AmountValue>
            <Icon
              name="plus-circle"
              size={25}
              color={theme.colors.primary}
              onPress={() => setProductAmount((amount) => amount + 1)}
            />
          </AmountContainer>
        </InputsContainer>
        <ButtonsContainer>
          <Button
            disabled={productName.length === 0 || productPrice.length === 0}
            onPress={() =>
              checkAddProduct(
                uuidv4(),
                productName,
                productPrice,
                productAmount
              )
            }>
            <Text button>Zapisz</Text>
          </Button>
        </ButtonsContainer>
      </Container>
    </>
  );
};

export default AddEditProductScreen;
