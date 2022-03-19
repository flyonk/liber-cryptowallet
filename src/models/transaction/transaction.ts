export type TTransaction = INetTransaction | IRequestFunds;

export interface INetTransaction {
  id: string;
  sum: string;
  code: string;
  icon?: string;
  info: string;
  status: ETransactionStatus;
  type: ETransactionType;
  contractor?: IContractor;
}

export interface IRequestFunds {
  id: string;
  sum: string;
  timestamp: string;
  status: ERequestFundsStatus;
  code: string;
  type: ERequestFundsType;
  contractor: IContractor;
}

export interface IContractor {
  id: string;
  phone: string;
  email: string;
  address: string;
}

export enum ETransactionType {
  convert = 'convert', //using now
  deposit = 'deposit', //using now
  transfer = 'transfer', //using now
  received = 'received',
  send = 'send',
  guard = '',
}

export enum ETransactionStatus {
  pending = 'pending',
  finished = 'finished',
  failed = 'failed',
  guard = '',
}

export enum ERequestFundsType {
  paymentLink = 'paymentLink',
  send = 'send',
  request = 'request',
  guard = '',
}

export enum ERequestFundsStatus {
  opened = 'opened',
  closed = 'closed',
  declined = 'declined',
  completed = 'completed',
  guard = '',
}

export enum EDirection {
  income = 'income',
  outcome = 'outcome',
  guard = '',
}

export default {
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  deserialize(input: any): TTransaction {
    return {
      id: input.id,
      sum: _transactionAmount2Sum(input.amount, input.type, input.direction),
      status: input.status,
      type: input.type,
      code: input.code?.toUpperCase(),
      icon: _getTransactionIcon(input.type),
      info: _getTransactionInfo(input.direction, input.contragent, input.code),
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
  type: ETransactionType,
  direction: EDirection
): string {
  return type === ETransactionType.deposit ||
    (type === ETransactionType.transfer && direction === EDirection.income) ||
    (type === ETransactionType.convert && direction === EDirection.income)
    ? `+ ${amount}`
    : `- ${amount}`;
}

function _getTransactionIcon(type: ETransactionType): string {
  //TODO: define icons set
  let icon = '';
  switch (type) {
    case ETransactionType.transfer:
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

function _getTransactionInfo(
  direction: EDirection,
  contractor: IContractor,
  code: string
): string {
  if (direction === EDirection.income)
    return `From ${
      contractor ? contractor.phone : `${code.toUpperCase()} address`
    }`;

  return `To ${
    contractor ? contractor.phone : `${code.toUpperCase()} address`
  }`;
}
