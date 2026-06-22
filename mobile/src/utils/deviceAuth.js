import * as SecureStore from 'expo-secure-store';
import uuid from 'react-native-uuid';

const DEVICE_ID_KEY = 'brailley_secure_device_id';

export async function getOrCreateDeviceId() {
  try {
    let deviceId = await SecureStore.getItemAsync(DEVICE_ID_KEY);
    
    if (!deviceId) {
      deviceId = uuid.v4();
      await SecureStore.setItemAsync(DEVICE_ID_KEY, deviceId);
    }
    
    return deviceId;
  } catch (error) {
    console.error('SecureStore Error:', error);
    return null;
  }
}