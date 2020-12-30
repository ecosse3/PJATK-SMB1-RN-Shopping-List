import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ThemeType } from 'types';
import { productInEditModeState, tabBarVisibleState, useAddEditProduct } from 'store';
import Header from 'components/Header';
import { format, parseISO } from 'date-fns';
import { Fieldset } from 'components/Fieldset';
import { Bold } from 'screens/AddEditFavoriteStore/index.styles';
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

interface IProps {
  theme: ThemeType;
}

type RoutePropsType = {
  params?: {
    id?: string;
    name?: string;
    price?: number;
    amount?: number;
    updatedAt?: string;
    createdAt?: string;
  };
};

const AddEditProductScreen: React.FC<IProps> = (props: IProps) => {
  const { theme } = props;

  const setTabBarVisible = useSetRecoilState(tabBarVisibleState);
  const productInEditMode = useRecoilValue(productInEditModeState);

  const addEditProduct = useAddEditProduct();
  const navigation = useNavigation();
  const route: RoutePropsType = useRoute();

  const propsProductId = route?.params?.id;
  const propsProductName = route?.params?.name;
  const propsProductPrice = route?.params?.price;
  const propsProductAmount = route?.params?.amount;
  const propsProductUpdatedAt = route?.params?.updatedAt;
  const propsProductCreatedAt = route?.params?.createdAt;

  const [productName, setProductName] = useState(propsProductName || '');
  const [productPrice, setProductPrice] = useState(propsProductPrice?.toString() || '');
  const [productPriceError, setProductPriceError] = useState(false);
  const [productAmount, setProductAmount] = useState(propsProductAmount || 1);

  const checkAddProduct = (id: string, name: string, price: string, amount: number) => {
    const priceRegex = /^\d+(\.\d{1,2})?$/;

    if (!priceRegex.test(price)) {
      setProductPriceError(true);
      return 0;
    }

    addEditProduct({ id, name, price: Number(price), amount: Number(amount) });

    navigation.navigate('ShoppingListScreen');
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setTabBarVisible(true);
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    setTabBarVisible(false);
  }, []);

  return (
    <>
      <Header text={productInEditMode ? productName : 'Dodaj produkt'} />
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
            label="Nazwa"
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
            label="Cena"
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
              onPress={() => setProductAmount((amount) => (amount > 1 ? amount - 1 : 1))}
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
          {productInEditMode && propsProductCreatedAt && (
            <Fieldset title="Informacje">
              <Text size={14} noPadding>
                <Bold>Utworzono: </Bold>
                {format(parseISO(propsProductCreatedAt), "dd/MM/yyyy 'o godz.' HH:mm")}
              </Text>
              {propsProductUpdatedAt && (
                <Text size={14} noPadding>
                  <Bold>Ostatnia modyfikacja: </Bold>
                  {format(parseISO(propsProductUpdatedAt), "dd/MM/yyyy 'o godz.' HH:mm")}
                </Text>
              )}
            </Fieldset>
          )}
          <Button
            disabled={
              productName.length === 0 ||
              productPrice.length === 0 ||
              (productName === propsProductName &&
                productPrice === propsProductPrice?.toString() &&
                productAmount === propsProductAmount)
            }
            onPress={() =>
              checkAddProduct(
                propsProductId || uuidv4(),
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
