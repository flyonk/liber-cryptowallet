import {
  EDirection,
  ETransactionStatus,
  ETransactionType,
} from '@/models/transaction/transaction';

export interface IConvertTransaction {
  id: string;
  amount: string;
  createdAt: string;
  finishedAt: string;
  status: ETransactionStatus;
  rate: string;
  fee: string;
  feeCode: string;
  info: string;
  type: ETransactionType;
  direction: EDirection;
  code: string;
  relativeDate: string;
}

/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
const convertTransactionDeserialize = (input: any): IConvertTransaction => {
  const getInfo =
    input.direction === EDirection.income
      ? 'Bought ' +
        input.code.toUpperCase() +
        ' with ' +
        input.fee_code.toUpperCase()
      : 'Sold ' +
        input.code.toUpperCase() +
        ' to ' +
        input.fee_code.toUpperCase();

  const getRelativeDate = input.finished_at
    ? input.finished_at
    : input.created_at;

  return {
    id: input.id,
    amount: input.amount,
    createdAt: input.created_at,
    fee: input.fee,
    feeCode: input.fee_code,
    finishedAt: input.finished_at,
    info: getInfo,
    rate: input.rate,
    status: input.status,
    direction: input.direction,
    type: input.type,
    code: input.code,
    relativeDate: getRelativeDate,
  };
};

export default {
  deserialize: convertTransactionDeserialize,
};
