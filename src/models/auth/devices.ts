export enum EAgentType {
  ios = 'ios',
  windows = 'windows',
  mac = 'mac',
  linux = 'linux',
  android = 'android',
}

export interface IUserDevice {
  id: string;
  agent_type: EAgentType;
  device_name: string;
  logged_at: string;
  ip: string;
  location: string;
}

export default {
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  deserialize(input: any): IUserDevice[] {
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    return input.devices.map((device: any) => ({
      id: device.id,
      agent_type: device.agent_type,
      device_name: device.device_name,
      logged_at: device.logged_at,
      ip: device.ip,
      location: device.location,
    }));
  },
};
