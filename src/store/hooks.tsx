import { useRecoilState } from 'recoil';
import { productListState } from './atoms';
import { ProductType } from '../utils/types';

// Utility functions

const cloneIndex = (items: ProductType[], id: string) => ({
  clone: items.map((product: ProductType) => ({ ...product })),
  index: items.findIndex((product: ProductType) => product.id === id)
});

// Hooks

export const useAddProduct = () => {
  const [products, setProducts] = useRecoilState(productListState);

  return (product: ProductType) => {
    const { clone, index } = cloneIndex(products, product.id);

    if (index !== -1) {
      clone[index].amount += 1;
      setProducts(clone);
    } else {
      setProducts([...clone, { ...product, inBucket: true }]);
    }
  };
};

export const useRemoveProduct = () => {
  const [products, setProducts] = useRecoilState(productListState);

  return (productId: string) => {
    setProducts(products.filter((item) => item.id !== productId));
  };
};
