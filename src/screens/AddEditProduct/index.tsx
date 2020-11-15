import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput } from 'react-native';
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
import { tabBarVisibleState } from '../../store';
import { ThemeType } from '../../utils/SCThemeProvider';
import Header from '../../components/Header';

interface IProps {
  theme: ThemeType;
}

const AddEditProductScreen: React.FC<IProps> = (props: IProps) => {
  const { theme } = props;

  const setTabBarVisible = useSetRecoilState(tabBarVisibleState);

  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productPriceError, setProductPriceError] = useState(false);
  const [productAmount, setProductAmount] = useState(1);

  const addProduct = () => {};

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
            onChangeText={(text) => setProductPrice(text)}
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
            onPress={() => addProduct()}>
            <Text button>Zapisz</Text>
          </Button>
        </ButtonsContainer>
      </Container>
    </>
  );
};

export default AddEditProductScreen;
