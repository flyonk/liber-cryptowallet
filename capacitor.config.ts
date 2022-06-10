import { CapacitorConfig } from '@capacitor/cli';

const appId = process.env.APP_ID || 'liber.cryptowize.tech';
const appName = process.env.APP_NAME || 'Liber';

const config: CapacitorConfig = {
  appId,
  appName,
  webDir: 'dist',
  bundledWebRuntime: false,

  server: {
    url: 'http://192.168.5.74:8080/',
    cleartext: true,
  },
};

export default config;
