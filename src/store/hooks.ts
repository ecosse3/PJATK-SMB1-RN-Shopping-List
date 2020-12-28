import { useRecoilState, useRecoilValue } from 'recoil';
import AsyncStorage from '@react-native-community/async-storage';
import SQLite from 'react-native-sqlite-storage';
import SendIntentAndroid from 'react-native-send-intent';
import firestore from '@react-native-firebase/firestore';
import {
  productListState,
  userState,
  globalProductListState,
  favoriteStoresState
} from './atoms';
import { ProductType, StoreType } from '../utils/types';
import {
  deleteProduct,
  insertProduct,
  updateProduct,
  updateProductBasketStatus
} from '../utils/sqlite';

// Open SQLite DB
const db = SQLite.openDatabase(
  {
    name: 'SQLite-s22004-products',
    location: 'default'
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  () => {},
  (e) => {
    console.log(e);
  }
);

// Utility functions

const cloneIndex = (items: ProductType[], id: string) => ({
  clone: items.map((item: ProductType) => ({ ...item })),
  index: items.findIndex((item: ProductType) => item.id === id)
});

const cloneIndexStore = (items: StoreType[], id: string) => ({
  clone: items.map((item: StoreType) => ({ ...item })),
  index: items.findIndex((item: StoreType) => item.id === id)
});

const saveProducts = async (products: ProductType[]) => {
  try {
    await AsyncStorage.setItem('@products', JSON.stringify(products));
  } catch (err) {
    console.log(err);
  }
};

const setShoppingList = (
  uid: string,
  products: ProductType[],
  isGlobalList: boolean
): void => {
  firestore()
    .collection('shopping-list')
    .doc(isGlobalList ? 'global' : uid)
    .set({
      products
    });
};

const setFavoriteStores = (uid: string, stores: StoreType[]): void => {
  firestore().collection('favorite-stores').doc(uid).set({
    stores
  });
};

// Hooks

// Product hooks

export const useAddEditProduct = (): ((product: ProductType) => void) => {
  const [products, setProducts] = useRecoilState(productListState);
  const user = useRecoilValue(userState);
  const isGlobalList = useRecoilValue(globalProductListState);

  return (product: ProductType) => {
    const { clone, index } = cloneIndex(products, product.id);

    if (index !== -1) {
      clone[index].name = product.name;
      clone[index].price = product.price;
      clone[index].amount = product.amount;
      setProducts(clone);
      saveProducts(clone);
      updateProduct(db, { ...product, inBasket: clone[index].inBasket });
      setShoppingList(user.uid, clone, isGlobalList);
    } else {
      setProducts([...clone, { ...product, inBasket: false }]);
      saveProducts([...clone, { ...product, inBasket: false }]);
      insertProduct(db, { ...product, inBasket: false });
      SendIntentAndroid.sendText({
        title: product.amount > 1 ? 'Nowe produkty' : 'Nowy produkt',
        text: `Dodano ${product.amount}x ${product.name} do listy zakupów`,
        type: SendIntentAndroid.TEXT_PLAIN
      });
      setShoppingList(
        user.uid,
        [...clone, { ...product, inBasket: false }],
        isGlobalList
      );
    }
  };
};

export const useRemoveProduct = (): ((productId: string) => void) => {
  const [products, setProducts] = useRecoilState(productListState);
  const user = useRecoilValue(userState);
  const isGlobalList = useRecoilValue(globalProductListState);

  return (productId: string) => {
    setProducts(products.filter((item) => item.id !== productId));
    saveProducts(products.filter((item) => item.id !== productId));
    deleteProduct(db, productId);
    setShoppingList(
      user.uid,
      products.filter((item) => item.id !== productId),
      isGlobalList
    );
  };
};

export const useToggleProductInBasket = (): ((productId: string) => void) => {
  const [products, setProducts] = useRecoilState(productListState);
  const user = useRecoilValue(userState);
  const isGlobalList = useRecoilValue(globalProductListState);

  return (productId: string) => {
    const { clone, index } = cloneIndex(products, productId);

    clone[index].inBasket = !clone[index].inBasket;
    setProducts(clone);
    saveProducts(clone);
    updateProductBasketStatus(db, productId, clone[index].inBasket);
    setShoppingList(user.uid, clone, isGlobalList);
  };
};

// Favorite store hooks

export const useAddEditFavoriteStore = (): ((store: StoreType) => void) => {
  const [stores, setStores] = useRecoilState(favoriteStoresState);
  const user = useRecoilValue(userState);

  return (store: StoreType) => {
    const { clone, index } = cloneIndexStore(stores, store.id);

    if (index !== -1) {
      clone[index].name = store.name;
      clone[index].description = store.description;
      clone[index].radius = store.radius;
      setStores(clone);
      setFavoriteStores(user.uid, clone);
    } else {
      setStores([...clone, { ...store }]);
      setFavoriteStores(user.uid, [...clone, { ...store }]);
    }
  };
};

export const useRemoveFavoriteStore = (): ((storeId: string) => void) => {
  const [stores, setStores] = useRecoilState(favoriteStoresState);
  const user = useRecoilValue(userState);

  return (storeId: string) => {
    setStores(stores.filter((item) => item.id !== storeId));
    setFavoriteStores(
      user.uid,
      stores.filter((item) => item.id !== storeId)
    );
  };
};
