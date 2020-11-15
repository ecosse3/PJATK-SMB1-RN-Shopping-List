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

export type ProductType = {
  id: string;
  name: string;
  price: number;
  amount: number;
  inBucket?: boolean;
};
