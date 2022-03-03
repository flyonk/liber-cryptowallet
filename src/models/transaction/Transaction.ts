export interface ITransaction {
    transaction: INetTransaction | IRequestFunds
}

interface INetTransaction {
    id: string,
    sum: string,
    timestamp: string,
    status: ETransactionStatus,
    type: ETransactionType,
    contrAgent: {
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
    contrAgent: {
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