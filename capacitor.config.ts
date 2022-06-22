import { CapacitorConfig } from '@capacitor/cli';
import { CapacitorProject } from '@capacitor/project';

const appId = process.env.APP_ID || 'liber.cryptowize.tech';
const appName = process.env.APP_NAME || 'Liber';

async function updateIosApp() {
  const project = new CapacitorProject(config);
  await project.load();
  project.ios?.getBuildProperty;
  await project.ios?.setBundleId('App', null, appId);
  if (process.env.DEVELOPMENT_TEAM) {
    await project.ios?.setBuildProperty(
      'App',
      null,
      'DEVELOPMENT_TEAM',
      process.env.DEVELOPMENT_TEAM
    );
  }
  await project.commit();
}

const config: CapacitorConfig = {
  appId,
  appName,
  webDir: 'dist',
  bundledWebRuntime: false,
  ios: {
    path: 'ios',
  },
};

if (process.env.APP_ID) {
  updateIosApp();
}

export default config;
