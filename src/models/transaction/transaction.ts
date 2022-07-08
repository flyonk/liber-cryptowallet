export type TTransaction =
  | INetTransaction
  | IRequestFunds
  | IConvertTransaction
  | ITransferTransaction
  | IDepositTransaction;

export interface IContractorDto {
  id: string;
  phone: string;
  email: string;
  address: string;
}

export interface ITransactionDto {
  id: string;
  amount?: string;
  timestamp?: string;
  status: ERequestFundsStatus | ETransactionStatus;
  code: string;
  fee?: string;
  feeCode?: string;
  type: ERequestFundsType | ETransactionType;
  contragent?: IContractorDto;
}

export interface INetTransactionDto {
  id: string;
  sum: string;
  code: string;
  to?: TConvertTransaction;
  from?: TConvertTransaction;
  icon?: string;
  info?: string;
  direction: EDirection;
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
  oppositeCoin?: {
    amount: string;
    code: string;
  };
}

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
  isCoupon?: boolean;
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

export interface IDepositTransaction extends ITransactionDefault {
  txid: string;
  statement?: string;
  address: string;
  direction: string;
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
  isCoupon?: boolean;
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
  deserialize(input: any): TTransaction | undefined {
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
        isCoupon: input.is_coupon,
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
        status: input.status,
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

    if (input.type === ETransactionType.deposit) {
      return {
        id: input.id,
        status: input.status,
        amount: input.amount,
        date: input.finished_at ? input.finished_at : input.created_at,
        type: input.type,
        code: input.code,
        direction: input.direction,
        statement: undefined,
        txid: input.txid,
        address: '1Mtree35df4543sdgErtrryryEe13rrsd21213Opa139z0l',
      } as IDepositTransaction;
    }
  },
};
