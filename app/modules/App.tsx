import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TransactionHistoryScreen from './transactions/views/TransactionHistoryScreen';
import TransactionDetailScreen from './transactions/views/TransactionDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TransactionHistory"
        screenOptions={{
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen
          name="TransactionHistory"
          component={TransactionHistoryScreen}
          options={{title: 'Transaction History'}}
        />
        <Stack.Screen
          name="TransactionDetail"
          component={TransactionDetailScreen}
          options={{title: 'Details'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
