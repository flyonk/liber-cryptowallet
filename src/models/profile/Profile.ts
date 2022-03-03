export interface IProfile {
    status: number;
    phone: string;
    isVerified: false;
    blockReason: string;
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    streetAndNumber: string;
    optionalAddress: string;
    postalCode: string;
    birthDate: string
    isSendNews: boolean
}


export default {
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    deserialize(input: any): IProfile {
        return {
            status: input?.status,
            phone: input?.phone,
            isVerified: input?.isVerified,
            blockReason: input?.blockReason,
            firstName: input?.firstName,
            lastName: input?.lastName,
            email: input?.email,
            country: input?.country,
            streetAndNumber: input?.streetAndNumber,
            optionalAddress: input?.optionalAddress,
            postalCode: input?.postalCode,
            birthDate: input?.birthDate,
            isSendNews: input?.isSendNews
        };
    },

    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    requestSerialize(input: IProfile): any {
        return {
            status: input.status,
            phone: input.phone,
            is_verified: input.isVerified,
            block_reason: input.blockReason,
            first_name: input.firstName,
            last_name: input.lastName,
            email: input.email,
            country: input.country,
            street_and_number: input.streetAndNumber,
            optional_address: input.optionalAddress,
            postal_code: input.postalCode,
            birth_date: input.birthDate,
            is_send_news: input.isSendNews
        };
    },
};