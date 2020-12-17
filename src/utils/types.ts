export type TabParamList = {
  ShoppingList: undefined;
  Settings: undefined;
};

export type ShoppingListStackParamList = {
  ShoppingListScreen: undefined;
  WelcomeScreen: undefined;
  AddEditProductScreen: undefined;
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
