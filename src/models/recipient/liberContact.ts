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
        return {
            id: input.id,
            name: input.name || '',
            phones: deserializeCommunicationInfoAdaptor(input.phones),
            emails: deserializeCommunicationInfoAdaptor(input.emails),
        };
    },
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    requestSerialize(input: ILiberContact): any {
        return {
            id: input.id,
            name: input.name,
            phones: requestSerializeCommunicationInfoAdaptor(input.phones),
            emails: requestSerializeCommunicationInfoAdaptor(input.emails)
        };
    },
};

const deserializeCommunicationInfoAdaptor = (input: any): TCommunicationInfo[] => {
    return input.map((e: any) => {
        const { value, is_primary } = e
        return { value, isPrimary: is_primary }
    })
}

const requestSerializeCommunicationInfoAdaptor = (input: TCommunicationInfo[]): any => {
    return input.map((e: TCommunicationInfo) => {
        const { value, isPrimary } = e
        return { value, is_primary: isPrimary }
    })
} 