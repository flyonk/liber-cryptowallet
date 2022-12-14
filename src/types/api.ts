import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

export interface IApiService {
  baseURL: string;
  fetch: AxiosInstance;
}

export interface IAuthService {
  signIn(data: { phone: string }): Promise<TSuccessResponse | TErrorResponse>;
  //TODO: fix me
  signInProceed(data: {
    phone: string;
    otp: string;
  }):
    | Promise<AxiosResponse<TSuccessSignIn> | AxiosError<TErrorResponse>>
    | Promise<null>;
  logout(data: {
    access_token: string;
  }): Promise<TSuccessResponse | TErrorResponse>;
  refresh(data: {
    refresh_token: string;
  }): Promise<TSuccessSignIn | TErrorResponse>;
}

export interface IKycService {
  //TODO: fix any
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  kycCreateClaim(payload: any): Promise<TClaimFileList | TErrorResponse>;
  //TODO: fix any
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  kycHook(payload: any): Promise<TSuccessResponse | TErrorResponse>;
  kycGetClaimById(id: number): Promise<TClaimFileList | TErrorResponse>;
  kycProceedClaimById(id: number): Promise<TSuccessResponse | TErrorResponse>;
  kycDeleteFileById(
    id: number,
    fileId: number
  ): Promise<TSuccessResponse | TErrorResponse>;
  kycAddFileById(
    id: number,
    fileId: number
  ): Promise<TSuccessResponse | TErrorResponse>;
}

/**
 *   RequestFundsService
 */

export interface IRequestFundsService {
  downloadStatement(id: string): Promise<TStatement | TErrorResponse>;
  getPaymentLink(
    id: string
  ): Promise<TRequestFundsPaymentLink | TErrorResponse>;
  cancelRequestFunds(id: string): Promise<TSuccessResponse | TErrorResponse>;
  sendRequestedFunds(id: string): Promise<TSuccessResponse | TErrorResponse>;
  declineRequestedFunds(id: string): Promise<TSuccessResponse | TErrorResponse>;
  createRequestFunds(
    id: string,
    data: TCreateRequestFundsData
  ): Promise<TSuccessResponse | TErrorResponse>;
}

export type TCreateRequestFundsData = {
  amount: string;
  account: string;
  network?: string;
  targetUser: {
    id?: string;
    email?: string;
    phone?: string;
  };
};

export type TStatement = {
  statement: File;
};

export type TRequestFundsPaymentLink = {
  id: string;
  link: string;
  expire: string;
};

/**
 *   ContactsService
 */

export interface IContactsService {
  getFriends(): Promise<TLiberContacts | TErrorResponse>;
  createContact(
    data: TLiberContact
  ): Promise<TSuccessResponse | TErrorResponse>;
  editContact(
    id: string,
    data: TLiberContact
  ): Promise<TSuccessResponse | TErrorResponse>;
  syncContacts(data: TIPhoneContacts): Promise<TLiberContacts | TErrorResponse>;
  getInviteLink(): Promise<TInviteLink | TErrorResponse>;
  getPaymentLink(): Promise<TPaymentLink | TErrorResponse>;
}

type TCommunicationChannel = {
  value: string;
  isPrimary?: boolean;
};

export type TLiberContact = {
  id: string;
  name: string;
  phones: TCommunicationChannel[];
  emails: TCommunicationChannel[];
  //isTrusted: boolean //by default false?
};

export type TLiberContacts = {
  contacts: TLiberContact[];
};

type TIPhoneContact = {
  name: string;
  emails: string[];
  phones: string[];
};

export type TIPhoneContacts = {
  contacts: TIPhoneContact[];
};

export type TInviteLink = {
  link: string;
};

export type TPaymentLink = {
  link: string;
};

/**
 *   ProfileService
 */

export interface IProfileService {
  getProfile(): Promise<TProfile | TErrorResponse>;
  updateProfile(data: TUpdateProfile): Promise<TProfile | TErrorResponse>;
  updateProfileAvatar(file: File): Promise<TSuccessResponse | TErrorResponse>;
  closeProfile(): Promise<TSuccessResponse | TErrorResponse>;
  enableVerificationByApp(): Promise<TConfigureAppData | TErrorResponse>;
  verificationByApp(): Promise<TVerification | TErrorResponse>;
  confirmVerificationApp(data: {
    secret: string;
    code: string;
  }): Promise<TSuccessResponse | TErrorResponse>;
  disableVerificationApp(data: {
    code: string;
  }): Promise<TSuccessResponse | TErrorResponse>;
}

export interface IVerificator {
  verificationBySMS(data: {
    otp: string;
  }): Promise<TVerification | TErrorResponse>;
}

export type TVerification = {
  verification: boolean;
};

export type TProfile = {
  status: number;
  phone: string;
  is_verified: false;
  block_reason: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  street_and_number: string;
  optional_address: string;
  postal_code: string;
  birthdate: string;
};

export type TUpdateProfile = {
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  street_and_number: string;
  optional_address: string;
  postal_code: string;
  birthdate: string;
};

export type TClaim = {
  // wrong body
  id: number;
  claim_id: number;
  type: number;
  name: string;
  extension: string;
  link: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

export type TClaimFileList = {
  file_list: TClaim[];
  user_id: string;
  id: number;
  status: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

export type TErrorResponse = {
  message: string;
  code: number;
  details: {
    key: string;
  };
};

export type TSuccessResponse = {
  message: string;
};

export type TSuccessSignIn = {
  access_token: string;
  refresh_token: string;
};

export type TConfigureAppData = {
  secret: string; //.pdf
  url: string;
};

/**
 *   FundsService
 */

export interface IFundsService {
  getCoins(): Promise<TCoins | TErrorResponse>;
  getDepositInfo(coinCode: string): Promise<TDepositInfo | TErrorResponse>;
  convertInfo(data: TConvertData): Promise<TConvertInfo | TErrorResponse>;
  convert(data: TConvertData): Promise<TSuccessResponse | TErrorResponse>;
}

type TCoin = {
  //TODO: WHY??? nested objects
  [key: string]: {
    //Coin CODE
    fullname: string;
    suggested: boolean;
  };
};

export type TCoins = {
  coins: TCoin[];
};

export type TConvertData = {
  list: Record<string, { fullname: string; amount?: string }>;
};

export type TConvertInfo = {
  transactionFee: string;
  guaranteedRate: string;
  amountToBeTransferred: string;
};

export type TDepositInfo = {
  QRCode: File;
  data: {
    netWork: string;
    address: string;
    minimumDeposite: string;
    expectedArrival: number;
    expectedUnlock: number;
  };
};
