import { TTransaction } from "./Transaction";

export default {
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    deserialize(input: any): TTransaction {
        const { id, sum, timestamp, status, type, contractor } = input
        return {
            id,
            sum,
            timestamp,
            status,
            type,
            contractor
        };
    },
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    requestSerialize(input: TTransaction): any {
        const { id, sum, timestamp, status, type, contractor } = input

        return {
            id,
            sum,
            timestamp,
            status,
            type,
            contractor
        };
    },
};