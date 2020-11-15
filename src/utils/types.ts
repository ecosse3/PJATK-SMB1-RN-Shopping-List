export type TabParamList = {
  ShoppingList: undefined;
  Settings: undefined;
};

export type ShoppingListStackParamList = {
  ShoppingListScreen: undefined;
  WelcomeScreen: undefined;
};

export type SettingsStackParamList = {
  SettingsScreen: undefined;
};

export type ProductType = {
  id: number;
  name: string;
  price: number;
  amount: number;
  inBucket: boolean;
};
