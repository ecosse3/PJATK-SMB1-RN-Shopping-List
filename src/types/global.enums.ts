export const AddIconActions = {
  ADD_PRODUCT: 'ADD_PRODUCT',
  ADD_STORE: 'ADD_STORE'
} as const;

export type AddIconActionsType = typeof AddIconActions[keyof typeof AddIconActions];
