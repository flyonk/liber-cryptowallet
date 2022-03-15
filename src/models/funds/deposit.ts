export interface IDepositInfo {
  qrCode: File;
  netWork: string;
  address: string;
  minDeposite: string;
  expectedArrival: number;
  expectedUnlock: number;
}

export default {
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  deserialize(input: any): IDepositInfo {
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
