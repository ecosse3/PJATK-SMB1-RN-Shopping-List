// Bottom Tab

export type TabParamList = {
  FavoriteStores: undefined;
  Settings: undefined;
  ShoppingList: undefined;
};

// Stack

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
  AddEditFavoriteStoreScreen: undefined;
};
