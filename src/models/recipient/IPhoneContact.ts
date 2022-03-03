export interface IIPhoneContact {
    name: string,
    emails: string[],
    phones: string[]
}

export default {
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    deserialize(input: any): IIPhoneContact {
        const { name, emails, phones } = input

        return {
            name, emails, phones
        };
    },
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    requestSerialize(input: IIPhoneContact): any {
        const { name, emails, phones } = input

        return {
            name, emails, phones
        };
    },
};