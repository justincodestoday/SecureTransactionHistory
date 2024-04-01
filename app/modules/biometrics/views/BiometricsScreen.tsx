import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {promptBiometrics} from '../util/biometrics';

type BiometricsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Biometrics'
>;

type Props = {
  navigation: BiometricsScreenNavigationProp;
};

const BiometricsScreen = ({navigation}: Props) => {
  const [pin, setPin] = useState('');

  useEffect(() => {
    runBiometrics();
  }, []);

  const runBiometrics = async () => {
    const isAuthenticated = await promptBiometrics();
    if (isAuthenticated) {
      navigation.replace('TransactionHistory');
    }
  };

  const validatePin = (newPin: string) => {
    if (newPin === '1234') {
      console.log('PIN authentication successful');
      navigation.replace('TransactionHistory');
    } else {
      console.log('Incorrect PIN');
      Alert.alert('Incorrect PIN', 'The PIN you entered is incorrect.', [
        {text: 'OK', onPress: () => setPin('')},
      ]);
    }
  };

  const handleDeleteKey = () => {
    setPin(prevPin => prevPin.slice(0, -1));
  };

  const handleClearKey = () => {
    setPin('');
  };

  const handleKeyPress = (number: string | number) => {
    if (pin.length < 4) {
      const newPin = pin + number;
      setPin(newPin);
      if (newPin.length === 4) {
        validatePin(newPin);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Enter Passcode</Text>
      <TextInput
        value={pin}
        onChangeText={setPin}
        style={styles.input}
        editable={false}
        maxLength={4}
        keyboardType="number-pad"
      />
      <View style={styles.keypad}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'CLR', 0, 'DEL'].map(number => {
          return (
            <TouchableOpacity
              key={number.toString()}
              style={styles.key}
              onPress={() => {
                if (number === 'CLR') {
                  handleClearKey();
                } else if (number === 'DEL') {
                  handleDeleteKey();
                } else {
                  handleKeyPress(number);
                }
              }}>
              <Text style={styles.keyText}>{number}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingTop: 50,
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    color: 'black',
  },
  input: {
    width: '60%',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 20,
    padding: 20,
    color: 'black',
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 300,
  },
  key: {
    margin: 8,
    width: 75,
    height: 75,
    borderRadius: 37.5,
    backgroundColor: '#DDDDDD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyText: {
    fontSize: 24,
    color: '#000000',
  },
});

export default BiometricsScreen;
