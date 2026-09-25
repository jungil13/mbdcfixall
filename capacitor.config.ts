import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mbdcdixall.app',
  appName: 'mbdcfixall',
  webDir: 'public',
  server: {
    url: 'https://mbdcfixall.com',
    cleartext: false,
  },
};

export default config;
