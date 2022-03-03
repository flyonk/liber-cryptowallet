export interface ILiberContact {
    id: string,
    name: string,
    phones: TCommunicationInfo[],
    emails: TCommunicationInfo[],
}

type TCommunicationInfo = {
    value: string,
    isPrimary?: boolean
}

export default {
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    deserialize(input: any): ILiberContact {
        const { id, name, phones, emails } = input

        return {
            id, name, phones, emails
        };
    },
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    requestSerialize(input: ILiberContact): any {
        const { id, name, phones, emails } = input

        return {
            id, name, phones, emails
        };
    },
};