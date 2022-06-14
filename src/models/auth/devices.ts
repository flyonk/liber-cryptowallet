export type TAgentType = 'ios' | 'windows' | 'mac' | 'linux' | 'android';

export interface IUserDeviceDto {
  id: string;
  agent_type: TAgentType;
  device_name: string;
  logged_at: string;
  ip: string;
  location: string;
}

export interface IUserDevice {
  id: string;
  agentType: TAgentType;
  deviceName: string;
  loggedAt: string;
  ip: string;
  location: string;
}

export default {
  deserialize(input: IUserDeviceDto): IUserDevice {
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
