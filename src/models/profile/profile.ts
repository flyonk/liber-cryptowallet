import { string2ISO } from '@/helpers/filters';
import { formatPhoneNumber } from '@/helpers/auth';

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
    string | boolean | number | TMarketing | undefined | TAnyObjectType
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
  marketing: TMarketing;
  kycStatus: EKYCStatus;
}

export default {
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  deserialize(input: any): IProfile {
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
      is2FAConfigured:
        input.is_2fa_configured || !!input.options?.secret_2fa || false, //TODO: temporary hack for 2FA
      options: input.options || {},
      marketing: {
        isEmail: false,
        isPushNotification: false,
        isSocialMedia: false,
      },
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
