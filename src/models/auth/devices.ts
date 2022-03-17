export type TAgentType = 'ios' | 'windows' | 'mac' | 'linux' | 'android';

export interface IUserDevice {
  id: string;
  agentType: TAgentType;
  deviceName: string;
  loggedAt: string;
  ip: string;
  location: string;
}

export default {
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  deserialize(input: any): IUserDevice {
    return {
      id: input.id,
      agentType: input.agent_type,
      deviceName: input.device_name,
      loggedAt: input.logged_at,
      ip: input.ip,
      location: input.location,
    };
  },
};
