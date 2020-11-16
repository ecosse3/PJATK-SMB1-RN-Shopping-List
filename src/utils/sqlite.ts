import { ResultSet, SQLiteDatabase } from 'react-native-sqlite-storage';
import { ProductType } from './types';

export const executeQuery = (
  db: SQLiteDatabase,
  sql: string,
  params = []
): Promise<ResultSet> =>
  new Promise((resolve, reject) => {
    db.transaction((trans) => {
      trans.executeSql(
        sql,
        params,
        (trans, results) => {
          resolve(results);
        },
        (error) => {
          reject(error);
          console.log('error');
        }
      );
    });
  });

export const createTable = async (db: SQLiteDatabase): Promise<void> => {
  await executeQuery(
    db,
    'CREATE TABLE IF NOT EXISTS products (id VARCHAR(30) PRIMARY KEY NOT NULL, name VARCHAR(30), price VARCHAR(30), amount VARCHAR(30), in_basket VARCHAR(30))',
    []
  );
};

export const insertProduct = async (
  db: SQLiteDatabase,
  product: ProductType
): Promise<void> => {
  const { id, name, price, amount, inBasket } = product;

  await executeQuery(
    db,
    'INSERT INTO products (id, name, price, amount, in_basket) VALUES ( ?, ?, ?, ?, ?)',
    [`${id}`, `${name}`, `${price}`, `${amount}`, `${inBasket}`]
  );
};

export const updateProduct = async (
  db: SQLiteDatabase,
  product: ProductType
): Promise<void> => {
  const { id, name, price, amount, inBasket } = product;
  await executeQuery(
    db,
    'UPDATE products SET name = ? , price = ? , amount = ? , in_basket = ? WHERE id = ?',
    [`${name}`, `${price}`, `${amount}`, `${inBasket}`, `${id}`]
  );
};

export const updateProductBasketStatus = async (
  db: SQLiteDatabase,
  productId: string,
  inBasket: boolean
): Promise<void> => {
  await executeQuery(db, 'UPDATE products SET in_basket = ? WHERE id = ?', [
    `${inBasket}`,
    `${productId}`
  ]);
};

export const deleteProduct = async (
  db: SQLiteDatabase,
  productId: string
): Promise<void> => {
  await executeQuery(db, 'DELETE FROM products WHERE id = ?', [productId]);
};
