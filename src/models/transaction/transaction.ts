export type TTransaction = INetTransaction | IRequestFunds;

export interface INetTransaction {
  id: string;
  sum: string;
  status: ETransactionStatus;
  type: ETransactionType;
  code: string;
  icon?: string;
  contractor?: {
    id: string;
    phone: string;
    email: string;
    address: string;
  };
}

export interface IRequestFunds {
  id: string;
  sum: string;
  timestamp: string;
  status: ERequestFundsStatus;
  code: string;
  type: ERequestFundsType;
  contractor: {
    id: string;
    phone: string;
    email: string;
    address: string;
  };
}

enum ETransactionType {
  Transfer = 'transfer',
  Convert = 'convert',
  Deposit = 'deposit',
  Withdraw = 'withdraw',
}
enum ETransactionStatus {
  Pending = 'pending',
  Unconfirmed = 'unconfirmed',
  Completed = 'finished',
  Rejected = 'cancelled',
}

enum ERequestFundsType {
  PaymentLink,
  Send,
  Request,
}
enum ERequestFundsStatus {
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
      sum: _transactionAmount2Sum(input.amount, input.type),
      status: input.status,
      type: input.type,
      code: input.code?.toUpperCase(),
      icon: _getTransactionIcon(input.type),
      contractor: input.contragent
        ? {
            id: input.contragent.id || '',
            phone: input.contragent.phone || '',
            email: input.contragent.email || '',
            address: input.contragent.address || '',
          }
        : undefined,
    };
  },

  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  requestSerialize(input: TTransaction): any {
    return {
      id: input.id,
      amount: input.sum,
      status: input.status,
      type: input.type,
      code: input.code,
      contragent: input.contractor
        ? {
            id: input.contractor.id,
            phone: input.contractor.phone,
            email: input.contractor.email,
            address: input.contractor.address,
          }
        : undefined,
    };
  },
};

//TODO: check Transfer type for sent or receive
function _transactionAmount2Sum(
  amount: string,
  type: ETransactionType
): string {
  return type === ETransactionType.Deposit || type === ETransactionType.Convert
    ? `+ ${amount}`
    : `- ${amount}`;
}

function _getTransactionIcon(type: ETransactionType): string {
  //TODO: define icons set
  let icon = '';
  switch (type) {
    case ETransactionType.Transfer || ETransactionType.Withdraw:
      icon = require('@/assets/icon/transactions/sent.svg');
      break;
    case ETransactionType.Deposit:
      icon = require('@/assets/icon/transactions/received.svg');
      break;
    case ETransactionType.Convert:
      icon = require('@/assets/icon/transactions/exchange.svg');
      break;
    default:
      icon = require('@/assets/icon/transactions/received.svg');
      break;
  }
  return icon;
}
