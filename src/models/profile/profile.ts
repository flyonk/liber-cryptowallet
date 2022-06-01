import { string2ISO } from '@/helpers/filters';
import { formatPhoneNumber } from '@/helpers/auth';

export interface IProfileDto {
  id: string;
  status: number;
  phone: string;
  is_verified?: boolean;
  block_reason?: string;
  first_name: string;
  last_name: string;
  email: string;
  country?: string;
  street_and_number?: string;
  optional_address?: string;
  postal_code?: string;
  birthdate?: string;
  options?: TAnyObjectType;
  kycStatus: EKYCStatus;
  is_2_fa_configured?: boolean;
  is_pass_code_enabled: boolean;
}

type TAnyObjectType = Record<string, string | boolean | number | null>;

export enum EUserStatus {
  unregistered = 10, //UserStatusNew
  authenticated = 20, //UserStatusAuth
  registered = 30, //UserStatusRegistered
  active = 40, //UserStatusActive
  block = 50, //UserStatusBlock
  closed = 60, //UserStatusClosed
}

export enum EKYCStatus {
  not_started = 10,
  pending = 20,
  rejected = 30,
  success = 40,
}

export type TMarketing = {
  isEmail: boolean;
  isPushNotification: boolean;
  isSocialMedia: boolean;
};

export interface IProfile
  extends Record<
    string,
    | string
    | boolean
    | number
    | TMarketing
    | undefined
    | TAnyObjectType
    | string[]
  > {
  id: string;
  status: number;
  phone: string;
  isVerified?: boolean;
  blockReason?: string;
  firstName: string;
  lastName: string;
  email: string;
  country?: string;
  street?: string;
  homeNum?: string;
  optionalAddress?: string;
  postalCode?: string;
  birthDate?: string;
  options?: TAnyObjectType;
  is2FAConfigured?: boolean;
  isPasscodeEnabled: boolean;
  marketing: TMarketing;
  kycStatus: EKYCStatus;
  //temporary for testing accepted phone and emails page
  additionalEmails: Array<string>;
  additionalPhones: Array<string>;
}

export default {
  deserialize(input: IProfileDto): IProfile {
    return {
      id: input.id,
      status: input.status || 0,
      phone: input.phone || '',
      isVerified: input.is_verified || false,
      blockReason: input.block_reason || '',
      firstName: input.first_name || '',
      lastName: input.last_name || '',
      email: input.email || '',
      country: input.country || '',
      street: input?.street_and_number?.split(' ')[0] || '',
      homeNum: input?.street_and_number?.split(' ')[1] || '',
      optionalAddress: input.optional_address || '',
      postalCode: input.postal_code || '',
      birthDate: input.birthdate || '',
      kycStatus: input.kycStatus || EKYCStatus.success,
      is2FAConfigured: input.is_2_fa_configured || false,
      options: input.options || {},
      isPasscodeEnabled: input.is_pass_code_enabled,
      marketing: {
        isEmail: false,
        isPushNotification: false,
        isSocialMedia: false,
      },
      additionalPhones: [],
      additionalEmails: [],
    };
  },

  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  requestSerialize(input: Partial<IProfile>): any {
    const request = {
      status: input.status,
      phone: input?.phone ? formatPhoneNumber(input.phone) : input.phone,
      is_verified: input.isVerified,
      block_reason: input.blockReason,
      first_name: input.firstName,
      last_name: input.lastName,
      email: input.email,
      country: input.country,
      optionalAddress: input.optionalAddress,
      postal_code: input.postalCode,
      is_send_news: !!input.marketing?.isEmail,
      options: input.options,
    } as Partial<IProfile>;
    if (input.birthDate) request.birthdate = string2ISO(input.birthDate);
    if (input.street && input.homeNum)
      request.street_and_number = `${input.street} ${input.homeNum}`;
    return request;
  },
};
