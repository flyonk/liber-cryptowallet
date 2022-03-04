export type TTransaction = INetTransaction | IRequestFunds

interface INetTransaction {
    id: string,
    sum: string,
    timestamp: string,
    status: ETransactionStatus,
    type: ETransactionType,
    contractor: {
        id: string,
        phone: string,
        email: string,
        address: string
    }
}

interface IRequestFunds {
    id: string,
    sum: string,
    timestamp: string,
    status: ERequestFundsStatus,
    type: ERequestFundsType,
    contractor: {
        id: string,
        phone: string,
        email: string,
        address: string
    }
}

enum ETransactionType { To, From, Convert, Deposit, Withdraw }
enum ETransactionStatus { Pending, Completed, Rejected }

enum ERequestFundsType { PaymentLink, Send, Request }
enum ERequestFundsStatus { Opened, Closed, Declined, Completed }


export default {
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    deserialize(input: any): TTransaction {
        return {
            id: input.id,
            sum: input.sum,
            timestamp: input.timestamp,
            status: input.status,
            type: input.type,
            contractor: {
                id: input.contractor.id,
                phone: input.contractor.phone,
                email: input.contractor.email,
                address: input.contractor.address
            }
        };
    },

    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    requestSerialize(input: TTransaction): any {
        return {
            id: input.id,
            sum: input.sum,
            timestamp: input.timestamp,
            status: input.status,
            type: input.type,
            contractor: {
                id: input.contractor.id,
                phone: input.contractor.phone,
                email: input.contractor.email,
                address: input.contractor.address
            }
        };
    },
};