import { registerPlugin } from '@capacitor/core';

export interface SwipeBackPlugin {
  enable(): Promise<{ error: number }>;
  disable(): Promise<{ error: number }>;
}

const SwipeBack = registerPlugin<SwipeBackPlugin>('SwipeBack');

export default SwipeBack;
