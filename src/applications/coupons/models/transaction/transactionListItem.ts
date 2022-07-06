import {
  EDirection,
  ETransactionType,
  IConvertTransaction,
  IDepositTransaction,
  ITransferTransaction,
  TTransaction,
} from '@/models/transaction/transaction';

export interface ITransactionMerchant {
  id: string;
  to?: string;
  from?: string;
}

export interface ICouponsTransactionDTO {
  id: string;
  status: string;
  type: string;
  amount: string;
  name: string;
  code: string;
  direction: string;
  merchant: ITransactionMerchant;
  amount_from: string;
  amount_to: string;
  code_from: string;
  code_to: string;
  rate: string;
  rate_currency: string;
  fee: string;
  fee_code: string;
  created_at: string;
  finished_at: string;
}

export interface ICouponsTransaction {
  id: string;
  status: string;
  type: string;
  amount: string;
  name: string;
  code: string;
  direction: string;
  merchant: ITransactionMerchant;
  amountFrom: string;
  amountTo: string;
  codeFrom: string;
  codeTo: string;
  rate: string;
  rateCurrency: string;
  fee: string;
  feeCode: string;
  createdAt: string;
  finishedAt: string;
}

export default {
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
          id: input.merchant.id,
          phone: input.merchant.from,
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
        txid: '',
        address: '1Mtree35df4543sdgErtrryryEe13rrsd21213Opa139z0l',
      } as IDepositTransaction;
    }
  },
};
