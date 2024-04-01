import {Alert} from 'react-native';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';

export const promptBiometrics = async () => {
  const rnBiometrics = new ReactNativeBiometrics();

  try {
    const {available, biometryType} = await rnBiometrics.isSensorAvailable();

    if (available) {
      if (biometryType === BiometryTypes.Biometrics) {
        console.log('Biometrics is supported.');
        confirmBiometrics();
      } else if (biometryType === BiometryTypes.FaceID) {
        console.log('FaceID is supported.');
        confirmBiometrics();
      } else if (biometryType === BiometryTypes.TouchID) {
        console.log('TouchID is supported.');
        confirmBiometrics();
      }
    } else {
      console.log('Biometrics not supported.');
      return false;
    }
  } catch (error: any) {
    console.error('Device error', error);
    Alert.alert('Device error', error.message);
    return false;
  }
};

export const confirmBiometrics = async () => {
  const rnBiometrics = new ReactNativeBiometrics();

  const {success} = await rnBiometrics.simplePrompt({
    promptMessage: 'Confirm biometrics.',
  });

  try {
    if (success) {
      console.log('Successful biometrics provided.');
      return true;
    } else {
      console.log('User cancelled biometric prompt.');
      return false;
    }
  } catch (error: any) {
    console.error('Biometrics failed.');
    Alert.alert('Biometrics failed:', error.message);
    return false;
  }
};

export const checkExistingKeys = async () => {
  const rnBiometrics = new ReactNativeBiometrics();
  const {keysExist} = await rnBiometrics.biometricKeysExist();
  if (keysExist) {
    console.log('Keys exist.');
  } else {
    console.log('Keys do not exist or were deleted.');
  }
};
