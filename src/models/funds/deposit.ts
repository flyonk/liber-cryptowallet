export interface IDepositInfoDataDto {
  netWork: string;
  address: string;
  minimumDeposite: string;
  expectedArrival: number;
  expectedUnlock: number;
}

export interface IDepositInfoDto {
  QRCode: File;
  data: IDepositInfoDataDto;
}

export interface IDepositInfo {
  qrCode: File;
  netWork: string;
  address: string;
  minDeposite: string;
  expectedArrival: number;
  expectedUnlock: number;
}

export default {
  deserialize(input: IDepositInfoDto): IDepositInfo {
    return {
      qrCode: input.QRCode,
      netWork: input.data.netWork,
      address: input.data.address,
      minDeposite: input.data.minimumDeposite,
      expectedArrival: input.data.expectedArrival,
      expectedUnlock: input.data.expectedUnlock,
    };
  },
};
