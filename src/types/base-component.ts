export interface IDifference {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number | string;
  second: number | string;
}

export enum EStepDirection {
  prev = 'prev',
  next = 'next',
}

export enum EState {
  pending = 'pending',
  success = 'success',
  error = 'error',
}

export enum EPasscodeActions {
  store = 'store',
  receive = 'receive',
  compare = 'compare',
  clear = 'clear',
  update = 'update',
}

export interface IValueItem {
  text: string;
  value: string | number;
  logo?: string;
}

export enum ECryptoTransactionsEnvVars {
  withdraw = 'withdraw',
  convert = 'convert',
  send = 'send',
}

export enum ECouponsTransactionsEnvVars {
  withdraw = 'withdraw',
  convert = 'convert',
  send = 'send',
  purchase = 'purchase',
  redemption = 'redemption',
}

export enum EFiatTransactionsEnvVars {
  withdraw = 'withdraw',
}
