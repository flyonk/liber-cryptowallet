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
    birthDate: string,
    isSendNews: boolean,
    avatarLink: string
}


export default {
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    deserialize(input: any): IProfile {
        const {
            status,
            phone,
            isVerified,
            blockReason,
            firstName,
            lastName,
            email,
            country,
            streetAndNumber,
            optionalAddress,
            postalCode,
            birthDate,
            isSendNews,
            avatarLink
        } = input

        return {
            status,
            phone,
            isVerified,
            blockReason,
            firstName,
            lastName,
            email,
            country,
            streetAndNumber,
            optionalAddress,
            postalCode,
            birthDate,
            isSendNews,
            avatarLink
        };
    },

    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    requestSerialize(input: Partial<IProfile>): any {
        const {
            status,
            phone,
            isVerified,
            blockReason,
            firstName,
            lastName,
            email,
            country,
            streetAndNumber,
            optionalAddress,
            postalCode,
            birthDate,
            isSendNews,
            avatarLink
        } = input

        return {
            status,
            phone,
            isVerified,
            blockReason,
            firstName,
            lastName,
            email,
            country,
            streetAndNumber,
            optionalAddress,
            postalCode,
            birthDate,
            isSendNews,
            avatarLink
        };
    },
};