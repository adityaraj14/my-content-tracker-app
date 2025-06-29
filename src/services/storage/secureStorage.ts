import * as SecureStore from 'expo-secure-store';

class SecureStorage {
  private static instance: SecureStorage;
  private initialized: boolean = false;

  private constructor() {}

  static getInstance(): SecureStorage {
    if (!SecureStorage.instance) {
      SecureStorage.instance = new SecureStorage();
    }
    return SecureStorage.instance;
  }

  async initialize(apiKey: string): Promise<void> {
    if (this.initialized) return;

    try {
      await this.setApiKey(apiKey);
      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize secure storage:', error);
      throw new Error('Failed to initialize secure storage');
    }
  }

  private async setApiKey(apiKey: string): Promise<void> {
    try {
      await SecureStore.setItemAsync('tmdb_api_key', apiKey, {
        keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY
      });
    } catch (error) {
      console.error('Failed to store API key:', error);
      throw new Error('Failed to store API key securely');
    }
  }

  async getApiKey(): Promise<string> {
    try {
      const apiKey = await SecureStore.getItemAsync('tmdb_api_key');
      if (!apiKey) {
        throw new Error('No API key found in secure storage');
      }
      return apiKey;
    } catch (error) {
      console.error('Failed to retrieve API key:', error);
      throw new Error('Failed to retrieve API key from secure storage');
    }
  }

  async clearSecureStorage(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync('tmdb_api_key');
      this.initialized = false;
    } catch (error) {
      console.error('Failed to clear secure storage:', error);
      throw new Error('Failed to clear secure storage');
    }
  }
}

export const secureStorage = SecureStorage.getInstance(); 