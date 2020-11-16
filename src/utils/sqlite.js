import SQLite from 'react-native-sqlite-storage';

export const openDatabase = () => {
  return SQLite.openDatabase(
    {
      name: 'SQLite',
      location: 'default',
      createFromLocation: '~SQLite.db'
    },
    () => {},
    (error) => {
      console.log(`ERROR: ${error}`);
    }
  );
};

export const executeQuery = (db, sql, params = []) =>
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

export const createTable = async (db) => {
  const table = await executeQuery(
    db,
    'CREATE TABLE IF NOT EXISTS products (id VARCHAR(30) PRIMARY KEY NOT NULL, name VARCHAR(30), price VARCHAR(30), amount VARCHAR(30), in_basket VARCHAR(30))',
    []
  );
};

export const insertProduct = async (db, product) => {
  const { id, name, price, amount, inBasket } = product;

  const singleInsert = await executeQuery(
    db,
    'INSERT INTO products (id, name, price, amount, in_basket) VALUES ( ?, ?, ?, ?, ?)',
    [`${id}`, `${name}`, `${price}`, `${amount}`, `${inBasket}`]
  );
};
