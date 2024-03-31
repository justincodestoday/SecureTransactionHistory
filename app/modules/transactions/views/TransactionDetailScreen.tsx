import {NativeStackScreenProps} from '@react-navigation/native-stack';
import moment from 'moment';
import React, {PropsWithChildren} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

type Props = NativeStackScreenProps<RootStackParamList, 'TransactionDetail'>;

type DetailProps = PropsWithChildren<{
  label: string;
  value: string;
}>;

const TransactionDetailScreen = ({route, navigation}: Props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const {transaction} = route.params;

  const DetailRow = ({label, value}: DetailProps) => (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={[backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        style={[backgroundStyle]}
        contentInsetAdjustmentBehavior="automatic">
        <View style={styles.header}>
          <Text
            style={[
              styles.amount,
              transaction.type === 'Credit' ? styles.credit : styles.debit,
            ]}>
            {transaction.type === 'Credit'
              ? `+RM${transaction.amount.toFixed(2)}`
              : `-RM${transaction.amount.toFixed(2)}`}
          </Text>
        </View>
        <View>
          <DetailRow label="Transaction Type" value={transaction.type} />
          <DetailRow label="Payment Details" value={transaction.description} />
          <DetailRow
            label="Date"
            value={moment(transaction.date).format('DD/MM/YYYY')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  credit: {
    color: 'blue',
  },
  debit: {
    color: 'red',
  },
  detailRow: {
    padding: 20,
    borderRadius: 5,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: 16,
    color: '#333333',
  },
  detailValue: {
    fontSize: 16,
    color: '#000000',
  },
});

export default TransactionDetailScreen;
