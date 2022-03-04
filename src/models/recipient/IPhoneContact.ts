export interface IIPhoneContact {
    name: string,
    emails: string[],
    phones: string[]
}

export default {
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    deserialize(input: any): IIPhoneContact {
        return {
            name: input.name, 
            emails: input.emails, 
            phones: input.phones
        };
    },

    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    requestSerialize(input: IIPhoneContact): any {
        return {
            name: input.name,
            emails: input.emails,
            phones: input.phones,
        };
    },
};