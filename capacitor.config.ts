import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'liber.cryptowize.tech',
  appName: 'Liber',
  webDir: 'dist',
  bundledWebRuntime: false,

  server: {
    url: 'http://192.168.5.74:8080/',
    cleartext: true,
  },
};

export default config;
