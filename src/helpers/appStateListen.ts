import { App } from '@capacitor/app';

export default function init() {
  App.addListener('appStateChange', ({ isActive }) => {
    console.log('App state changed. Is active?', isActive);
  });

  App.addListener('appRestoredResult', (data) => {
    console.log('Restored state:', data);
  });
}
