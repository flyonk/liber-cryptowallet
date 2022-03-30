import { string2ISO } from '@/helpers/filters';

type TAnyObjectType = Record<string, string | boolean | number | null>;

export enum EUserStatus {
  unregistered = 10, //UserStatusNew
  active = 20, //UserStatusActive
  block = 30, //UserStatusBlock
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
      is2FAConfigured: input.is_2fa_configured || false,
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
    const address =
      input.street && input.homeNum ? `${input.street} ${input.homeNum}` : null;
    const birthDate = input.birthDate ? string2ISO(input.birthDate) : null;
    return {
      status: input.status,
      phone: input.phone,
      is_verified: input.isVerified,
      block_reason: input.blockReason,
      first_name: input.firstName,
      last_name: input.lastName,
      email: input.email,
      country: input.country,
      street_and_number: address,
      optionalAddress: input.optionalAddress,
      postal_code: input.postalCode,
      birthdate: birthDate,
      is_send_news: !!input.marketing?.isEmail,
      options: input.options || {},
    };
  },
};
