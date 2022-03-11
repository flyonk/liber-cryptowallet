export interface IProfile {
  id: string;
  status?: number;
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
  isSendNews?: boolean;
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
      street: input?.street_and_number.split(' ')[0] || '',
      homeNum: input?.street_and_number.split(' ')[1] || '',
      optionalAddress: input.optional_address || '',
      postalCode: input.postal_code || '',
      birthDate: input.birthdate || '',
      isSendNews: input.is_send_news || false, // by default undefined
    };
  },

  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  requestSerialize(input: Partial<IProfile>): any {
    return {
      status: input.status,
      phone: input.phone,
      is_verified: input.isVerified,
      block_reason: input.blockReason,
      first_name: input.firstName,
      last_name: input.lastName,
      email: input.email,
      country: input.country,
      street_and_number: `${input.street} ${input.homeNum}`,
      optionalAddress: input.optionalAddress,
      postal_code: input.postalCode,
      birthdate: input.birthDate,
      is_send_news: input.isSendNews,
    };
  },
};
