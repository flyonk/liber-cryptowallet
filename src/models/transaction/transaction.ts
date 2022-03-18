export type TTransaction = INetTransaction | IRequestFunds;

export interface INetTransaction {
  id: string;
  sum: string;
  status: ETransactionStatus;
  type: ETransactionType | ETransactionDirection;
  code: string;
  icon?: string;
  direction: ETransactionDirection;
  contractor?: {
    id: string;
    phone: string;
    email?: string;
    address?: string;
  };
}

export interface IRequestFunds {
  id: string;
  amount: string;
  timestamp: string;
  status: ERequestFundsStatus;
  code: string;
  type: ERequestFundsType;
  direction: ETransactionDirection;
  contractor: {
    id?: string;
    phone: string;
    email?: string;
    address?: string;
  };
}

enum ETransactionDirection {
  outcome = 'outcome',
  income = 'income',
}

enum ETransactionType {
  transfer = 'transfer',
  convert = 'convert',
  deposit = 'deposit',
  withdraw = 'withdraw',
}

enum ETransactionStatus {
  pending = 'pending',
  unconfirmed = 'unconfirmed',
  completed = 'finished',
  rejected = 'cancelled',
}

export enum ERequestFundsType {
  PaymentLink = 'PaymentLink',
  Send = 'Send',
  Request = 'Request',
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
      sum: _transactionAmount2Sum(input.amount, input.direction),
      status: input.status,
      type:
        input.type === ETransactionType.transfer ? input.direction : input.type,
      code: input.code?.toUpperCase(),
      direction: input.direction,
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
      amount: (input as INetTransaction).sum || (input as IRequestFunds).amount,
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

function _transactionAmount2Sum(
  amount: string,
  direction: ETransactionDirection
): string {
  return direction === ETransactionDirection.income
    ? `+ ${amount}`
    : `- ${amount}`;
}

function _getTransactionIcon(type: ETransactionType): string {
  //TODO: define icons set, check logic
  let icon = '';
  switch (type) {
    case ETransactionType.transfer || ETransactionType.withdraw:
      icon = require('@/assets/icon/transactions/sent.svg');
      break;
    case ETransactionType.deposit:
      icon = require('@/assets/icon/transactions/received.svg');
      break;
    case ETransactionType.convert:
      icon = require('@/assets/icon/transactions/exchange.svg');
      break;
    default:
      icon = require('@/assets/icon/transactions/received.svg');
      break;
  }
  return icon;
}
