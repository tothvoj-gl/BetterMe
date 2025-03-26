export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Finance: undefined;
  AddFinanceInfo: undefined;
  Register: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
