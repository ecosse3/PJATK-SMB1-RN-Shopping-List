import { selector } from 'recoil';
import { favoriteStoresState, productListState } from './atoms';

export const productListSelector = selector({
  key: 'productListSelector',
  get: ({ get }) => {
    const totalCost = get(productListState).reduce((a, b) => a + b.price * b.amount, 0);
    const totalQty = get(productListState).reduce((a, b) => a + b.amount, 0);

    return {
      totalCost,
      totalQty
    };
  }
});

export const favoriteStoresSelector = selector({
  key: 'favoriteStoresSelector',
  get: ({ get }) => {
    const totalQty = get(favoriteStoresState).length;

    return {
      totalQty
    };
  }
});
