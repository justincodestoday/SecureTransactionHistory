import {Alert} from 'react-native';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import {useNavigation} from '@react-navigation/native';
import TransactionHistoryScreen from '../transactions/views/TransactionHistoryScreen';

export const promptBiometrics = async () => {
  const rnBiometrics = new ReactNativeBiometrics();

  try {
    const {available, biometryType} = await rnBiometrics.isSensorAvailable();
    const navigation = useNavigation();

    if (available) {
      if (biometryType === BiometryTypes.Biometrics) {
        console.log('Biometrics is supported');
      } else if (biometryType === BiometryTypes.FaceID) {
        console.log('FaceID is supported');
      } else if (biometryType === BiometryTypes.TouchID) {
        console.log('TouchID is supported');
      }

      // Proceed with authentication
      const {success} = await rnBiometrics.simplePrompt({
        promptMessage: 'Confirm biometrics',
      });
      if (success) {
        console.log('Authentication successful');
        // navigation.navigate('TransactionHistoryScreen');
      } else {
        console.log('Authentication failed');
        Alert.alert('Authentication', 'Authentication failed');
      }
    } else {
      console.log('Biometrics not supported');
      Alert.alert('Error', 'Biometrics not supported on this device');
    }
  } catch (error) {
    console.error('Authentication error', error);
    Alert.alert('Authentication error', JSON.stringify(error));
  }
};
