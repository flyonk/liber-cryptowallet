import { ITransaction } from "./Transaction";

export default {
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    deserialize(input: any): ITransaction {
        const { id, sum, timestamp, status, type, contragent } = input
        return {
            transaction: {
                id,
                sum,
                timestamp,
                status,
                type,
                contrAgent: contragent
            }
        };
    },
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    requestSerialize(input: ITransaction): any {
        const { id, sum, timestamp, status, type, contrAgent } = input.transaction

        return {
            id,
            sum,
            timestamp,
            status,
            type,
            contragent: contrAgent
        };
    },
};