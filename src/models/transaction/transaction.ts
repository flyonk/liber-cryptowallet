export type TTransaction =
  | INetTransaction
  | IRequestFunds
  | IConvertTransaction
  | ITransferTransaction;

export type TConvertTransaction = {
  code?: string;
  amount?: string;
};

export interface INetTransaction {
  id: string;
  sum: string;
  code: string;
  to?: TConvertTransaction;
  from?: TConvertTransaction;
  icon?: string;
  info?: string;
  direction?: EDirection;
  fee?: string;
  feeCode?: string;
  status: ETransactionStatus;
  type: ETransactionType;
  contractor?: IContractor;
  startDate?: string;
  finishDate?: string;
  relativeDate?: string;
  rate?: string;
  detailedInfo?: string;
  txid?: string;
  oppositeCoin?: {
    amount: string;
    code: string;
  };
}

export interface IRequestFunds {
  id: string;
  amount?: string;
  timestamp?: string;
  status: ERequestFundsStatus;
  code: string;
  fee?: string;
  feeCode?: string;
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

export interface IFeeInfo {
  amount: string;
  code: string;
}

export interface IDirectionInfo {
  code: string;
  amount: string;
}

export interface ITransactionDefault {
  id: string;
  status: ETransactionStatus;
  amount: string;
  date: string;
  type: ETransactionType;
  code: string;
}

export interface IConvertTransaction extends ITransactionDefault {
  direction: string;
  statement?: object;
  rate: string;
  fee: IFeeInfo;
  counter: {
    amount: string;
    code: string;
  };
  to: IDirectionInfo;
  from: IDirectionInfo;
}

export interface ITransferTransaction extends ITransactionDefault {
  direction: string;
  statement?: object;
  rate?: string;
  fee: IFeeInfo;
  contragent: {
    id: string;
    phone: string;
  };
}

export default {
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  deserialize(input: any): TTransaction {
    if (input.type === ETransactionType.convert) {
      return {
        id: input.id,
        code: input.code,
        type: input.type,
        amount: input.amount,
        direction: input.direction,
        date: input.finished_at ? input.finished_at : input.created_at,
        status: input.status,
        statement: undefined,
        rate: input.rate,
        fee: {
          amount: input.fee,
          code: input.fee_code,
        },
        counter: {
          amount:
            input.direction === EDirection.income
              ? input.amount_from
              : input.amount_to,
          code:
            input.direction === EDirection.income
              ? input.code_from
              : input.code_to,
        },
        from: {
          code: input.code_from,
          amount: input.amount_from,
        },
        to: {
          code: input.code_to,
          amount: input.amount_to,
        },
      } as IConvertTransaction;
    }

    if (input.type === ETransactionType.transfer) {
      return {
        id: input.id,
        status: 'failed',
        amount: input.amount,
        date: input.finished_at ? input.finished_at : input.created_at,
        type: input.type,
        code: input.code,

        direction: input.direction,
        fee: {
          amount: input.fee ? input.fee : '0.0001',
          code: input.fee_code ? input.fee_code : input.code,
        },
        contragent: {
          id: input.contragent.id,
          phone: input.contragent.phone,
        },
      } as ITransferTransaction;
    }
    return {
      id: input.id,
      sum:
        input.type !== ETransactionType.convert
          ? _transactionAmount2Sum(input.amount, input.type, input.direction)
          : input.direction === EDirection.income
          ? '+ ' + input.amount
          : '- ' + input.amount,
      status: input.status,
      type:
        input.type === ETransactionType.transfer ? input.direction : input.type,
      code: input.code?.toUpperCase(),
      to:
        input.type === ETransactionType.convert
          ? {
              code: input.code_to,
              amount: input.amount_to,
            }
          : {},
      from:
        input.type === ETransactionType.convert
          ? {
              code: input.code_from,
              amount: input.amount_from,
            }
          : {},
      oppositeCoin:
        input.type === ETransactionType.convert
          ? {
              amount:
                input.direction === EDirection.income
                  ? input.amount_from
                  : input.amount_to,
              code:
                input.direction === EDirection.income
                  ? input.code_from.toUpperCase()
                  : input.code_to.toUpperCase(),
            }
          : undefined,
      fee: input.fee || '',
      feeCode: input.fee_code || '',
      icon: _getTransactionIcon(input.type, input.direction),
      info: _getTransactionInfo(
        input.direction,
        input.contragent,
        input.code,
        input.type
      ),
      direction: input.direction || '',
      contractor: input.contragent
        ? {
            id: input.contragent.id || '',
            phone: input.contragent.phone || '',
            email: input.contragent.email || '',
            address: input.contragent.address || '',
          }
        : undefined,
      startDate: input.created_at,
      finishDate: input.finished_at ? input.finished_at : undefined,
      rate: input.rate ? input.rate : undefined,
      txid: input.txid ? input.txid : undefined,
      detailedInfo: _getDetailedInfo(
        input.type,
        input.direction,
        input.code,
        input.direction === EDirection.income ? input.code_from : input.code_to
      ) as string,
    };
  },
};

function _transactionAmount2Sum(
  amount: string,
  type: ETransactionType,
  direction: EDirection
): string {
  return type === ETransactionType.deposit ||
    (type === ETransactionType.transfer && direction === EDirection.income) ||
    type === ETransactionType.convert
    ? `+ ${amount}`
    : `- ${amount}`;
}

function _getTransactionIcon(
  type: ETransactionType,
  direction: string
): string {
  //TODO: define icons set, check logic
  let icon = '';
  switch (type) {
    case ETransactionType.convert:
      icon = require('@/assets/icon/transactions/convert.svg');
      break;
    case ETransactionType.transfer: {
      if (direction === EDirection.income) {
        icon = require('@/assets/icon/transactions/received.svg');
        break;
      }
      icon = require('@/assets/icon/transactions/sent.svg');
      break;
    }
    case ETransactionType.deposit:
      icon = require('@/assets/icon/transactions/received.svg');
      break;
    default:
      icon = require('@/assets/icon/transactions/received.svg');
      break;
  }
  return icon;
}

function _getDetailedInfo(
  type: string,
  direction: string,
  code: string,
  oppositeCode: string
) {
  if (type === ETransactionType.convert && code && oppositeCode) {
    return direction === EDirection.income
      ? 'Bought ' + code.toUpperCase() + ' with ' + oppositeCode.toUpperCase()
      : 'Sold ' + code.toUpperCase() + ' to ' + oppositeCode.toUpperCase();
  }

  return null;
}

function _getTransactionAddress(
  contractor: IContractor,
  code: string,
  type: string
): string {
  //TODO: use i18n
  if (type === ETransactionType.convert) return 'Using Liber Exchange';
  return contractor && contractor.phone
    ? contractor.phone
    : contractor && contractor.email
    ? contractor.email
    : `${code.toUpperCase()} address`;
}

function _getTransactionInfo(
  direction: EDirection,
  contractor: IContractor,
  code: string,
  type: string
): string {
  const info = _getTransactionAddress(contractor, code, type);

  if (type === ETransactionType.convert) {
    return info;
  }

  if (direction && direction === EDirection.income) return `From ${info}`;
  //TODO: use i18n
  return type === ETransactionType.convert ? info : `To ${info}`;
}
