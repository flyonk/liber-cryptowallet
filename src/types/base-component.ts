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
  clear = 'clear'
}

export enum EStorageKeys {
  passcode = 'liber-app-passcode',
  twofa = 'liber-app-2fa'
}