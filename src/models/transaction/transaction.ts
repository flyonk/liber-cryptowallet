export type TTransaction = INetTransaction | IRequestFunds;

interface INetTransaction {
  id: string;
  txid: string;
  amount: string;
  timestamp: string;
  status: ETransactionStatus;
  type: ETransactionType;
  code: string;
  contractor: {
    id?: string;
    phone: string;
    email?: string;
    address?: string;
  };
}

interface IRequestFunds {
  id: string;
  amount: string;
  timestamp: string;
  status: ERequestFundsStatus;
  type: ERequestFundsType;
  code: string;
  contractor: {
    id?: string;
    phone: string;
    email?: string;
    address?: string;
  };
}

export enum ETransactionType {
  Convert = 'Convert',
  Deposit = 'Deposit',
  Received = 'Received',
  Send = 'Send',
}

export enum ETransactionStatus {
  Pending = 'Pending',
  Completed = 'Completed',
  Failed = 'Failed',
}

export enum ERequestFundsType {
  PaymentLink,
  Send,
  Request,
}

export enum ERequestFundsStatus {
  Opened,
  Closed,
  Declined,
  Completed,
}

export default {
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  deserialize(input: any): TTransaction {
    return {
      id: input.id,
      amount: input.amount || '',
      timestamp: input.timestamp || '',
      status: input.status,
      code: input.code || '',
      type: input.type,
      contractor: {
        id: input.contractor.id,
        phone: input.contractor.phone || '',
        email: input.contractor.email || '',
        address: input.contractor.address || '',
      },
    };
  },

  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  requestSerialize(input: TTransaction): any {
    return {
      id: input.id,
      amount: input.amount,
      timestamp: input.timestamp,
      status: input.status,
      type: input.type,
      contractor: {
        id: input.contractor.id,
        phone: input.contractor.phone,
        email: input.contractor.email,
        address: input.contractor.address,
      },
    };
  },
};
