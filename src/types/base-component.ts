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
