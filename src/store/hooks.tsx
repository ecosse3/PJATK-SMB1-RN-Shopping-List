import { useRecoilState, useRecoilValue } from 'recoil';
import AsyncStorage from '@react-native-community/async-storage';
import { productListState } from './atoms';
import { ProductType } from '../utils/types';

// Utility functions

const cloneIndex = (items: ProductType[], id: string) => ({
  clone: items.map((product: ProductType) => ({ ...product })),
  index: items.findIndex((product: ProductType) => product.id === id)
});

const saveProducts = async (products: ProductType[]) => {
  console.log('saveProducts: ', products);
  try {
    await AsyncStorage.setItem('@products', JSON.stringify(products));
  } catch (err) {
    console.log(err);
  }
};

// Hooks

export const useAddProduct = () => {
  const [products, setProducts] = useRecoilState(productListState);

  return (product: ProductType) => {
    const { clone, index } = cloneIndex(products, product.id);

    if (index !== -1) {
      clone[index].amount += 1;
      setProducts(clone);
      saveProducts(clone);
    } else {
      setProducts([...clone, { ...product, inBucket: false }]);
      saveProducts([...clone, { ...product, inBucket: false }]);
    }
  };
};

export const useRemoveProduct = () => {
  const [products, setProducts] = useRecoilState(productListState);

  return (productId: string) => {
    setProducts(products.filter((item) => item.id !== productId));
    saveProducts(products.filter((item) => item.id !== productId));
  };
};
