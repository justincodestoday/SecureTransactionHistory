import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  FlatList,
  useColorScheme,
  View,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import moment from 'moment';

import transactions from '../../../models/transactions.json';

// This navigation prop is specifically for navigating
// from the 'TransactionHistory' screen.
type TransactionHistoryNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'TransactionHistory'
>;

type Props = {
  navigation: TransactionHistoryNavigationProp;
};

const TransactionHistoryScreen = ({navigation}: Props): React.JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [refreshing, setRefreshing] = useState(false);
  const [transactionData, setTransactionData] = useState([] as Transaction[]);
  const [isLoading, setIsLoading] = useState(true);

  // Pull to refresh
  // useCallback returns a memoized callback function
  const onRefresh = useCallback(() => {
    fetchTransactionData();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // Makes an API call to retrieve the latest transactions from JSON objects.
  // Or in this case, from the transactions.json file.
  const fetchTransactionData = async () => {
    try {
      setTransactionData(transactions as Transaction[]);
    } catch (error: any) {
      console.error('Fetching from API failed. Try to refresh page.');
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactionData();
  }, []);

  const renderItem = ({item}: {item: Transaction}) => (
    <TouchableOpacity
      key={item.id}
      style={styles.item}
      onPress={() =>
        // Pass a transaction object matching the Transaction type
        navigation.navigate('TransactionDetail', {transaction: item})
      }>
      <Text style={styles.itemText}>
        {moment(item.date).format('D MMMM YYYY')}
      </Text>
      <View style={styles.row}>
        <Text style={styles.itemMain}>{item.description}</Text>
        <Text
          style={[
            styles.itemMain,
            item.type === 'Credit' ? styles.credit : styles.debit,
          ]}>
          {item.type === 'Credit'
            ? `+RM${item.amount.toFixed(2)}`
            : `-RM${item.amount.toFixed(2)}`}
        </Text>
      </View>
      <Text style={styles.itemText}>{item.type}</Text>
    </TouchableOpacity>
  );

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <FlatList
        data={transactionData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemMain: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  itemText: {
    fontSize: 14,
  },
  credit: {
    color: 'blue',
  },
  debit: {
    color: 'red',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
});

export default TransactionHistoryScreen;
