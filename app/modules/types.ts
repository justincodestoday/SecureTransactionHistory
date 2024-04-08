/**
 * RootStackParamList is an object type that defines all the routes
 * in the navigation stack. It also defines the type safety of the
 * route parameters.
 */
type RootStackParamList = {
  Biometrics: undefined;
  TransactionHistory: undefined;
  TransactionDetail: {transaction: Transaction};
};
