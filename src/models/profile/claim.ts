import ClaimFile, { IClaimFile } from '@/models/profile/claimFile';

export interface IClaim {
  id: number;
  userId: string;
  status: number;
  fileList: IClaimFile[];
}

export default {
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  deserialize(input: any): IClaim {
    return {
      id: input.number,
      userId: input.user_id,
      status: input.status,
      fileList: input.file_list.map(ClaimFile.deserialize),
    };
  },

  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  requestSerialize(input: IClaim): any {
    return {
      id: input.id,
      user_id: input.userId,
      status: input.status,
      file_list: input.fileList.map(ClaimFile.requestSerialize),
    };
  },
};
