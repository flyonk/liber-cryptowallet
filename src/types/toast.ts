export enum EToastSeverity {
  'error' = 'error',
  'warning' = 'warning',
  'success' = 'success',
}

export interface IToastStore {
  open: boolean;
  header: string | null;
  description: string | null;
  footer: string | null;

  severity: EToastSeverity;
}
