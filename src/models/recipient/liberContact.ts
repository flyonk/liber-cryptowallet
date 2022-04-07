import { formatPhoneNumber } from '@/helpers/auth';

export interface ILiberContact {
  id: string;
  name: string;
  phones: TCommunicationInfo[];
  emails: TCommunicationInfo[];
}

type TCommunicationInfo = {
  value: string;
  isPrimary?: boolean;
};

export default {
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  deserialize(input: any): ILiberContact {
    return {
      id: input.id,
      name: input.name || '',
      phones: deserializeCommunicationInfoAdaptor(input.phones),
      emails: deserializeCommunicationInfoAdaptor(input.emails),
    };
  },
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  requestSerialize(input: Partial<ILiberContact>): any {
    return {
      name: input.name,
      phones: input.phones
        ? requestSerializeCommunicationInfoAdaptor(input.phones)
        : undefined,
      emails: input.emails
        ? requestSerializeCommunicationInfoAdaptor(input.emails)
        : undefined,
    };
  },
};

const deserializeCommunicationInfoAdaptor = (
  input: any
): TCommunicationInfo[] => {
  return input.map((e: any) => {
    const { value, is_primary } = e;
    return { value, isPrimary: is_primary };
  });
};

const requestSerializeCommunicationInfoAdaptor = (
  input: TCommunicationInfo[]
): any => {
  return input.map((e: TCommunicationInfo) => {
    const { value, isPrimary } = e;
    return { value: formatPhoneNumber(value), is_primary: isPrimary };
  });
};
