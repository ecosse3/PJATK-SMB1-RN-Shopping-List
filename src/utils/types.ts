export type TabParamList = {
  FavoriteStores: undefined;
  Settings: undefined;
  ShoppingList: undefined;
};

export type ShoppingListStackParamList = {
  ShoppingListScreen: undefined;
  AddEditProductScreen: undefined;
  LoginScreen: undefined;
  WelcomeScreen: undefined;
};

export type SettingsStackParamList = {
  SettingsScreen: undefined;
};

export type WelcomeStackParamList = {
  WelcomeScreen: undefined;
  LoginScreen: undefined;
};

export type LoginStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ShoppingListScreen: undefined;
};

export type RegisterStackParamList = {
  RegisterScreen: undefined;
  ShoppingListScreen: undefined;
};

export type FavoriteStoresStackParamList = {
  FavoriteStoresScreen: undefined;
};

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
};
