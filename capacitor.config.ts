import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'univibe',
  webDir: 'public',
  server: {
    androidScheme: 'https'
  }
};

export default config;
