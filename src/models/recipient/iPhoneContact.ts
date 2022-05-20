export interface IIPhoneContactDto {
  name: string;
  emails?: string[];
  phones?: string[];
}

export interface IIPhoneContact {
  name: string;
  emails: string[];
  phones: string[];
}

export default {
  deserialize(input: IIPhoneContactDto): IIPhoneContact {
    return {
      name: input.name,
      emails: input.emails || [],
      phones: input.phones || [],
    };
  },

  requestSerialize(input: IIPhoneContact): IIPhoneContactDto {
    return {
      name: input.name,
      emails: input.emails,
      phones: input.phones,
    };
  },
};
