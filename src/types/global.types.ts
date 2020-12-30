export type ProductType = {
  id: string;
  name: string;
  price: number;
  amount: number;
  inBasket?: boolean;
};

export type ThemeType = {
  colors: {
    primary: string;
    secondary: string;
    badge: string;
    basket?: string;
  };
};

export type StoreType = {
  id: string;
  name: string;
  description: string;
  radius: number;
  longitude: number;
  latitude: number;
  address: string;
  color: string;
};

export type GeolocationDataType = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};
