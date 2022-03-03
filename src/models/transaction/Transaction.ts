interface ITransaction {
    id: string,
    sum: string,
    timestamp: string,
    status: string,
    type: string, // "to", "from", "convert", "deposit", "withdraw"
    contrAgent: {
        id: string,
        phone: string,
        email: string,
        address: string
    }
}

export default {
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    deserialize(input: any): ITransaction {
        return {
            id: input?.id,
            sum: input?.sum,
            timestamp: input?.timestamp,
            status: input?.status,
            type: input?.type, // "to", "from", "convert", "deposit", "withdraw"
            contrAgent: {
                id: input?.contragent?.id,
                phone: input?.contragent?.phone,
                email: input?.contragent?.email,
                address: input?.contragent?.address
            }
        };
    },

    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    requestSerialize(input: ITransaction): any {
        return {
            id: input.id,
            sum: input.sum,
            timestamp: input.timestamp,
            status: input.status,
            type: input.type, // "to", "from", "convert", "deposit", "withdraw"
            contrAgent: {
                id: input.contrAgent.id,
                phone: input.contrAgent.phone,
                email: input.contrAgent.email,
                address: input.contrAgent.address
            }
        };
    }
}