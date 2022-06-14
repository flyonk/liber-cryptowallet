import { formatPhoneNumber } from '@/helpers/auth';

interface ICommunicationInfoDto {
  value: string;
  is_primary?: boolean;
}

interface ILiberContactDto {
  id: string;
  name: string;
  phones: ICommunicationInfoDto[];
  emails: ICommunicationInfoDto[];
}

interface INewLiberContactDto {
  name: string;
  phones?: ICommunicationInfoDto[];
  emails?: ICommunicationInfoDto[];
}

export interface ILiberContact {
  id: string;
  name: string;
  phones: TCommunicationInfo[];
  emails: TCommunicationInfo[];
}

export interface INewLiberContact {
  name: string;
  phones: TCommunicationInfo[];
  emails: TCommunicationInfo[];
}

type TCommunicationInfo = {
  value: string;
  isPrimary?: boolean;
};

export default {
  deserialize(input: ILiberContactDto): ILiberContact {
    return {
      id: input.id,
      name: input.name || '',
      phones: deserializeCommunicationInfoAdaptor(input.phones),
      emails: deserializeCommunicationInfoAdaptor(input.emails),
    };
  },
  requestSerialize(input: INewLiberContact): INewLiberContactDto {
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
  input: ICommunicationInfoDto[]
): TCommunicationInfo[] => {
  return input.map((e) => {
    const { value, is_primary } = e;
    return { value, isPrimary: is_primary };
  });
};

const requestSerializeCommunicationInfoAdaptor = (
  input: TCommunicationInfo[]
): ICommunicationInfoDto[] => {
  return input.map((e) => {
    const { value, isPrimary } = e;
    return { value: formatPhoneNumber(value), is_primary: isPrimary };
  });
};
